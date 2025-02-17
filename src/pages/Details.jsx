// import { useParams } from "react-router-dom";
// const Details = () => {
// const {slug} = useParams();
// return (
// <div>Ceci est la page du jeu dont le slug est "{slug}"</div>
// );
// }
// export default Details;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
    const { slug } = useParams(); // Récupération du slug à partir de l'URL
    const [gameDetails, setGameDetails] = useState(null); // État pour stocker les détails du jeu
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(''); // État pour gérer les erreurs

    useEffect(() => {
        const apiKey = 'e68491eee12141e483dab20346fbb0bf'; // Clé API
        const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`; // URL de l'API

        fetch(url)
       
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des détails du jeu');
                }
                return response.json();
            })
            .then(data => {
                setGameDetails(data); // Stockage des détails du jeu
                setLoading(false); // Fin du chargement
            })
            .catch(() => {
                setError('Une erreur est survenue lors de la récupération des détails.'); // Gestion des erreurs
                setLoading(false); // Fin du chargement
            });
    }, [slug]); // Dépendance sur le slug

    if (loading) {
        return <div>Chargement des détails...</div>; // Affichage pendant le chargement
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Affichage de l'erreur
    }

    if (!gameDetails) {
        return <div>Aucun détail disponible.</div>; // Gestion des cas sans données
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">{gameDetails.name}</h1> {/* Nom du jeu */}
            <img src={gameDetails.background_image} alt={gameDetails.name} className="w-full h-auto" /> {/* Image du jeu */}
            <p className="mt-2"><strong>Note :</strong> {gameDetails.rating}</p> {/* Note du jeu */}
            <p className="mt-2"><strong>Description :</strong> {gameDetails.description_raw}</p> {/* Description */}
            <p className="mt-2"><strong>Plateformes :</strong> {gameDetails.platforms.map(platform => platform.platform.name).join(', ')}</p> {/* Plateformes */}
            <p className="mt-2"><strong>Date de sortie :</strong> {gameDetails.released}</p> {/* Date de sortie */}
        </div>
    );
}

export default Details;