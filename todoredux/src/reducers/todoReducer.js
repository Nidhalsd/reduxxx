import { v4 as uuidv4 } from 'uuid';
import { ADD, COMPLETE, DELETE, UPDATE } from '../actions/types';

const todo=[
    {
        id:uuidv4,
        complete:false,
        title: "task"
    }
]
const todoReducer=(state=todo,action) => {
    switch (action.type) {
        case ADD : return [...state,{title:action.payload, id:uuidv4(),complete:false}]
        case DELETE : return state.filter(el=>el.id!==action.payload)
        case COMPLETE : return state.map(el=>el.id===action.payload ? {...el,complete:!el.complete}:el)
        case UPDATE : return state.map(el=>el.id===action.payload.id ? {...el,title:action.payload.editTask}:el)
        default: return state 


    }
}

export default todoReducer