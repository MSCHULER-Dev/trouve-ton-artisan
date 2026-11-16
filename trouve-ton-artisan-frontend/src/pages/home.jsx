import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
    const [artisans, setArtisans] = useState([]);

    useEffect(() => {
        api.getArtisans()
            .then(data => setArtisans(data.slice(0, 3)))
            .catch(err => console.error("Erreur chargement artisans:", err));
    }, []);

    return (
        <div className="container px-4 py-5">
            <section className="bg-body-secondary p-5 rounded mb-5 shadow-sm">
                <h1 className="h3 fw-bold mb-4 text-center text-primary">Comment trouver mon artisan ?</h1>
                <div className="row g-4 text-center">
                    <div className="col-md-3">
                        <div className="bg-white p-4 rounded shadow-sm h-100">
                            <span className="fw-bold fs-4 text-secondary">1</span>
                            <p className="mt-2 mb-0 text-dark">Choisir la catégorie d'artisan dans le menu.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 rounded shadow-sm h-100">
                            <span className="fw-bold fs-4 text-secondary">2</span>
                            <p className="mt-2 mb-0 text-dark">Choisir un artisan.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 rounded shadow-sm h-100">
                            <span className="fw-bold fs-4 text-secondary">3</span>
                            <p className="mt-2 mb-0 text-dark">Le contacter via le formulaire de contact.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 rounded shadow-sm h-100">
                            <span className="fw-bold fs-4 text-secondary">4</span>
                            <p className="mt-2 mb-0 text-dark">Une réponse sera apportée sous 48h.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="h4 fw-bold mb-4 text-dark">Les artisans du mois</h2>
                <div className="row g-4">
                    {artisans.map(artisan => (
                        <div key={artisan.id} className="col-md-4">
                            <div className="card shadow-sm border-0 bg-white h-100">
                                <div className="card-body p-4 d-flex flex-column">
                                    <h3 className="h5 fw-bold text-dark mb-2">{artisan.entreprise}</h3>
                                    
                                    {/* Affichage dynamique de la vraie spécialité sur la page d'accueil */}
                                    <p className="text-muted mb-2">
                                        {artisan.Specialiste?.nom || artisan.specialiste?.nom || artisan.specialite || "Artisan"} - {artisan.ville || "Lyon"}
                                    </p>
                                    
                                    <p className="text-warning fw-bold mb-4">Note : {artisan.note} / 5 ⭐</p>
                                    <div className="mt-auto">
                                        <Link to={`/artisan/${artisan.id}`} className="btn btn-primary fw-bold w-100">
                                            En savoir plus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}