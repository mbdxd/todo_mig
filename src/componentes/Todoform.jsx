import { useState, useEffect } from 'react';

function Todoform({ addTodo, currentTodo, isEditing }) {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (isEditing) {
      setValue(currentTodo.text);
      setCategory(currentTodo.category);
    }
  }, [isEditing, currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || !category) return;
    if (isEditing) {
      addTodo(currentTodo.id, value, category);
    } else {
      addTodo(value, category);
    }
    setValue('');
    setCategory('');
  };

  return (
    <div className='todo-form'>
      <h2>{isEditing ? 'Editar Tarefa' : 'Criar Tarefa'}: </h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Digite o título'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value=''>Selecione uma categoria!</option>
          <option value='Trabalho'>Trabalho</option>
          <option value='Pessoal'>Pessoal</option>
          <option value='Estudos'>Estudos</option>
        </select>
        <button type='submit'>{isEditing ? 'Atualizar Tarefa' : 'Criar Tarefa'}</button>
      </form>
    </div>
  );
}

export default Todoform;
