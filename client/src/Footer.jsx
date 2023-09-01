import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
            <Title>btc---wallets</Title>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <IconPlaceholder /> GitHub
            </a>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
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

export default Footer;
