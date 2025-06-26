export const TodoItem = ({ todo, onToggle, onDelete, onEdit, index }) => {
  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      onClick={() => onToggle(todo.id)}
    >
      <span className="todo-index">{index + 1}.&nbsp;</span>
      <span className="todo-text">{todo.title}</span>
      <span className="todo-actions" onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}>
        🗑️
      </span>
    </li>
  );
};
