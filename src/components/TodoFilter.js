import React, {useState} from 'react';
import RSelect from "./ui/RSelect";
import RInput from "./ui/RInput";

const TodoFilter = ({onChangeSort, onSearch}) => {
    const sort = [
        {
            name: 'По названию',
            value: 'name'
        },
        {
            name: 'По описанию',
            value: 'text'
        }
    ]

    const [searchQuery] = useState('');

    return (
        <div className="todo__filter">
            <RSelect
                options={sort}
                initialValue={sort[0]}
                setOption={(currentSort) => onChangeSort(currentSort)}
            />
            <div className="search" style={{margin: '20px 0'}}>
                <RInput
                    value={searchQuery}
                    label="Введите запрос поиска"
                    placeholder="Поиск..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default TodoFilter;
