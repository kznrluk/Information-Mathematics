import React from 'react';
import { generateRSAKeys, encrypt, decrypt } from './lib/RSA-Crypt.js';
import BigNumber from 'bignumber.js';

const isPrimeNum = num => BigNumber(2).pow(num) % num !== 2;

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
            encryptedArray: []
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
        this.setState(Object.assign({}, this.state, { plainText: text, plainTextArray: plainTextArray, encryptedArray }));
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <InputPrimeNumber p={this.state.p} q={this.state.q} onPrimeNumChanged={this.onPrimeNumChanged}/>
                <InputPlainText plainText={this.state.plainText} onPlainTextChanged={this.onPlainTextChanged}/>
                <ViewResult plainText={this.state.plainText} encryptedArray={this.state.encryptedArray}/>
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
            <div>
                <form>
                    <label>
                        InputPlainText: <input type="text" value={this.props.plainText} onChange={this.handleChange} name="plainText" />
                    </label>
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
            <div>
                <form>
                    <label>
                        P: <input type="number" value={this.props.p} onChange={this.handleChange} name="p" />
                        Q: <input type="number" value={this.props.q} onChange={this.handleChange} name="q" />
                    </label>
                </form>
            </div>
        )
    }
}

class ViewResult extends React.Component {
    render() {
        return (
            <div>
                <ViewStringsAsArray plainText={this.props.plainText}/>
                <ViewCryptedText encryptedArray={this.props.encryptedArray} />
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
        <div>
            Unicode: <br />
            {viewText}
        </div>
    )
}

const ViewCryptedText = props => {
    let viewText = '';
    props.encryptedArray.forEach(text => {
        viewText = `${viewText} ["${text}"]`
    });
    return (
        <div>
            CryptedText: <br />
            {viewText}
        </div>
    )
}