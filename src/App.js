import React, {useState} from 'react';
import './styles/styles.scss';
import ReactSelect from './ReactSelect';
import countries from './api';

const App = () => {
    const initialValue = countries.filter(country => {
        const myCountries = [
            'Austria',
            'Belgium',
            'Brazil',
            'Chile',
            'Czech Republic',
            'Denmark',
            'Egypt',
            'Faroe Islands',
            'Finland',
            'France',
            'Georgia',
            'Germany',
            'Greece',
            'Ireland',
            'Iceland',
            'Maldives',
            'Portugal',
            'Israel',
            'Italy',
            'Japan',
            'Mexico',
            'Monaco',
            'Netherlands',
            'New Zealand',
            'Norway',
            'Philippines',
            'Spain',
            'Sweden',
            'Switzerland',
            'Thailand',
            'United Arab Emirates',
            'United Kingdom',
            'United States',
            'PortugalMaldives',
            'Luxembourg',
            'Liechtenstein',
            'Canada',
            'Australia',
            'Argentina'
        ];
        return myCountries.includes(country.name);
    });

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
