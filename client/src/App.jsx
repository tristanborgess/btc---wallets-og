import { useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import GlobalStyles from './GlobalStyles';
//import each component
//import Navbar from './Navbar';
import Wallets from './Wallets';
//import UserProfile from './UserProfile';
// import Login from './LogIn';
// import Footer from './Footer';





function App() {

  return (
    <BrowserRouter>
    {/* <GlobalStyles /> */}
    {/* <Navbar /> */}
    <Routes>
      <Route path='/' element={<Wallets />} />

    </Routes>
    {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
