import React, { useState } from 'react';
import './styles/styles.scss';
import RSelect from './RSelect';
import countries from './api';

const App = () => {
    const [currentOption, setOptionSort] = useState({})

    const setOptionHandler = (option) => {
        setOptionSort(option)
    }

    return (
        <div className="app">
            <div className="container">
                <RSelect
                    selectLabel="Choice country"
                    searchable={true}
                    multiply={false}
                    hideSelected={true}
                    initialValue={currentOption}
                    showDropdownArrow={true}
                    options={countries}
                    labelValue="name"
                    optionValue="code"
                    setOption={(sort) => setOptionHandler(sort)}
                />
            </div>
        </div>
    );
};

export default App;
