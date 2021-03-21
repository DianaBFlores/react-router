import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
// import uuidv4 from 'uuid/v4'
import { v4 as uuidv4 } from 'uuid';
// npm i uuid downloaded in console and imported above. uuid imports is a libray that lest you create random ids.


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // storing todos
  useEffect (() => {
    const storedTodos = JSON.parse(localStorage.getItem
      (LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // saving and added todo to local storage
  // anytime the array of "todos" changes, we are saving our todos
  useEffect(() => { 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

    function toggleTodo(id) {
      const newTodos = [...todos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.complete = !todo.complete
      setTodos(newTodos)
    }



  // funtion that generates a random id with uuid download 
  function handleAddToDo(e) {
    const name =  todoNameRef.current.value
    if (name === '') return
    // console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos,{ id: uuidv4(), name: name, complete: false}]
    })
    // emptys input last typed
    todoNameRef.current.value = null
  }

  function handleClearTodos () {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  return (
    <>
    <TodoList todos={todos} toggleTodo= {toggleTodo}/>
    <input ref ={todoNameRef} type="text"/>
    <button onClick={handleAddToDo}> Add To do</button>
    <button onClick={handleClearTodos}>Clear Complete</button>
    <div> {todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    
  )
  }

export default App 
