import React, {useMemo, useRef, useState} from 'react';
import useClickOutside from "../../hooks/useClickOutside";

const RSelect = ({initialValue, labelValue, optionValue, multiply, options, setOption, searchable, hideSelected}) => {
    const selectNode = useRef()
    useClickOutside(selectNode, () => {
        toggleOpen(false);
    })

    const [currentValue, setCurrentValue] = useState(multiply ? [...initialValue] : initialValue);

    const [searchQuery, setSearchQuery] = useState('');

    let [isOpen, toggleOpen] = useState(false);

    const searchedOptions = useMemo(() => {
        if (hideSelected) {
            if (multiply) {
                return options.filter(option => {
                    const checkSearchName = option[labelValue].toLowerCase().includes(searchQuery.toLowerCase())
                    const checkSelectedOptions = currentValue.every(value => value[optionValue] !== option[optionValue])

                    return checkSearchName && checkSelectedOptions;
                });
            } else {
                return options.filter(option => {
                    const checkSearchName = option[labelValue].toLowerCase().includes(searchQuery.toLowerCase())
                    const checkSelectedOptions =  currentValue[optionValue] !== option[optionValue];

                    return checkSearchName && checkSelectedOptions;
                });
            }
        }

        return options.filter(option => option[labelValue].toLowerCase().includes(searchQuery.toLowerCase()));
    }, [currentValue, hideSelected, labelValue, multiply, optionValue, options, searchQuery])

    const toggleSelect = () => {
        toggleOpen(!isOpen)
    }

    const changeOption = (option) => {
        if (multiply) {
            const checkUniqueValues = currentValue.every(value => value[optionValue] !== option[optionValue]);
            setCurrentValue(checkUniqueValues ? [...currentValue, option] : [...currentValue])
            setOption(checkUniqueValues ? [...currentValue, option] : [...currentValue])
        } else {
            setCurrentValue(option)
            setOption(option)
        }
        setSearchQuery('');
        toggleOpen(false)
    }

    const selectSearchOptions = (query) => {
        setSearchQuery(query)
    }

    const deleteValue = (e, deletingValue) => {
        e.stopPropagation();
        setCurrentValue(currentValue.filter(value => value[optionValue] !== deletingValue))
    }

    return (
        <div ref={selectNode} className={['select', isOpen ? 'select--open' : ''].join(' ')}>
            <div className="select__title" onClick={toggleSelect}>
                {
                    multiply
                        ?
                        currentValue.map((value, index) => {
                            return (
                                <span className="select__title-item" key={index}>
                                    <span className="select__title-item-text">
                                        {value[labelValue]}
                                    </span>
                                    <span
                                        className="select__title-item-delete"
                                        onClick={(e) => deleteValue(e, value[optionValue])}>
                                        &times;
                                    </span>
                                </span>
                            )
                        })
                        :
                        <span>{currentValue[labelValue]}</span>
                }
                {
                    searchable ?
                        <div className="select__title-search">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => selectSearchOptions(e.target.value)}
                            />
                        </div>
                        : ''
                }
            </div>
            {
                isOpen
                    ?
                    <ul className="select__list">{
                        searchedOptions.map((option, index) => {
                            return (
                                <li
                                    className="select__item"
                                    key={index}
                                    onClick={() => changeOption(option)}
                                >
                                    {option[labelValue]}
                                </li>
                            )
                        })
                    }</ul>
                    : ''
            }
        </div>
    );
};

export default RSelect;
