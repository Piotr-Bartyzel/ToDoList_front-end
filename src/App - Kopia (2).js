import React from 'react';
import {Component} from 'react';
import './App.css';
import Fr from './Fr.js';
import {connect} from "react-redux"
import {dataFetched} from "./actions"



var timer;
class App extends Component {
	constructor(){
		super();
		this.state = {
			dd: '',
			start: {
				start: 1
			}
		}
	}
	
	f = (dd) => {
		console.log("ee");
		this.setState({
			dd
		})
	}
	
	componentDidUpdate(){
		console.log(this.state.dd)
		
	}

	componentDidMount(){
		console.log("teraz!!!!!!!")
		console.log("??? "+localStorage.getItem('user'));
			fetch("http://10.0.0.8:8080/ans",{
				method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				session: localStorage.getItem('user')
			})
				
			})
		.then(response => response.json())
		.then(response =>{
			console.log("Is it active? "+response.time);
			console.log("Who? "+response.session);
			localStorage.setItem('time', response.time);
			//return this.props.dataFetched(response.time, response.session)
								
		})
		
	}
	render(){

			return (
				<div className="App">
				<Fr dd={this.state.dd} det={this.props.det} user={this.props.user} func={this.f}/>
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

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

