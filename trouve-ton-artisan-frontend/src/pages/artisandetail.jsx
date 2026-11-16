import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function ArtisanDetail() {
    const { id } = useParams();
    const [artisan, setArtisan] = useState(null);
    const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', message: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        api.getArtisanById(id)
            .then(data => setArtisan(data))
            .catch(err => console.error("Erreur chargement artisan:", err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.sendMessage({ ...formData, artisanId: id })
            .then(() => {
                setSuccessMessage("Message envoyé avec succès !");
                setFormData({ nom: '', prenom: '', email: '', message: '' });
                setErrorMessage('');
            })
            .catch(() => setErrorMessage("Erreur lors de l'envoi du message."));
    };

    if (!artisan) {
        return <div className="container py-5 text-center">Chargement...</div>;
    }

    return (
        <div className="container px-4 py-5" style={{ minHeight: '65vh' }}>
            <div className="card shadow-sm border-0 bg-white p-4 mb-5">
                <h1 className="h3 fw-bold text-primary mb-2">{artisan.entreprise}</h1>
                
                {/* Affichage dynamique de la vraie spécialité liée */}
                <p className="text-muted mb-2 fs-5">
                    {artisan.Specialiste?.nom || artisan.specialiste?.nom || artisan.specialite || "Artisan"} - {artisan.ville || "Lyon"}
                </p>
                
                <p className="text-warning fw-bold mb-4">Note : {artisan.note} / 5 ⭐</p>
                
                <hr className="my-4" />
                
                <h2 className="h5 fw-bold text-dark mt-2">À propos de</h2>
                <p className="text-secondary lh-lg">{artisan.a_propos}</p>
            </div>

            {/* Formulaire de contact */}
            <div className="card shadow-sm border-0 bg-white p-4">
                <h2 className="h4 fw-bold text-dark mb-4">Contacter cet artisan</h2>
                
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Votre nom</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ex : Dupont"
                                required
                                value={formData.nom}
                                onChange={(e) => setFormData({ ...formData, nom: e.target.value, prenom: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Votre email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Ex : jean.dupont@email.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Message</label>
                        <textarea 
                            className="form-control" 
                            rows="4" 
                            placeholder="Décrivez votre projet ou votre besoin en détail..."
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary fw-bold px-4 py-2">Envoyer le message</button>
                </form>
            </div>
        </div>
    );
}