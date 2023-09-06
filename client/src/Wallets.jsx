import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import SearchWallets from './SearchWallets';
import WalletFilter from './WalletFilter';

const Wallets = () => {
const [wallets, setWallets] = useState([]);
const [loading, setLoading] = useState(false);
const features = wallets.length > 0 ? Object.keys(wallets[0]).filter(feature => feature !== '_id' && feature !== 'Category' && feature !== 'Name') : [];
const [activeCategory, setActiveCategory] = useState('On-chain');
const [displayAllWallets, setDisplayAllWallets] = useState(true);
const [hasSearched, setHasSearched] = useState(false);
const [searchedWallets, setSearchedWallets] = useState([]);

// const initialColumns = ['Name', ...features.slice(0, 6)];
const [shownColumns, setShownColumns] = useState(['Name']);

//For the wallet search feature. It checks if the wallet is already displayed and adds the searched wallet to the displayWallets array
const handleSearch = (wallet) => {
    if (!searchedWallets.some(w => w._id === wallet._id)) {
        setSearchedWallets(prevWallets => [...prevWallets, wallet]);
        setDisplayAllWallets(false);
    } else {
        console.error(err.message);
    }
};
const handleClearSearch = () => {
    setSearchedWallets([]);
    setDisplayAllWallets(true);
};
const displayWallets = displayAllWallets ? wallets : searchedWallets;

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
            <WalletFilter columns={features} shownColumns={shownColumns.slice(1)} onColumnToggle={setShownColumns} />
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

    const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    `;

export default Wallets;