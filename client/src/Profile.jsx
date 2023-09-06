import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import styled from 'styled-components';

function Profile() {
    const { user, setUser } = useUser();
    const [username, setUsername] = useState(user ? user.username : '');
    const [message, setMessage] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleUsernameUpdate = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/profile/${user._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });
                const data = await response.json();
                if (data.status === 200) {
                    setMessage('Username updated!');
                    setUser({ ...user, username });
                    setUpdateSuccess(true);
                } else {
                    setMessage(data.message || 'Error updating username.');
                    setUpdateSuccess(false);
                }
            } catch (error) {
                setMessage('Error updating username.');
                setUpdateSuccess(false);
            }
    };

        useEffect(() => {
        if (updateSuccess) {
            setUsername('');
            setUpdateSuccess(false);  
        } else if (user) {
            setUsername(user.username);
        }
    }, [user, updateSuccess]);

    const handleDeleteProfile = async () => {
        if (user) {
            try {
                await fetch(`http://localhost:3000/users/profile/${user._id}`, {
                    method: 'DELETE',
                });
                setMessage('Profile deleted.');
                setUser(null);
            } catch (error) {
                setMessage('Error deleting profile.');
            }
        }
    };

    return (
        <Container>
            <Title>Profile</Title>
            <p>Email: {user && user.email}</p>
            <p>Username: {user && user.username}</p>
            <Form>
            <Input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
            />
            <button onClick={handleUsernameUpdate}>Update Username</button>
            <button onClick={handleDeleteProfile}>Delete Profile</button>
            {message && <p>{message}</p>}
            </Form>
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

export default Profile;