import React from 'react';
import {Component} from 'react';
import './App.css';
import Fr from './Fr.js';
import {connect} from "react-redux"
import {dataFetched} from "./actions"


class App extends Component {
	constructor(){
		super();
	}
	render(){

			return (
				<div className="App">
				<Fr func={this.f}/>
				</div>
			);
	}
}

const mapStateToProps = (state) => {
	console.log("state.data_r.a:	"+state.data_r.a	)
	console.log("state.data_r.b:	"+state.data_r.b	)
	return {
		det: state.data_r.a,
		user: state.data_r.b
	}
}
const mapDispatchToProps = {dataFetched};

export default App;

