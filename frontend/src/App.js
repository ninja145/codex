import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import USP from './components/USP';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import DoctorLogin from './components/DoctorLogin';
import BALogin from './components/BALogin';
import './App.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container py-3">{children}</main>
      <Footer />
    </>
  );
};

const LandingPage = () => (
  <>
    <Home />
    <About />
    <USP />
    <Pricing />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/doctor-login" element={<DoctorLogin />} />
            <Route path="/ba-login" element={<BALogin />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
