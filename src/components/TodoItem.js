import React from 'react';

const TodoItem = ({item, onDelete}) => {
    const { id, name, text, number } = item;
    return (
        <div className="todo__item">
            <span className="todo__item-number">{number}</span>
            <div className="todo__item-content">
                <h2 className="todo__item-name">{name}</h2>
                <p className="todo__item-text">{text}</p>
            </div>
            <p onClick={() => onDelete(id)}>Удалить &times;</p>
        </div>
    );
};

export default TodoItem;
