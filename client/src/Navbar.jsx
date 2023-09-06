import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import UserContext, { useUser } from './UserContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [blockHeight, setBlockHeight] = useState(null);
    const { user, setUser } = useContext(UserContext);

    const handleSignout = () => {
        setUser(null);
    };

    useEffect(() => {
        // Fetch the current Bitcoin block height
        fetch("https://mempool.space/api/blocks/tip/height")
            .then(response => response.json())
            .then(data => setBlockHeight(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <NavContainer>
            <Link to="/">btc---wallets</Link>
            <div>
                <IconPlaceholder /> Block: {blockHeight}
                {!user ? (
                <Link to="/signin">Sign In</Link>
            ) : (
                <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleSignout}>Sign Out</button>
                </>
            )}
            </div>
        </NavContainer>
    );
};

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
`;

const Title = styled.h1`
    font-size: 24px;
`;

const IconPlaceholder = styled.span`
    padding: 10px;
    background-color: #555;
    margin-right: 10px;
`;

const ProfileIcon = styled.button`
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
`;

export default Navbar;
