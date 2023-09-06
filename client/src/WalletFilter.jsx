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
        </DropdownContainer>
    );
}


const DropdownContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export default WalletFilter;
