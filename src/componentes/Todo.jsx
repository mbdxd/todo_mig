import React from "react";

const Todo = ({ todo, completeTodo, removeTodo, startEditing }) => {
  return (
    <div>
      <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
        <div className="content">
          <p>{todo.text}</p>
          <p className="category">({todo.category})</p>
        </div>
        <div>
          <button className="complete" onClick={() => completeTodo(todo.id)}>
            {todo.isCompleted ? 'Completo!' : 'Completar'}
          </button>
          <button className="edit" onClick={() => startEditing(todo)}>Editar</button>
          <button className="remove" onClick={() => removeTodo(todo.id)}>X</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
