import React from 'react';
import {Component} from 'react';
import './App.css';
import Fr from './Fr.js';
import {connect} from "react-redux"
import {dataFetched} from "./actions"


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
		/*console.log("mount!");
		fetch("http://localhost:8080/ans")
		.then(response => response.json())
		.then(response =>{
			//this.setState({start: response}, ()=> console.log(this.state.start.start))
			this.props.dataFetched(response.start)//, ()=> console.log(this.props.data) //()=> console.log(this.state.start))
			console.log("aaa "+this.props.det)
		})*/
		
		//this.state.start.start
	}
	render(){

  return (
    <div className="App">
     <Fr dd={this.state.dd} det={this.props.det} func={this.f}/>
    </div>
  );
	}
}

const mapStateToProps = (state) => {
	return {
		det: state.data_r
	}
}
const mapDispatchToProps = { dataFetched};
export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;
