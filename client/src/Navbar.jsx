import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Navbar = ({ isSignedIn, handleSignOut, handleSignIn }) => {
    const [blockHeight, setBlockHeight] = useState(null);

    useEffect(() => {
        // Fetch the current Bitcoin block height
        fetch("https://mempool.space/api/blocks/tip/height")
            .then(response => response.json())
            .then(data => setBlockHeight(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <NavContainer>
            <Title>btc---wallets</Title>
            <div>
                <IconPlaceholder /> Block: {blockHeight}
                <ProfileIcon onClick={isSignedIn ? handleSignOut : handleSignIn}>
                    {isSignedIn ? 'Sign out' : 'Sign in'}
                </ProfileIcon>
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
