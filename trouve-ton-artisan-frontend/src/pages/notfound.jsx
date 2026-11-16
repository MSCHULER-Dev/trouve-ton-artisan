import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="h4 fw-bold text-dark mb-3">Page non trouvée</h2>
            <p className="text-secondary mb-4">
                La page que vous avez demandée n'existe pas ou a été déplacée.
            </p>
            <Link to="/" className="btn btn-primary fw-bold px-4 py-2">
                Retour à l'accueil
            </Link>
        </div>
    );
}