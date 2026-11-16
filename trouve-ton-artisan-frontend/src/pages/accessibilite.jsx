import React from 'react';

export default function Accessibilite() {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4 text-primary">Accessibilité</h1>
            <p className="text-gray-600 mb-4">Page en construction.</p>
            <p className="text-sm bg-blue-50 text-blue-800 inline-block p-4 rounded border border-blue-200">
                La plateforme a été conçue pour se conformer au référentiel général d'amélioration de l'accessibilité (RGAA) 
                et à la norme <strong>WCAG 2.1</strong>, garantissant une navigation optimale sur mobile et pour les personnes en situation de handicap.
            </p>
        </div>
    );
}