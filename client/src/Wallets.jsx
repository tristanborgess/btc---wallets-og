import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wallets = () => {
const [wallets, setWallets] = useState([]);
const features = ["Name", "Category", "Web App", "Desktop App", "Android", "iOS", /* ... other features ... */];

useEffect(() => {
    // Fetch wallets from your backend
    fetch('http://localhost:3000/wallets/on-chain')
    .then(response => response.json())
    .then(data => setWallets(data.data))
    .catch(error => console.error('Error fetching wallets:', error));
}, []);

return (
    <Container>
    <StyledTable>
        <thead>
        <tr>
            {features.map(feature => (
            <StyledTh key={feature}>
                {feature}
            </StyledTh>
            ))}
        </tr>
        </thead>
        <tbody>
        {wallets.map(wallet => (
            <tr key={wallet._id}>
            {features.map(feature => {
                const featureValue = wallet[feature];
                return (
                <StyledTd key={feature}>
                    {typeof featureValue === 'object' ? JSON.stringify(featureValue) : featureValue}
                </StyledTd>
                );
            })}
            </tr>
        ))}
        </tbody>
    </StyledTable>
    </Container>
);
}

// Styled Components
const Container = styled.div`
padding: 2em;
`;

const StyledTable = styled.table`
width: 100%;
border-collapse: collapse;
`;

const StyledTh = styled.th`
border: 1px solid #ddd;
padding: 8px;
text-align: left;
`;

const StyledTd = styled.td`
border: 1px solid #ddd;
padding: 8px;
`;

export default Wallets;
