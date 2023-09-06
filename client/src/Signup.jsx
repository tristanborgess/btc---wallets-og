import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username }),
            });
            const data = await response.json();
            if (response.status === 201) {
                setMessage('Successfully signed up!');
                setUser(data.data); 
                navigate('/'); 
            } else {
                setMessage(data.message || 'Error signing up.');
            }
        } catch (error) {
            setMessage('Error signing up.');
        }
    };

    return (
        <Container>
            <Title>Signup</Title>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <Input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)} 
                    />
                </div>
                <button type="submit">Signup</button>
            </Form>
            {message && <p>{message}</p>}
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

export default Signup;
