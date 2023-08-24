import React, {useState} from 'react';

import './styles/styles.scss';

import selectData from "./selectData";
import RSelect from "./components/ui/RSelect";

const App = () => {
    const data = selectData.data;

    const [currentSort, setCurrentSort] = useState(data)

    const setSortHandler = (sort) => {
        setCurrentSort(sort)
    }

    return (
        <div className="app">
            <div className="container">
                <RSelect
                    searchable={true}
                    multiply={false}
                    hideSelected={false}
                    initialValue={currentSort}
                    options={data}
                    labelValue="country"
                    optionValue="iso2"
                    setOption={(sort) => setSortHandler(sort)}
                />
            </div>
        </div>
    );
};

export default App;
