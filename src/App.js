import React from 'react';
import { useState, useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import './App.css';
import axios from 'axios';
const API_BASE = "http://localhost:8080"
function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopUpActive] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    GetTodos();
  }, [todos])
  const GetTodos = async () => {
    const { data } = await axios.get(`${API_BASE}/todos`);
    setTodos(data);
  }
  const deleteTodo = async (id) => {
    await fetch(API_BASE + "/todo/delete/" + id, { method: 'delete' });
  }
  const addTodo = async (input) => {
    await axios.post(`${API_BASE}/todo/new`, {
      text: input
    })
    setPopUpActive(false);
    setInput('');
  }
  return (
    <div className="App">
      <h4>My Todos</h4>
      <div className="todos">
        {

          todos.map(todo => (

            <div className="todo" key={todo._id}>
              <div className="checkbox"></div>
              <div className="text-div">
                <p className='text'>{todo.text}</p>
              </div>
              <RxCross1 className='cross' onClick={() => deleteTodo(todo._id)} />
            </div>

          ))}
        <div className='add-todo' onClick={() => setPopUpActive(true)}><AiOutlinePlus /></div>

        {
          popupActive ? <div className='modal'><RxCross1 className='cross1' onClick={() => setPopUpActive(false)} />
            <div className="content">
                <input type="text" value={input} required className="input-field" onChange={(e) => setInput(e.target.value)} placeholder='Start Todo' />
                <button type='submit' className='add-button' onClick={(e) => !input ? e.preventDefault() : addTodo(input)}>Add</button>

            </div>

          </div> : ''

        }
      </div>

    </div>
  );
}

export default App;
