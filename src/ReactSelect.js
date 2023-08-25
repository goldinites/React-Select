import React, {useMemo, useRef, useState} from 'react';
import useClickOutside from "./hooks/useClickOutside";

const ReactSelect = (props) => {
    const {
        multiply,
        searchable,
        hideSelected,
        options,
        initialValue,
        labelValue,
        optionValue,
        selectLabel,
        showDropdownArrow,
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

        console.log(options?.filter(option => baseSearch(option)))

        return options?.filter(option => baseSearch(option));
    }, [currentValue, hideSelected, labelValue, optionValue, options, searchQuery])

    useClickOutside(selectNode, () => {
        toggleOpen(false);
    })

    const toggleSelect = () => {
        if (!searchQuery.length) {
            toggleOpen(!isOpen)
        }
    }

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

            setSearchQuery('');
            toggleOpen(false)
        }
    }

    const setOptionHandler = (option) => {
        setCurrentValue(option)
        setOption(option)
    }

    const selectSearchOptions = (query) => {
        setSearchQuery(query)
    }

    const deleteValue = (e, deletingValue, clearAll) => {
        e.stopPropagation();
        if (multiply) {
            if (clearAll) {
                setCurrentValue([])
                toggleOpen(false)
            } else {
                setCurrentValue(currentValue?.filter((value) => {
                    return value[optionValue] !== deletingValue
                }))
            }
        } else {
            setCurrentValue({})
        }
    }

    const renderSelectSearch = () => {
        if (searchable && options.length) {
            return (
                <div className="select__title-search">
                    <input
                        className="select__title-search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => selectSearchOptions(e.target.value)}
                    />
                </div>
            );
        }
    }

    const renderSelectLabel = () => {
        if (selectLabel) {
            return (
                <div className="select__label">{selectLabel}</div>
            );
        }
    }

    const renderOptionsList = () => {
        if (isOpen) {
            return (
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
            )
        }
    }

    const renderSelectTitle = () => {
        const renderMultiplyValues = () => {
            return (
                currentValue.map((value, index) => {
                    return (
                        renderSingleValue(value, index)
                    )
                })
            )
        }

        const renderSingleValue = (value, key) => {
            if (value[optionValue]) {
                return (
                    <span className="select__title-item" key={key}>
                        <span className="select__title-item-text">
                            {value[labelValue]}
                        </span>
                        <span
                            className="select__title-item-delete"
                            onClick={(e) => deleteValue(e, value[optionValue])}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
                            </svg>
                        </span>
                    </span>
                )
            }
        }

        const renderDropdownArrow = () => {
            if (searchedOptions.length && showDropdownArrow) {
                return (
                    <div className="select__title-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                            <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/>
                        </svg>
                    </div>
                )
            }
        }

        const renderClearAllButton = () => {
            if (multiply && currentValue.length > 1) {
                return (
                    <div
                        className="select__clear-all"
                        onClick={(e) => deleteValue(e, null, true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                            <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
                        </svg>
                    </div>
                )
            }
        }

        return (
            <div className="select__title" onClick={toggleSelect}>
                <div className="select__title-content">
                    {multiply ? renderMultiplyValues() : renderSingleValue(currentValue, 0)}

                    {renderSelectSearch()}
                </div>
                <div className="select__actions">
                    {renderClearAllButton()}
                    {renderDropdownArrow()}
                </div>
            </div>
        )
    }

    const selectClass = () => {
        const selectOpen = isOpen ? 'select--open' : '';
        const selectDisabled = !options.length ? 'select--disabled' : '';

        return ['select', selectOpen, selectDisabled].join(' ');
    }

    return (
        <div className="select__wrapper">
            {renderSelectLabel()}
            <div ref={selectNode} className={selectClass()}>
                {renderSelectTitle()}
                {renderOptionsList()}
            </div>
        </div>
    );
};

export default ReactSelect;
