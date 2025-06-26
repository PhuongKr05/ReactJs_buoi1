const KEY = 'todos_data';

export const getTodos = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTodos = (todos) => {
  localStorage.setItem(KEY, JSON.stringify(todos));
};
