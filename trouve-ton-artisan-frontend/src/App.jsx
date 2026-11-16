import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArtisansList from './pages/ArtisansList';
import ArtisanDetail from './pages/ArtisanDetail';
import MentionsLegales from './pages/MentionsLegales';
import DonneesPersonnelles from './pages/DonneesPersonnelles';
import Accessibilite from './pages/Accessibilite';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/artisans" element={<ArtisansList />} />
                        <Route path="/artisan/:id" element={<ArtisanDetail />} />
                        
                        {/* Pages légales */}
                        <Route path="/mentions-legales" element={<MentionsLegales />} />
                        <Route path="/donnees-personnelles" element={<DonneesPersonnelles />} />
                        <Route path="/accessibilite" element={<Accessibilite />} />
                        
                        {/* Route 404 catch-all conforme */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}