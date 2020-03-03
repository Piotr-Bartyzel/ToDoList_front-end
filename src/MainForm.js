import React from 'react';
import {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {Alert} from 'react-bootstrap'; 
import {Spinner} from 'react-bootstrap'; 
import ToDoList from "./Tl"



class ActionsForm extends Component {
	constructor(props){
		super(props);
		console.log(this.props.w)
	this.state = {
			w: this.props.w,
			info: this.props.info,
			http: this.props.http
		}
	}

	Ch = (x) => e => {
		x===1? this.setState({
			dt1: e.currentTarget.value
		})
		: x===2? this.setState({
			dt2: e.currentTarget.value
		})
		: this.setState({
			dt3: e.currentTarget.value
		})
	}
	
		log = (x) => e => {
		
		this.setState({
			dt1:'',
			dt2:''
		})
		console.log("ok");
		x===1? this.setState({
			w:2
		})
		: this.setState({
			w:1
		})
		e.preventDefault();
	}
	componentDidMount(){	
	console.log(this.props.w)
	//localStorage.clear();
	console.log("mountt")
	if(localStorage.getItem('message')==='Ok!') this.setState({
				w:0
			})
		else if(localStorage.getItem('message')==='I can\'t see this account'||localStorage.getItem('message')==='This account exist!'||localStorage.getItem('message')==='Write something!'){
					localStorage.removeItem('message');
				this.setState({
				w:5
			})
			}
		else if(localStorage.getItem('message')==='Add new account!'){
					localStorage.removeItem('message');
				this.setState({
				w:6
			})
			}
		else {
			console.log("tooo")
			this.setState({
				w:1
			})
		}
	}
	render(){

		return(
		
				this.state.w===1 || this.state.w===5 || this.state.w===6?<Form>
		<Form.Label className="new">Are you new?</Form.Label><br/>
		<Form.Label>Name: </Form.Label><Form.Control type="text" value={this.state.dt1} onChange={this.Ch(1)} name="name"/>
		<Form.Label>Surname: </Form.Label><Form.Control type="text" value={this.state.dt2} onChange={this.Ch(2)} name="surn"/>
		<Form.Label>Password: </Form.Label><Form.Control type="password" value={this.state.dt3} onChange={this.Ch(3)} name="pass"/>
	
		<Button className='m-2' variant="primary" size="sm" onClick={this.send}>OK</Button>
		<Button className='m-2' variant="primary" size="sm" onClick={this.log(1)}>I've account!</Button>
			{this.state.w===5? <Alert variant='danger'>{this.state.info}</Alert> : null}
			{this.state.w===6? <Alert variant='success'>{this.state.info}</Alert> : null}
			<ActionsForm/>
		</Form>
		: this.state.w===2?<Form><Form.Label>Name: </Form.Label><Form.Control type="text" value={this.state.dt1} onChange={this.Ch(1)} name="name1"/>
		<Form.Label>Password: </Form.Label><Form.Control type="password" value={this.state.dt2} onChange={this.Ch(2)} name="pass1"/>
		<Button className='m-2' variant="primary" size="sm" onClick={this.check}>Log in</Button>
		<Button className='m-2' variant="primary" size="sm" onClick={this.log(2)}>Back</Button>
		<ActionsForm/>
		</Form>
		: this.state.w===4? <ToDoList http={this.state.http}/>
		: <Spinner animation="border"/> 
		)
	}
}

class MainForm extends Component {
	
	constructor(){
		super();

		this.state= {
			w: 0,
			data: ['','',''],
			info: "",
			http: 'http://10.0.0.8:8080'
		}
	}
	check = (e) =>{
		
		/*this.setState({
			data[0]:'',
			data[1]:''
		})
	*/
		fetch(this.state.http+'/ch',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				dt1: this.state.data[0],
				dt2: this.state.data[1]
			
			})
		})
		.then(response => response.json())
		.then(response =>{
			localStorage.setItem('user', response.session);
			localStorage.setItem('message', response.message);
			window.location.reload()

		})

	}
		
	send = (e) =>{
		if(this.state.data[0]!=="" && this.state.data[1]!=="" && this.state.data[2]!==""){
		
			fetch(this.state.http+'/ap',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				dt1: this.state.data[0],
				dt2: this.state.data[1],
				dt3: this.state.data[2]
			})
		})
		.then(response => response.json())
		.then(response =>{
			localStorage.setItem('user', response.session);
			localStorage.setItem('message', response.message);
			window.location.reload()
			
		})
		}
		else{
			localStorage.setItem('message', 'Write something!');
			window.location.reload()
		}
	}
		componentDidMount(){
		
		this.setState({
			info: localStorage.getItem('message')
			
		})

			fetch(this.state.http+'/ans',{
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
		if(response.session===null){localStorage.clear();
		window.location.reload();
		}
		if(response.time>0){this.setState({
				w:4
			})
		}	
		})

		
			
	}
	
	render(){
		console.log(this.state.w)
	return(
		<ActionsForm w={this.state.w} info={this.state.info} http={this.state.http}/>
	)
		
	}
}
export default MainForm;