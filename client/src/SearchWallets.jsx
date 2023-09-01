import React, { useState } from 'react';
import styled from 'styled-components';

const SearchWallets = ({ onSearch, activeCategory, wallets, hasSearched, onClear }) => {
    const [searchWallet, setSearchWallet] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearchInput = (e) => {
        setSearchWallet(e.target.value);
        if (e.target.value.length > 1) {
            const filteredSuggestions = wallets.filter(wallet => wallet.Name.toLowerCase().includes(e.target.value.toLowerCase()));
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (wallet) => {
        if (wallet) {
            onSearch(wallet);
            console.log(wallet);
            setSearchWallet("");
            setSuggestions([]);
            setErrorMsg("");
        } else {
            setErrorMsg(`Wallet not in ${activeCategory}`);
        }
    };

    return (
        <Container>
            <Search>
                <SearchInput 
                    value={searchWallet} 
                    onChange={handleSearchInput}
                    placeholder="Search for a wallet..."
                />
                {suggestions.length > 0 && (
                    <SuggestionsList>
                        {suggestions.map(wallet => (
                            <SuggestionItem key={wallet._id} onClick={() => handleSuggestionClick(wallet)}>
                                {wallet.Name}
                            </SuggestionItem>
                        ))}
                    </SuggestionsList>
                )}
            </Search>
            {errorMsg && <Error>{errorMsg}</Error>}
            {hasSearched && <ClearButton onClick={onClear}>Clear Search</ClearButton>}
        </Container>
    )
}

// Styling: Styled components

const Container = styled.div`
    position: relative;
    width: fit-content;
    margin: 20px;
`;

const Search = styled.div`
    position: relative;
`;

const SearchInput = styled.input`
    height: 30px;
    font-size: 18px;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const SuggestionsList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 5px 5px;
    background-color: white;
    z-index: 10;
`;

const SuggestionItem = styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f2;
    }
`;

const ClearButton = styled.button`
    margin-left: 20px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 15px;
    cursor: pointer;
    &:hover {
        background-color: darkred;
    }
`;


const Error = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;
export default SearchWallets;
