import React from 'react';
import TodoItem from "./TodoItem";

const TodoList = ({ todoList, onDeleteItem }) => {
    const items = [];

    const updateItems = () => {
        for (const i in todoList) {
            const todoItem = todoList[i];
            items.push(
                <TodoItem
                    item={{...todoItem, number: +i + 1}}
                    key={todoItem.id}
                    onDelete={(id) => deleteItem(id)}
                />
            )
        }
    }

    const deleteItem = (id) => {
        onDeleteItem(id)
    }

    updateItems();

    return (
        <div className="todo__list">
            {items}
        </div>
    );
};

export default TodoList;
