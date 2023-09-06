import React, { useState } from 'react';
import { useUser } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Signin</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
                <button type="submit">Signin</button>
            </form>
            {message && <p>{message}</p>}
            <Link to="/signup">Don't have an account? Create one.</Link>
        </div>
    );
}

export default Signin;
