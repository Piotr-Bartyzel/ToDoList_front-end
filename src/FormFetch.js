import React from 'react';
import {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {Alert} from 'react-bootstrap'; 
import {Spinner} from 'react-bootstrap'; 
import ToDoList from "./ToDoList"

class FormFetch extends Component {
	
	constructor(){
		super();
		this.state = {
			time:'',
			session: ''
		} 
	}
		
	componentDidMount(){
		//localStorage.clear();
		console.log("co to? "+localStorage.getItem('message'))
		this.setState({
			info: localStorage.getItem('message')
			
		})
		console.log("teraz!!!!!!! "+this.state.w)
		console.log("??? "+localStorage.getItem('user'));
		
	
			fetch(this.props.http+'/ans',{
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
			this.setState({
				time: response.time,
				session: response.session
			})
		})

			
	}
	render(){
		return(
			<FormShow time={this.state.time} session={this.state.session} http={this.props.http}/>
		)
	}
}

class ButtonFetch extends Component { 
constructor(props){
		super(props);
		console.log(this.props.dt1)
	
	}
componentWillReceiveProps(nextProps){
	console.log(nextProps.dt3)
    if(nextProps.dt1 !== this.props.dt1){
         this.setState({
			 dt1: nextProps.dt1,			 
		 })
    }
	if(nextProps.dt2 !== this.props.dt2){
         this.setState({
			 dt2: nextProps.dt2,
			 			 
		 })
    }

}
		
	check = (e) =>{
		this.setState({
			dt1:'',
			dt2:''
		})

	
		fetch(this.props.http+'/ch',{
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
			window.location.reload()

		})

	}
	
		send = (e) =>{
	
		if(this.props.dt1!=="" && this.props.dt2!=="" && this.props.dt3!==""){
		
			fetch(this.props.http+'/ap',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				dt1: this.props.dt1,
				dt2: this.props.dt2,
				dt3: this.props.dt3
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
	render(){
		return(
		<Button className='m-2' variant="primary" size="sm" onClick={this.props.name=='Ok'? this.send: this.check}>{this.props.name}</Button>
		)
	}
}
class FormShow extends Component {
	constructor(){
		super();
		this.state = {
			w: 0,
			dt1: '',
			dt2: '',
			dt3: '',
			info: "",
		}
	}
	componentWillReceiveProps(nextProps){
		console.log("time "+this.props.time+" a " +nextProps.time)
  if(nextProps.time!==this.props.time){
   if(this.props.session===null){localStorage.clear();
		window.location.reload();
		}
		if(nextProps.time>0){{this.setState({
				w:4
			})
		}
		}
  }
}
	log = (x) => e => {
		
		this.setState({
			dt1:'',
			dt2:''
		})
		console.log("ok");
		x===1 ? this.setState({
			w:2
		})
		: this.setState({
			w:1
		})
		e.preventDefault();
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
	componentDidMount(){
	//localStorage.clear();
	
		if(localStorage.getItem('message')==='Ok!') this.setState({
				w:0
			})
		else if(localStorage.getItem('message')==='I can\'t see this account'||localStorage.getItem('message')==='This account exist!'||localStorage.getItem('message')==='Write something!'){
					
				this.setState({
				w:5,
				info: localStorage.getItem('message')
			})
			localStorage.removeItem('message');
			}
		else if(localStorage.getItem('message')==='Add new account!'){
					
				this.setState({
				w:6,
				info: localStorage.getItem('message')
			})
			localStorage.removeItem('message');
			}
		else this.setState({
				w:1
			})
			
	}
	
	render(){
			console.log("ekran: "+this.state.w)
		return(
		
		this.state.w===1 || this.state.w===5 || this.state.w===6?<Form>
		<Form.Label className="new">Are you new?</Form.Label><br/>
		<Form.Label>Name: </Form.Label><Form.Control type="text" value={this.state.dt1} onChange={this.Ch(1)} name="name"/>
		<Form.Label>Surname: </Form.Label><Form.Control type="text" value={this.state.dt2} onChange={this.Ch(2)} name="surn"/>
		<Form.Label>Password: </Form.Label><Form.Control type="password" value={this.state.dt3} onChange={this.Ch(3)} name="pass"/>
		<ButtonFetch dt1={this.state.dt1} dt2={this.state.dt3} dt3={this.state.dt3} http={this.props.http} name="Ok"/>
		
		<Button className='m-2' variant="primary" size="sm" onClick={this.log(1)}>I've account!</Button>
			{this.state.w===5? <Alert variant='danger'>{this.state.info}</Alert> : null}
			{this.state.w===6? <Alert variant='success'>{this.state.info}</Alert> : null}
		</Form>
		: this.state.w===2?<Form><Form.Label>Name: </Form.Label><Form.Control type="text" value={this.state.dt1} onChange={this.Ch(1)} name="name1"/>
		<Form.Label>Password: </Form.Label><Form.Control type="password" value={this.state.dt2} onChange={this.Ch(2)} name="pass1"/>
		<ButtonFetch dt1={this.state.dt1} dt2={this.state.dt2} http={this.props.http} name="Log in"/>
		<Button className='m-2' variant="primary" size="sm" onClick={this.log(2)}>Back</Button>
		</Form>
		: this.state.w===4? <ToDoList http={this.props.http}/>
		: <Spinner animation="border"/> 
			
		)
	}
}
export default FormFetch;