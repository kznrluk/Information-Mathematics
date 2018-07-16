import React from 'react';
import './Euclidean-Algorithm.css';

let tempArray = [];

const extendedEuclideanAlgorithm = (a, b) => {
    if (b === 0) {
        // (2) GCDが求まる
        console.log(`GCD is ${a}`)
        tempArray.push([1, b, a]);
        return [1, b, a];
    } else {
        console.log(`${a} = ${b} * ${Math.floor(a/b)} + ${a%b}`)
        tempArray.push([a, '=', b, '*', Math.floor(a/b), '+', a%b]);
        // (1) GCDが求まるまで再帰する
        const result = extendedEuclideanAlgorithm(b, a % b);
        const x = result[0];
        const y = result[1];
        // (3) GCDを元に遡り解を求める
        console.log(`${result[2]} = ${a} * ${y} + ${b} * ${x - y * Math.floor(a/b)}`)
        tempArray.push([result[2], '=', a, '*', y, '+', b, '*', x - y * Math.floor(a/b)]);
        return [y, x - y * Math.floor(a/b), result[2]];
    }
}

export default class Euclidean extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            a : 12707,
            b : 12319,
            results : []
        }
        this.recalc = this.recalc.bind(this);
        this.onNumChanged = this.recalc.bind(this);
    }
    
    componentWillMount() {
        this.recalc({
            a : this.state.a,
            b : this.state.b
        });
    }

    onNumChanged(numObject) {
        this.recalc(numObject);
    }

    recalc(numObject) {
        tempArray = [];
        const a = numObject.a >= numObject.b ? numObject.a : numObject.b
        const b = numObject.a <= numObject.b ? numObject.a : numObject.b
        extendedEuclideanAlgorithm(a, b);
        console.log(tempArray)
        this.setState(Object.assign({}, this.state, {results : tempArray, a : numObject.a, b : numObject.b}));
    }

    render() {
        const viewText = this.state.results.map((formula, index) => {
            if(formula[0] === 1 && formula[1] === 0){
                 return (<span key={index} className='viewGCD'>GCD === {formula[2]}</span>)
            }
            return (
                <div key={index}>
                    <span className='viewFormula'>{formula}</span>
                </div>
            )
        });
        return (
            <div className='Euclidean'>
                <div className='title'>
                    <h1>Euclidean-Algorithm.js</h1>
                    <p>拡張ユークリッド互除法を使用し、特殊解を求めます。</p>
                </div>
                <div className='main'>
                    <InputNumber a={this.state.a} b={this.state.b} onNumChanged={this.onNumChanged}/>
                    <div className="viewText">{viewText}</div>
                </div>
            </div>
        )
    }
}

class InputNumber extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.nums = {
            a : this.props.a,
            b : this.props.b
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const nums = Object.assign({}, this.nums, {[event.target.name] : +event.target.value})
        this.props.onNumChanged(nums)
    }

    render() {
        return (
            <div className='InputNumber'>
                <form>
                    <label>
                        <div className='num'>: A :<br/><input type="text" value={this.props.a} onChange={this.handleChange} name="a" className="input"/></div>
                        <div className='num'>: B :<br/><input type="text" value={this.props.b} onChange={this.handleChange} name="b" className="input"/></div>
                    </label>
                </form>
            </div>
        )
    }
}