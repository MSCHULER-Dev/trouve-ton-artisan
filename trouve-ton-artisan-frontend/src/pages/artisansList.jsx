import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function ArtisansList() {
    const [artisans, setArtisans] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const categorieId = searchParams.get('categorieId') || '';

    useEffect(() => {
        api.getArtisans(categorieId ? { categorieId } : {})
            .then(data => {
                let filtered = data;

                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    filtered = filtered.filter(a => 
                        (a.entreprise && a.entreprise.toLowerCase().includes(query)) ||
                        (a.ville && a.ville.toLowerCase().includes(query)) ||
                        (a.specialiste?.nom && a.specialiste.nom.toLowerCase().includes(query)) ||
                        (a.Specialiste?.nom && a.Specialiste.nom.toLowerCase().includes(query)) ||
                        (a.Categorie?.nom && a.Categorie.nom.toLowerCase().includes(query)) ||
                        (a.nom && a.nom.toLowerCase().includes(query))
                    );
                }

                setArtisans(filtered);
            })
            .catch(err => console.error("Erreur chargement artisans:", err));
    }, [searchQuery, categorieId]);

    return (
        <div className="container px-4 py-5" style={{ minHeight: '65vh' }}>
            <h1 className="h3 fw-bold mb-4 text-primary">
                {searchQuery ? `Résultats pour "${searchQuery}"` : categorieId ? "Résultats par catégorie" : "Liste des artisans"}
            </h1>

            {artisans.length === 0 ? (
                <div className="alert alert-warning">Aucun artisan ne correspond à votre recherche.</div>
            ) : (
                <div className="row g-4">
                    {artisans.map(artisan => (
                        <div key={artisan.id} className="col-md-4">
                            <div className="card shadow-sm border-0 bg-white h-100">
                                <div className="card-body p-4 d-flex flex-column">
                                    <h3 className="h5 fw-bold text-dark mb-2">{artisan.entreprise}</h3>
                                    
                                    {/* Lecture sécurisée de la spécialité (minuscule ou majuscule) */}
                                    <p className="text-muted mb-2">
                                        {artisan.specialiste?.nom || artisan.Specialiste?.nom || artisan.specialite || "Artisan"} - {artisan.ville || "Lyon"}
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
            )}
        </div>
    );
}