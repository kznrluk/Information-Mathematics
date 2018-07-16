import React from 'react';
import { generateRSAKeys, encrypt, decrypt } from './lib/RSA-Crypt.js';
import './RSACrypt.css';

// const isPrimeNum = num => BigNumber(2).pow(num) % num !== 2;

export default class RSACrypt extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            p : 20983,
            q : 16061,
            secretKey: {},
            publicKey: {},
            isKeysReady: false,
            plainText: "Hello, JavaScript.",
            plainTextArray: [],
            encryptedArray: [],
            decryptedArray: []
        };

        this.onPrimeNumChanged = this.onPrimeNumChanged.bind(this);
        this.onPlainTextChanged = this.onPlainTextChanged.bind(this);
        this.recalcKeys = this.recalcKeys.bind(this);
    }

    componentWillMount() {
        this.recalcKeys({
            p : this.state.p , q : this.state.q
        });
    }

    recalcKeys(primeObject) {
        const Keys = generateRSAKeys(primeObject.p, primeObject.q)
        this.setState(
            Object.assign({}, this.state,
                primeObject,
                {
                    secretKey : Keys.secret,
                    publicKey : Keys.public
                },
            )
        );
    }

    onPrimeNumChanged(primeObject) {
        this.recalcKeys(primeObject);
    }

    onPlainTextChanged(text) {
        const plainTextArray = text.split("").map(v => v.charCodeAt());
        const encryptedArray = encrypt(plainTextArray, this.state.publicKey);
        const decryptedArray = decrypt(encryptedArray, this.state.secretKey);
        this.setState(Object.assign({}, this.state, { plainText: text, plainTextArray: plainTextArray, encryptedArray, decryptedArray }));
    }

    render() {
        console.log(this.state)
        return (
            <div className='RSACrypt'>
                <div className='title'>
                    <h1>RSA-Crypt.js</h1>
                    <p>入力された文字列を暗号化します。</p>
                </div>
                <div className='main'>
                    <InputPlainText plainText={this.state.plainText} onPlainTextChanged={this.onPlainTextChanged}/>
                    <InputPrimeNumber p={this.state.p} q={this.state.q} onPrimeNumChanged={this.onPrimeNumChanged}/>
                    <ViewResult plainText={this.state.plainText} encryptedArray={this.state.encryptedArray} decryptedArray={this.state.decryptedArray}/>
                </div>
            </div>
        )
    }
}

class InputPlainText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onPlainTextChanged(event.target.value);
    }
    
    render() {
        return (
            <div className="InputPlainText" >
                <form>
                    <input type="text" value={this.props.plainText} onChange={this.handleChange} name="plainText" />
                </form>
            </div>
        )
    }
}

class InputPrimeNumber extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.primeNums = {
            p : this.props.p,
            q : this.props.q
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const primeNums = Object.assign({}, this.primeNums, {[event.target.name] : +event.target.value})
        this.props.onPrimeNumChanged(primeNums)
    }

    render() {
        return (
            <div className='InputPrimeNumber'>
                <form>
                    <label>
                        <div className='prime'>: P :<br/><input type="text" value={this.props.p} onChange={this.handleChange} name="p" className="input"/></div>
                        <div className='prime'>: Q :<br/><input type="text" value={this.props.q} onChange={this.handleChange} name="q" className="input"/></div>
                    </label>
                </form>
            </div>
        )
    }
}

class ViewResult extends React.Component {
    render() {
        return (
            <div className="ViewResult">
                <ViewStringsAsArray plainText={this.props.plainText}/>
                <ViewCryptedText encryptedArray={this.props.encryptedArray} />
                <ViewDecryptedText decryptedArray={this.props.decryptedArray} />
            </div>
        )
    }
}

const ViewStringsAsArray = props => {
    const convertTextToIntArray = string => string.split("").map(v => v.charCodeAt());
    const convertedText = convertTextToIntArray(props.plainText)
    let viewText = '';
    convertedText.forEach(text => {
        viewText = `${viewText} ["${text}"]`
    });

    return (
        <div className='Unicode'>
            <span>Unicode</span> {viewText}
        </div>
    )
}

const ViewCryptedText = props => {
    let viewText = '';
    props.encryptedArray.forEach(text => {
        viewText = `${viewText} ["${text}"]`
    });
    return (
        <div className='Crypted'>
            <span>CryptedText</span> {viewText}
        </div>
    )
}

const ViewDecryptedText = props => {
    let viewText = '';
    let plainText = '';
    props.decryptedArray.forEach(text => {
        viewText = `${viewText} ["${text}"]`
    });
    props.decryptedArray.forEach(text =>{
        plainText += String.fromCharCode(text)
    });
    return (
        <div>
            <div className="Decrypted">
                <span>DecryptedText</span> {viewText}
            </div>
            <div className="PlainText">
                <span>PlainText</span> {plainText}
            </div>
        </div>
    )
}