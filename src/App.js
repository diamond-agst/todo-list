import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filtredTodos, setFiltredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filtredHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filtredHandler = () => {
    switch (status) {
      case 'completed':
        setFiltredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFiltredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFiltredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem('todos'));
      setTodos(localTodos);
    }
  };
  return (
    <div className="App">
      <header>
        <h1>Julia's Todo List </h1>
      </header>
      <Form
        setInputText={setInputText}
        setTodos={setTodos}
        todos={todos}
        inputText={inputText}
        setStatus={setStatus}
      />
      <TodoList
        filtredTodos={filtredTodos}
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
}

export default App;
