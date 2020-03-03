import React from 'react';
import {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap'; 



class ToDoList extends Component{
	constructor(){
		super();
		this.state = {
			task:"",
			list:[]
		}
	}
	
	logOut = () => {		
		localStorage.clear();
		window.location.reload()
	}
	
	deleteAccount = (e) => {
		localStorage.removeItem('message');
		
		fetch(this.props.http+'/del',{
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				del: localStorage.getItem('user')
			
			})
		})
		.then(response => response.json())
		.then(response =>{
			localStorage.clear();
			window.location.reload()

		})


	}


	sendTask = () => {
		
		fetch(this.props.http+'/todo',{
			method:'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data: this.state.task
			})
		})
		.then(response=>{
			this.setState({
				list: [],
				task: ""
			})
				this.getAll();
		})
		
	}
	remove = (el) => (e) => {
		console.log("rem"+el)
		fetch(this.props.http+'/todo',{
			method:'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data: el,
				del: 1
			})
		})
		.then(response=>{
			this.setState({
				list: []	
			})
			this.getAll();
		})

	}
	
	getAll = () => {
     	fetch(this.props.http+'/gettodo')
		
		.then(response => response.json())
		.then(response =>{
			console.log("All of it: "+response.resp[0].tasks);
			response.resp.map((el)=>
				this.setState({
					list: [...this.state.list,el.tasks]
				})
			)
			this.state.list.map((el)=> console.log(el))

		})
    }
	setValue = (e) =>{
		this.setState({
			task: e.currentTarget.value
		})
	}
	componentDidMount(){	
			this.getAll();
			
	}
	
	render(){
		return(
		<div>
		<UserPanel logOut={this.logOut} deleteAccount={this.deleteAccount}/>			
		<Form>
		
		<Form.Label>What I have to do?</Form.Label>
		
				<TaskList remove={this.remove} list={this.state.list}/>
				
		<Form.Control value={this.state.task} onChange={this.setValue} type="text" name="sth"/>
		<Button className='m-2' variant="primary" size="sm" onClick={this.sendTask}>OK</Button>
		</Form>
		</div>
		)
	}
}
class UserPanel extends Component{
	render(){
		return(
		<div>
		<p>Zalogowano!</p>
		
		<Button variant="outline-secondary" size="sm" className="Lo m-2" onClick={this.props.logOut}>Log out</Button>
		<Button variant="outline-secondary" size="sm" className="Lo m-2" onClick={this.props.deleteAccount}>Delete my account!</Button>
		</div>
		)
	}
}

class TaskList extends Component{
	render(){

		return(
			<ListGroup>
		{
			this.props.list.map((el, index)=> 
			<ListGroup.Item key={index}>{el} <Button variant="danger" size="sm" className="float-right" onClick={this.props.remove(el)}>x</Button></ListGroup.Item>
			)
		}
		</ListGroup>
		)
	}
}
export default ToDoList;