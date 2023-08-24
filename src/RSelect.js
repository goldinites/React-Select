import React, {useMemo, useRef, useState} from 'react';
import useClickOutside from "./hooks/useClickOutside";

const RSelect = (props) => {
    const {
        multiply,
        searchable,
        hideSelected,
        options,
        initialValue,
        labelValue,
        optionValue,
        selectLabel,
        setOption,
    } = props;

    const preparedInitialValue = () => {
        if (multiply) {
            if (initialValue.length > 1) {
                return [...initialValue]
            } else {
                return [initialValue]
            }
        } else {
            return initialValue;
        }
    }

    const [currentValue, setCurrentValue] = useState(preparedInitialValue());

    const [searchQuery, setSearchQuery] = useState('');

    let [isOpen, toggleOpen] = useState(false);
    const selectNode = useRef()
    useClickOutside(selectNode, () => {
        toggleOpen(false);
    })

    const toggleSelect = () => {
        toggleOpen(!isOpen)
    }

    const searchedOptions = useMemo(() => {
        const baseSearch = (option) => {
            return option[labelValue]?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        }

        const checkSelectedOptions = (option) => {
            if (Array.isArray(currentValue)) {
                return currentValue?.every(value => value[optionValue] !== option[optionValue])
            } else {
                return currentValue[optionValue] !== option[optionValue];
            }
        }

        if (hideSelected) {
            return options?.filter(option => {
                return baseSearch(option) && checkSelectedOptions(option);
            });
        }

        return options?.filter(option => baseSearch(option));
    }, [currentValue, hideSelected, labelValue, optionValue, options, searchQuery])

    const changeOption = (option) => {
        if (multiply) {
            const checkUniqueValues = currentValue.every(value => value[optionValue] !== option[optionValue]);
            const newOptions = [...currentValue];

            if (checkUniqueValues) {
                newOptions.push(option)
            }

            setOptionHandler(newOptions);
        } else {
            setOptionHandler(option)
        }

        setSearchQuery('');
        toggleOpen(false)
    }

    const setOptionHandler = (option) => {
        setCurrentValue(option)
        setOption(option)
    }

    const selectSearchOptions = (query) => {
        setSearchQuery(query)
    }

    const deleteValue = (e, deletingValue) => {
        e.stopPropagation();
        if (multiply) {
            setCurrentValue(currentValue?.filter((value) => {
                return value[optionValue] !== deletingValue
            }))
        } else {
            setCurrentValue({})
        }
    }

    return (
        <div className="select__wrapper">
            {
                selectLabel
                    ?
                    <div className="select__label">{selectLabel}</div>
                    : ''
            }
            <div ref={selectNode} className={['select', isOpen ? 'select--open' : ''].join(' ')}>
                <div className="select__title" onClick={toggleSelect}>
                    <div className="select__title-content">
                        {
                            multiply
                                ?
                                currentValue.map((value, index) => {
                                    if (value[optionValue]) {
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
                                    }

                                    return '';
                                })
                                : currentValue[optionValue]
                                    ?
                                <span className="select__title-item">
                                    <span className="select__title-item-text">
                                        {currentValue[labelValue]}
                                    </span>
                                    <span
                                        className="select__title-item-delete"
                                        onClick={(e) => deleteValue(e, currentValue[optionValue])}
                                    >
                                        &times;
                                    </span>
                                </span>
                                : ''
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
                    <div className="select__title-arrow">
                        &#9660;
                    </div>
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
        </div>
    );
};

export default RSelect;
