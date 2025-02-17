// import React from 'react';

// const MyShop = () => {
//     return (
//         <div>
//             <h1>Bienvenue sur MyShop</h1>
//             <p>Votre boutique de jeux vidéo préférée.</p>
//         </div>
//     );
// };

// export default MyShop;

// import React, { useState, useEffect } from 'react';

// const MyShop = () => {
//     const [shops, setShops] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchShops = async () => {
//             try {
//                 const response = await fetch('https://formacitron.github.io/shopslist/shops.json');
//                 if (!response.ok) {
//                     throw new Error('Erreur lors de la récupération des données');
//                 }
//                 const data = await response.json();
//                 setShops(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchShops();
//     }, []);

//     if (loading) {
//         return <p>Chargement des magasins...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h1>Bienvenue sur MyShop</h1>
//             <p>Votre boutique de jeux vidéo préférée.</p>
//             <ul>
//                 {shops.map(shop => (
//                     <li key={shop.id}>
//                         <h2>{shop.name}</h2>
//                         <p>{shop.address}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MyShop;

// import React, { useState, useEffect } from 'react';

// const MyShop = () => {
//     const [shops, setShops] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [position, setPosition] = useState(null);

//     useEffect(() => {
//         // Fonction pour récupérer les magasins
//         const fetchShops = async () => {
//             try {
//                 const response = await fetch('https://formacitron.github.io/shopslist/shops.json');
//                 if (!response.ok) {
//                     throw new Error('Erreur lors de la récupération des données');
//                 }
//                 const data = await response.json();
//                 setShops(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // Fonction pour obtenir la position de l'utilisateur
//         const getUserLocation = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         setPosition({
//                             latitude: position.coords.latitude,
//                             longitude: position.coords.longitude,
//                         });
//                     },
//                     (error) => {
//                         console.error("Erreur de géolocalisation : ", error.message);
//                     }
//                 );
//             } else {
//                 console.error("La géolocalisation n'est pas supportée par ce navigateur.");
//             }
//         };

//         fetchShops();
//         getUserLocation();
//     }, []);

//     if (loading) {
//         return <p>Chargement des magasins...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h1>Bienvenue sur MyShop</h1>
//             <p>Votre boutique de jeux vidéo préférée.</p>
//             {position && (
//                 <p>
//                     Votre position : Latitude {position.latitude}, Longitude {position.longitude}
//                 </p>
//             )}
//             <ul>
//                 {shops.map(shop => (
//                     <li key={shop.id}>
//                         <h2>{shop.name}</h2>
//                         <p>{shop.address}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MyShop;

import React, { useState, useEffect } from 'react';
import haversine from './haversine'; // Assurez-vous que le chemin d'importation est correct

const MyShop = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [position, setPosition] = useState(null);
    const [closestShop, setClosestShop] = useState(null);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await fetch('https://formacitron.github.io/shopslist/shops.json');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setShops(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setPosition({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        console.error("Erreur de géolocalisation : ", error.message);
                    }
                );
            } else {
                console.error("La géolocalisation n'est pas supportée par ce navigateur.");
            }
        };

        fetchShops();
        getUserLocation();
    }, []);

    useEffect(() => {
        if (position && shops.length > 0) {
            const distances = shops.map(shop => ({
                ...shop,
                distance: haversine(position, { lat: shop.latitude, lon: shop.longitude })
            }));

            const closest = distances.reduce((prev, curr) => {
                return (prev.distance < curr.distance) ? prev : curr;
            });

            setClosestShop(closest);
        }
    }, [position, shops]);

    if (loading) {
        return <p>Chargement des magasins...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Bienvenue sur MyShop</h1>
            <p>Votre boutique de jeux vidéo préférée.</p>
            {position && (
                <p>
                    Votre position : Latitude {position.latitude}, Longitude {position.longitude}
                </p>
            )}
            {closestShop && (
                <div>
                    <h2>Magasin le plus proche :</h2>
                    <p>{closestShop.name}</p>
                    <p>Distance : {closestShop.distance.toFixed(2)} km</p>
                </div>
            )}
            <ul>
                {shops.map(shop => (
                    <li key={shop.id}>
                        <h2>{shop.name}</h2>
                        <p>{shop.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyShop;