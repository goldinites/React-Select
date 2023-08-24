import React, {useState} from 'react';
import RInput from "./ui/RInput";
import RButton from "./ui/RButton";

const TodoForm = ({onCreate}) => {
    const [todo, setTodo] = useState({
        name: '',
        text: ''
    })

    const createNewTodo = (e) => {
        e.preventDefault();

        onCreate({...todo, id: Date.now()})

        setTodo({
            name: '',
            text: ''
        })
    }

    return (
        <form className="form">
            <RInput
                name="name"
                type="text"
                placeholder="Новое напоминание"
                label="Запишите напоминание"
                autoComplete="off"
                value={todo.name}
                onChange={(e) => setTodo({...todo, name: e.target.value})}
            />
            <RInput
                name="text"
                type="text"
                autoComplete="off"
                placeholder="Текст напоминания"
                label="Запишите текст напоминания"
                value={todo.text}
                onChange={(e) => setTodo({...todo, text: e.target.value})}
            />
            <RButton type="submit" onClick={createNewTodo}>Создать</RButton>
        </form>
    );
};

export default TodoForm;
