import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ArtisansList from './pages/artisansList';
import ArtisanDetail from './pages/artisandetail';
import MentionsLegales from './pages/mentionslegales';
import DonneesPersonnelles from './pages/donneesPersonnelles';
import Accessibilite from './pages/accessibilite';
import NotFound from './pages/notfound';

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
