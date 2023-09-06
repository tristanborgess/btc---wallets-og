import { useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import GlobalStyles from './GlobalStyles';
import Navbar from './Navbar';
import Wallets from './Wallets';
import Footer from './Footer';
import { UserProvider } from './UserContext';
import Signin from './Signin';
import Profile from './Profile';
import Signup from './Signup';


function App() {

  return (
    <UserProvider>
      <BrowserRouter>
      {/* <GlobalStyles /> */}
        <Navbar />
        <Routes>
          <Route path='/' element={<Wallets />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
