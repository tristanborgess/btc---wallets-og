import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const WalletFilter = ({ columns, shownColumns, onColumnToggle }) => {
    const filteredColumns = columns.filter(column => column !== 'Name');

    const options = filteredColumns.map(column => ({
        value: column,
        label: column
    }));

    const handleColumnChange = (selected) => {
        const newShownColumns = ['Name', ...selected.map(item => item.value)];
        onColumnToggle(newShownColumns);
    };

    const handleClear = () => {
        onColumnToggle(['Name']);
    };

    return (
        <DropdownContainer>
            <Select
                isMulti
                name="columns"
                options={options}
                value={shownColumns.filter(column => column !== 'Name').map(column => ({ value: column, label: column }))}
                onChange={handleColumnChange}
                className="basic-multi-select"
                classNamePrefix="select"
            />
            <ClearButton onClick={handleClear}>Clear</ClearButton>
        </DropdownContainer>
    );
}


const DropdownContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const ClearButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #d32f2f;
    color: #ffffff;
    cursor: pointer;
    &:hover {
        background-color: #c12727;
    }
`;

export default WalletFilter;
