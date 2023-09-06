import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const Tabs = ({ activeCategory, onCategoryChange }) => {
    const options = [
        { value: 'On-chain', label: 'On-chain' },
        { value: 'Lightning', label: 'Lightning' },
        { value: 'Hardware', label: 'Hardware' }
    ];

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            onCategoryChange(selectedOption.value);
        }
    };

return (
  <DropdownContainer>
    <Select
        value={options.find(option => option.value === activeCategory)}
        onChange={handleChange}
        options={options}
        className="basic-single"
        classNamePrefix="select"
    />
  </DropdownContainer>
);
};

const DropdownContainer = styled.div`
display: flex;
margin-bottom: 20px;
`;

export default Tabs;
