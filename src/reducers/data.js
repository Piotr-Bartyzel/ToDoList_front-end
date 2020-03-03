import {combineReducers} from "redux";

const data_r = (state=[], action) =>{
	console.log("jedneeeen")
	switch(action.type){
		case 'FETCH':
		return  {
		...state,	
		a: action.data1,
		b: action.data2
		
		}
			
		default:
		return state 
							
	}	
}

export default combineReducers({
	data_r
});