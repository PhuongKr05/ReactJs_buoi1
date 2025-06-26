import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const STORAGE_KEY = 'todos_data';

const fetchTodos = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return data.slice(0, 10);
};

export const useTodos = () => {
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    enabled: false,
  });

  const loadTodos = async () => {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) return JSON.parse(localData);

    const { data } = await query.refetch();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  };

  return { loadTodos };
};
