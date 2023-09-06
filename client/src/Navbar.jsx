import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import UserContext, { useUser } from './UserContext';
import { Link } from 'react-router-dom';
import blockIcon from './assets/block-01.svg';

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
            <StyledLink to="/">btc---wallets</StyledLink>
            <BlockContainer>
                <Icon src={blockIcon} alt="Block Icon"/> Block: {blockHeight}
            </BlockContainer>
            <LinkContainer>
                {!user ? (
                <Link to="/signin">Sign In</Link>
            ) : (
                <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleSignout}>Sign Out</button>
                </>
            )}
            </LinkContainer>
        </NavContainer>
    );
};

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    align-items: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;      
    color: #fff;                
    font-size: 32px;            
    font-weight: bold;         
    letter-spacing: 1px;        
    text-transform: uppercase;
`;

const BlockContainer = styled.div`
    display: flex;
    align-items: center;
`
const Icon = styled.img`
    padding: 10px;
    width: 3vw;
`;

const ProfileIcon = styled.button`
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
`;

const LinkContainer = styled(Link)`
    text-decoration: none;      
    color: #fff;                
    font-size: 15px;            
    font-weight: bold;         
    letter-spacing: 1px;        
    text-transform: uppercase;
    &:visited {  
        color: #fff;
    }
`

export default Navbar;
