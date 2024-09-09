import './App.css';
import React,{ useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addTodo,completeTodo,deleteTodo,updateTodo } from './actions/todoAction';
import { Modal,Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [task, setTask] = useState("")
  const [editTask, setEditTask] = useState("")
  const [filter, setFilter] = useState("all")

  const todos=useSelector(state=>state.todoReducer)
  const dispatch=useDispatch()
  return (
    <div className="App">
      
       <input type="text" placeholder='Add task ..' onChange={(e)=>setTask(e.target.value)}/>
       <Button variant="primary" onClick={()=>dispatch(addTodo(task))}>Add Task</Button>
       <div className="filter-buttons d-flex justify-content-between">
  <Button variant="info" className="flex-grow-1 mx-2" onClick={() => setFilter("all")}>
    All
  </Button>
  <Button variant="info" className="flex-grow-1 mx-2" onClick={() => setFilter("done")}>
    Done
  </Button>
  <Button variant="info" className="flex-grow-1 mx-2" onClick={() => setFilter("undone")}>
    Undone
  </Button>
</div>

       
       { filter==="all" ? 
       todos.map(el=> <div>
        <h2>{el.title}</h2>

        <div className="task-buttons d-flex justify-content-between">
  <Button variant="primary" className="flex-grow-1 mx-2" onClick={handleShow}>
    Update
  </Button>
  
  <Modal show={show} onHide={handleClose}>
    <Modal.Body>
      <input 
        type="text" 
        placeholder='edit task ..' 
        value={editTask} 
        onChange={(e) => setEditTask(e.target.value)} 
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" className="flex-grow-1 mx-2" onClick={handleClose}>
        Close
      </Button>
      <Button 
        variant="primary" 
        className="flex-grow-1 mx-2" 
        onClick={() => { 
          dispatch(updateTodo(editTask, el.id)); 
          handleClose(); 
        }}
      >
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  
  <Button variant="danger" className="flex-grow-1 mx-2" onClick={() => dispatch(deleteTodo(el.id))}>
    Delete
  </Button>
  
  <Button 
    variant="warning" 
    className="flex-grow-1 mx-2" 
    onClick={() => dispatch(completeTodo(el.id))}
  >
    {el.complete ? "Done" : "Undone"}
  </Button>
</div>

       </div>) : 
       filter==="done" ? todos.filter(el=>el.complete===true)
       
       .map(el=> <div>
        <h2>{el.title}</h2>
        <button  onClick={()=>dispatch(deleteTodo(el.id))}>Delete</button>
        <button onClick={()=>dispatch(completeTodo(el.id))}>{el.complete ? "done":"undone"}</button>
        </div>) : todos.filter(el=>el.complete===false)

      .map(el=> <div>
       <h2>{el.title}</h2>
       <button  onClick={()=>dispatch(deleteTodo(el.id))}>Delete</button>
       <button onClick={()=>dispatch(completeTodo(el.id))}>{el.complete ? "done":"undone"}</button>
       </div>) 
       }
    </div>
      );
}

export default App;
