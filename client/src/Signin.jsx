import React, { useState } from 'react';
import { useUser } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Signin() {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/users/signin`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.data) {
                setUser(data.data);
                setMessage('Successfully signed in!');
                navigate('/');
            } else {
                setMessage('No account found.');
            }
        } catch (error) {
            setMessage('Error signing in.');
        }
    };

    return (
        <Container>
            <Title>Signin</Title>
            <Form onSubmit={handleSubmit}>
                <Input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
                <button type="submit">Signin</button>
            </Form>
            {message && <p>{message}</p>}
            <Link to="/signup">Don't have an account? Create one.</Link>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20vw;
    gap: 20px;
`

const Title = styled.h2`
    font-size: 25px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const Input = styled.input`
    font-family: 'VT323';
    width: 15vw;
    height: 1.5vw;
`

export default Signin;
