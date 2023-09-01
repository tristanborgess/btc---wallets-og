import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import SearchWallets from './SearchWallets';

const Wallets = () => {
const [wallets, setWallets] = useState([]);
const features = wallets.length > 0 ? Object.keys(wallets[0]).filter(feature => feature !== '_id' && feature !== 'Category') : [];
const [activeCategory, setActiveCategory] = useState('On-chain');

const [displayAllWallets, setDisplayAllWallets] = useState(true);
const [hasSearched, setHasSearched] = useState(false);
const [searchedWallets, setSearchedWallets] = useState([]);

//For the wallet search feature. It checks if the wallet is already displayed and adds the searched wallet to the displayWallets array
const handleSearch = (wallet) => {
    if (!searchedWallets.some(w => w._id === wallet._id)) {
        setSearchedWallets(prevWallets => [...prevWallets, wallet]);
        setDisplayAllWallets(false);
    } else {
        console.log("Wallet already displayed");
        console.log("Wallets in searched", searchedWallets);
        console.log("Trying to add:", wallet);
    }
};

const handleClearSearch = () => {
    setSearchedWallets([]);
    setDisplayAllWallets(true);
};

const displayWallets = displayAllWallets ? wallets : searchedWallets;

console.log("Rendering with displayWallets:", displayWallets);

useEffect(() => {
    fetch(`http://localhost:3000/wallets/${activeCategory}`)
        .then(response => response.json())
        .then(data => {
            setWallets(data.data);
        })
        .catch(err => console.error(err));
}, [activeCategory]);

return (
        <>
            <Tabs 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
            />
            <SearchWallets 
                onSearch={handleSearch} 
                onClear={handleClearSearch} 
                activeCategory={activeCategory}
                wallets={wallets}
                hasSearched={!displayAllWallets}
            />
            <button onClick={() => console.log(searchedWallets)}>Log searchedWallets</button>

            <StyledTable>
                <thead>
                    <tr>
                        {features.map(feature => (
                        <StyledTableHeader key={feature}>{feature}</StyledTableHeader>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayWallets.map(wallet => (
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
