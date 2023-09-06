import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import SearchWallets from './SearchWallets';
import WalletFilter from './WalletFilter';

const Wallets = () => {
const [wallets, setWallets] = useState([]);
const [loading, setLoading] = useState(false);
const features = wallets.length > 0 ? Object.keys(wallets[0]).filter(feature => feature !== '_id' && feature !== 'Category') : [];
const [activeCategory, setActiveCategory] = useState('On-chain');

const [displayAllWallets, setDisplayAllWallets] = useState(true);
const [searchedWallets, setSearchedWallets] = useState([]);

const [shownColumns, setShownColumns] = useState(['Name']);

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

const handleColumnToggle = (newShownColumns) => {
    setShownColumns(newShownColumns);
};

useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/wallets/${activeCategory}`)
        .then(response => response.json())
        .then(data => {
            setWallets(data.data);
            const newFeatures = data.data.length > 0 ? Object.keys(data.data[0]).filter(feature => feature !== '_id' && feature !== 'Category') : [];
            const columnsToAdd = newFeatures.filter(feature => !shownColumns.includes(feature));
            setShownColumns(prev => ['Name', ...columnsToAdd.slice(0, 6)]);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
}, [activeCategory]);

return (
        <>
        <FilterContainer>
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
            <WalletFilter columns={features} shownColumns={shownColumns} onColumnToggle={handleColumnToggle} />
        </FilterContainer>
            {loading ? (
                <LoadingMessage>Loading wallets...</LoadingMessage>
            ) : (
            <StyledTable>
                <thead>
                    <tr>
                        {shownColumns.map(feature => (
                        <StyledTableHeader key={feature}>{feature}</StyledTableHeader>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayWallets.map(wallet => (
                        <tr key={wallet._id}>
                            {shownColumns.map(feature => (
                                <StyledTableCell key={feature}>
                                    {typeof wallet[feature] === "object" ? JSON.stringify(wallet[feature]) : wallet[feature]}
                                </StyledTableCell>
                    ))}
                    </tr>
                ))}
                </tbody>
            </StyledTable>
            )}
        </>
    );  
}

    const StyledTable = styled.table`
    width: 90vw;
    border-collapse: separate ;
    align-items: center;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    `;

    const StyledTableCell = styled.td`
    /* border: 1px solid black; */
    padding: 8px 12px;
    text-align: left;
    `;

    const StyledTableHeader = styled.th`
    /* border: 1px solid black; */
    padding: 8px 12px;
    background-color: #f2f2f2;
    text-align: left;
    `;

    const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    `;

    const FilterContainer = styled.div`
        display: flex;
        align-items: baseline;
        justify-content: center;
    `;

export default Wallets;
