import React, {useState} from 'react';
import './styles/styles.scss';
import ReactSelect from './ReactSelect';
import countries from './api';

const App = () => {
    const initialValue = countries.find(country => country.name === 'Greece');

    const [currentOption, setOptionSort] = useState(initialValue)

    const setOptionHandler = (option) => {
        setOptionSort(option)
    }

    return (
        <div className="app">
            <div className="container">
                <ReactSelect
                    selectLabel="Choice country"
                    searchable={true}
                    multiply={true}
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
