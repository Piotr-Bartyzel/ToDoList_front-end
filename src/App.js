import React from 'react';
import {Component} from 'react';
import './App.css';
import FormFetch from './FormFetch.js';
import {connect} from "react-redux"
import {dataFetched} from "./actions"


class App extends Component {
	render(){
			return (
				<div className="App">
				<FormFetch http={this.props.http}/>
				</div>
			);
	}
}
const mapStateToProps = (state) => {

	return {
		http: 'http://10.0.0.8:8080'
	}
}
const mapDispatchToProps = {dataFetched};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

