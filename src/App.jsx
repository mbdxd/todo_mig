import { useState } from 'react';

import "./App.css";
import Todo from './componentes/Todo';
import Todoform from './componentes/Todoform';
import Search from './componentes/Search';
import Filter from './componentes/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc")

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const addTodo = (text, category) => {
    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    }];
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id, updatedText, updatedCategory) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: updatedText, category: updatedCategory };
      }
      return todo;
    });
    setTodos(newTodos);
    setIsEditing(false);
  };

  const startEditing = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  return (
    <div className='app'>
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />

      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className='todo-list'>
        {todos
        .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
        .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
        .map((todo) => (
          <Todo key={todo.id} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} startEditing={startEditing} />
        ))}
      </div>
      {isEditing ? (
        <Todoform addTodo={editTodo} currentTodo={currentTodo} isEditing={isEditing} />
      ) : (
        <Todoform addTodo={addTodo} />
      )}
    </div>
  );
}

export default App;
