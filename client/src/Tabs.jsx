import React from 'react';
import styled from 'styled-components';

const Tabs = ({ activeCategory, onCategoryChange }) => {

return (
<TabContainer>
    <TabButton 
    selected={activeCategory === 'On-chain'} 
    onClick={() => onCategoryChange('On-chain')}
    >
    On-chain
    </TabButton>
    <TabButton 
    selected={activeCategory === 'Lightning'} 
    onClick={() => onCategoryChange('Lightning')}
    >
    Lightning
    </TabButton>
    <TabButton 
    selected={activeCategory === 'Hardware'} 
    onClick={() => onCategoryChange('Hardware')}
    >
    Hardware
    </TabButton>
</TabContainer>
);
};

const TabContainer = styled.div`
display: flex;
margin-bottom: 20px;
`;

const TabButton = styled.button`
padding: 10px 20px;
cursor: pointer;
background-color: ${({ selected }) => (selected ? '#ccc' : 'transparent')};
border: none;
margin-right: 10px;
transition: background-color 0.2s;

&:hover {
background-color: #f2f2f2;
}
`;

export default Tabs;
