import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';

const Wallets = () => {
const [wallets, setWallets] = useState([]);
const features = wallets.length > 0 ? Object.keys(wallets[0]).filter(feature => feature !== '_id' && feature !== 'Category') : [];
const [activeCategory, setActiveCategory] = useState('On-chain');


useEffect(() => {
    fetch(`http://localhost:3000/wallets/${activeCategory}`)
        .then(response => response.json())
        .then(data => setWallets(data.data))
        .catch(err => console.error(err));
}, [activeCategory]);


// Return: JSX
return (
        <>
        <Tabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <StyledTable>
            <thead>
            <tr>
                {features.map(feature => (
                <StyledTableHeader key={feature}>{feature}</StyledTableHeader>
                ))}
            </tr>
            </thead>
            <tbody>
            {wallets.map(wallet => (
                <tr key={wallet._id}>
                {features.map(feature => (
                    <StyledTableCell key={feature}>
                    {typeof wallet[feature] === "object" ? JSON.stringify(wallet[feature]) : wallet[feature]}
                </StyledTableCell>
                
                ))}
                </tr>
            ))}
            </tbody>
        </StyledTable>
        </>
    );
    }

    const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    `;

    const StyledTableCell = styled.td`
    border: 1px solid black;
    padding: 8px 12px;
    text-align: left;
    `;

    const StyledTableHeader = styled.th`
    border: 1px solid black;
    padding: 8px 12px;
    background-color: #f2f2f2;
    text-align: left;
    `;

export default Wallets;
