import { useEffect, useState } from 'react';
import { useTodos } from './hooks/use.jsx';
import { getTodos, saveTodos } from './storage/localstorage.jsx';
import { TodoItem } from './components/items.jsx';
import './App.css';

const App = () => {
  const { loadTodos } = useTodos();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadTodos();
      setTodos(data);
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      title: text,
      completed: false,
    };
    const updated = [...todos, newTodo];
    setTodos(updated);
    saveTodos(updated);
    setText('');
  };

  const handleDelete = (id) => {
    const updated = todos.filter((t) => t.id !== id);
    setTodos(updated);
    saveTodos(updated);
  };

  const handleToggle = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updated);
    saveTodos(updated);
  };

  const handleEdit = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setText(todo.title);
      setEditingId(id);
    }
  };

  const handleSaveEdit = () => {
    const updated = todos.map((t) =>
      t.id === editingId ? { ...t, title: text } : t
    );
    setTodos(updated);
    saveTodos(updated);
    setText('');
    setEditingId(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h2>Hãy thêm những gì bạn cần làm!</h2>
      <p>
        Điền thông tin đầu vào và nhấp vào nút hoặc "Enter" để thêm nhiệm vụ mới vào danh sách.<br />
        Để đánh dấu là đã hoàn thành, chỉ cần nhấp trực tiếp vào nhiệm vụ
      </p>

      <div className="input-section">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập nhiệm vụ..."
          onKeyDown={(e) => e.key === 'Enter' && (editingId ? handleSaveEdit() : handleAdd())}
        />
        <button onClick={editingId ? handleSaveEdit : handleAdd}>+</button>
      </div>

      <div className="list-container">
        <div className="list-header">
          <h3>Danh sách:</h3>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="active">Chưa hoàn thành</option>
            <option value="completed">Đã hoàn thành</option>
          </select>
        </div>

        <ul>
          {filteredTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
