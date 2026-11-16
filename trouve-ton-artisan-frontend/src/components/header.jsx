import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import logo from '../assets/Logo.png';

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.getCategories()
            .then(data => {
                setCategories(data);
            })
            .catch(err => {
                console.error("Erreur chargement catégories:", err);
                setCategories([
                    { id: 1, nom: 'Bâtiment' },
                    { id: 2, nom: 'Services' }
                ]);
            });
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/artisans?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <header className="bg-primary shadow-sm py-3 mb-4">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                
                {/* Logo */}
                <Link to="/" className="bg-white px-3 py-2 rounded shadow-sm d-flex align-items-center text-decoration-none">
                    <img src={logo} alt="Logo Trouve ton artisan" style={{ height: '35px', objectFit: 'contain' }} />
                </Link>

                {/* Navigation sur une seule ligne (flex-nowrap) */}
                <nav className="d-flex flex-nowrap align-items-center gap-3 overflow-auto py-1">
                    <Link to="/" className="text-white text-decoration-none fw-bold px-2 text-nowrap">Accueil</Link>
                    {categories.map((cat) => (
                        <Link 
                            key={cat.id} 
                            to={`/artisans?categorieId=${cat.id}`} 
                            className="text-white text-decoration-none fw-bold px-2 text-nowrap"
                        >
                            {cat.nom}
                        </Link>
                    ))}
                </nav>

                {/* Barre de recherche plus compacte */}
                <form onSubmit={handleSearchSubmit} className="d-flex align-items-center" style={{ width: '220px' }}>
                    <div className="input-group input-group-sm">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Rechercher..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-light px-2" type="submit" title="Rechercher">
                            🔍
                        </button>
                    </div>
                </form>

            </div>
        </header>
    );
}
