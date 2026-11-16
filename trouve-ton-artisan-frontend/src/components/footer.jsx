import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="text-white py-5 mt-auto" style={{ backgroundColor: '#384050' }}>
            <div className="container px-4">
                <div className="row">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h3 className="h5 fw-bold mb-3">Antenne de Lyon</h3>
                        <p className="mb-0">101 cours Charlemagne</p>
                        <p className="mb-0">CS 20033</p>
                        <p className="mb-0">69269 LYON CEDEX 02, France</p>
                        <p className="mt-3 fw-bold mb-0">Téléphone : +33 (0)4 26 73 40 00</p>
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-md-end">
                        <ul className="list-unstyled mb-0 text-md-end">
                            <li className="mb-2">
                                <Link to="/mentions-legales" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Mentions légales</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/donnees-personnelles" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Données personnelles</Link>
                            </li>
                            <li>
                                <Link to="/accessibilite" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Accessibilité</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}