import React, {useState} from 'react';
import './styles/styles.scss';
import RSelect from './RSelect';

const App = () => {
    const BASE_URL = 'https://countriesnow.space/api/v0.1/countries'

    let getCountries = async () => {
        const response = await fetch(`${BASE_URL}`).then(response => response.json())
        const {data} = response;

        return data;
    }

    const [countries, setCountries] = useState([]);

    getCountries()
        .then(response => {
            setCountries(response)
        });

    const [currentOption, setOptionSort] = useState({})

    const setOptionHandler = (sort) => {
        setOptionSort(sort)
    }

    return (
        <div className="app">
            <div className="container">
                <RSelect
                    selectLabel="Choice country"
                    searchable={false}
                    multiply={false}
                    hideSelected={true}
                    initialValue={currentOption}
                    options={countries}
                    labelValue="country"
                    optionValue="iso2"
                    setOption={(sort) => setOptionHandler(sort)}
                />
            </div>
        </div>
    );
};

export default App;
