import React from 'react';
import {Component} from 'react';
import styles from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap'; 
import {Alert} from 'react-bootstrap'; 
import {ListGroup} from 'react-bootstrap'; 
import {Spinner} from 'react-bootstrap'; 
import Async from "react-async"

class ToDoList extends Component{
	constructor(){
		super();
		this.state = {
			task:"",
			list:[]
		}
	}
	
	lo = () => {		
		localStorage.removeItem('user');
		localStorage.removeItem('message');
		window.location.reload()
	}
	
	de = (e) => {
		//alert(localStorage.getItem('user'))
		localStorage.removeItem('message');
		
		fetch('http://10.0.0.8:8080/del',{
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
			localStorage.setItem('user', response.session);
			//alert("This: "+response.message);
			window.location.reload()

		})
			e.preventDefault();

	}
	setS =(e) => {
		this.setState({
			task: e.currentTarget.value
		})
	}
	sendIt = () => {
		
		fetch('http://10.0.0.8:8080/todo',{
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
			window.location.reload()
		})
		
	}
	remove = (el) => (e) => {
		localStorage.removeItem('message');
		console.log("rem"+el)
		fetch('http://10.0.0.8:8080/todo',{
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
			window.location.reload()
		})

	}
	componentDidMount(){
		
		console.log("mount");
		fetch('http://10.0.0.8:8080/gettodo')
		
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
	render(){
		return(
		<div>
		<p>Zalogowano!</p>
		
		<Button variant="outline-secondary" size="sm" className="Lo m-2" onClick={this.lo}>Log out</Button>
		<Button variant="outline-secondary" size="sm" className="Lo m-2" onClick={this.de}>Delete my account!</Button>
		<Form>
		
		<Form.Label>What I have to do?</Form.Label>
		<ListGroup>
		{
			this.state.list.map((el, index)=> 
			<ListGroup.Item key={index}>{el} <Button variant="danger" size="sm" className="float-right" onClick={this.remove(el)}>x</Button></ListGroup.Item>
			)
		}
		</ListGroup>
		<Form.Control value={this.state.task} onChange={this.setS} type="text" name="sth"/>
		<Button className='m-2' variant="primary" size="sm" onClick={this.sendIt}>OK</Button>
		</Form>
		</div>
		)
	}
}
class Fr extends Component {
	constructor(){
		super();
		this.state = {
			w: 0,
			dt1: '',
			dt2: '',
			dt3: '',
			dd: '22',
			info: "",
			info2:""
		}
	}
	log = (x) => e => {
		
		this.setState({
			dt1:'',
			dt2:''
		})
		console.log("ok");
		x==1 ? this.setState({
			w:2
		})
		: this.setState({
			w:1
		})
		e.preventDefault();
	}
	check = (e) =>{

		this.setState({
			dt1:'',
			dt2:''
		})

	
		fetch('http://10.0.0.8:8080/ch',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				dt1: this.state.dt1,
				dt2: this.state.dt2
			
			})
		})
		.then(response => response.json())
		.then(response =>{
			localStorage.setItem('user', response.session);
			localStorage.setItem('message', response.message);
			//alert("This: "+localStorage.getItem('message'));
			window.location.reload()

		})

	}
		
	send = (e) =>{
		if(this.state.dt1!="" && this.state.dt2!="" && this.state.dt3!=""){
		fetch('http://10.0.0.8:8080/ap',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				dt1: this.state.dt1,
				dt2: this.state.dt2,
				dt3: this.state.dt3
			})
		})
		.then(response => response.json())
		.then(response =>{
			localStorage.setItem('user', response.session);
			localStorage.setItem('message', response.message);
			//alert("This: "+response.message);
			window.location.reload()
			
		})
		
		}
		else{
			this.setState({
				info2: "Write something",
				w:1
			})
		}
	}
	
	Ch = (x) => e => {
		x==1? this.setState({
			dt1: e.currentTarget.value
		})
		: x==2? this.setState({
			dt2: e.currentTarget.value
		})
		: this.setState({
			dt3: e.currentTarget.value
		})
	}
	componentDidMount(){
		console.log("co to? "+localStorage.getItem('message'))
		this.setState({
			info: localStorage.getItem('message')
			
		})
	//localStorage.removeItem('message');
	console.log("teraz!!!!!!! "+this.state.w)
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
			//localStorage.setItem('time', response.time);
					console.log("update "+" "+ localStorage.getItem('message'));
			
		if(response.time>0){this.setState({
				w:4
			})
		}	
		})
		if(localStorage.getItem('message')=='Ok!') this.setState({
				w:0
			})
		else if(localStorage.getItem('message')=='I cant see this account'||localStorage.getItem('message')=='This account exist!'){
					localStorage.removeItem('message');
				this.setState({
				w:5
			})
			}
		else if(localStorage.getItem('message')=='Add new account!'){
					localStorage.removeItem('message');
				this.setState({
				w:6
			})
			}
		else this.setState({
				w:1
			})
			
	}
	
	render(){
				
		return(
		
		this.state.w==1 || this.state.w==5 || this.state.w==6?<Form>
		<Form.Label className="new">Are you new?</Form.Label><br/>
		<Form.Label>Name: </Form.Label><Form.Control type="text" value={this.state.dt1} onChange={this.Ch(1)} name="name"/>
		<Form.Label>Surname: </Form.Label><Form.Control type="text" value={this.state.dt2} onChange={this.Ch(2)} name="surn"/>
		<Form.Label>Password: </Form.Label><Form.Control type="password" value={this.state.dt3} onChange={this.Ch(3)} name="pass"/>
	
		<Button className='m-2' variant="primary" size="sm" onClick={this.send}>OK</Button>
		<Button className='m-2' variant="primary" size="sm" onClick={this.log(1)}>I've account!</Button>
			{this.state.w==5? <Alert variant='danger'>{this.state.info}</Alert> : null}
			{this.state.w==6? <Alert variant='success'>{this.state.info}</Alert> : null}
			{this.state.info2!=""? <Alert variant='danger'>{this.state.info2}</Alert> : null}
		</Form>
		: this.state.w==2?<Form><Form.Label>Name: </Form.Label><Form.Control type="text" value={this.state.dt1} onChange={this.Ch(1)} name="name1"/>
		<Form.Label>Password: </Form.Label><Form.Control type="password" value={this.state.dt2} onChange={this.Ch(2)} name="pass1"/>
		<Button className='m-2' variant="primary" size="sm" onClick={this.check}>Log in</Button>
		<Button className='m-2' variant="primary" size="sm" onClick={this.log(2)}>Back</Button>
		</Form>
		: this.state.w==4? <ToDoList user={this.props.user}/>
		: <Spinner animation="border"/> 
			
		)
	}
}
export default Fr;