import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/games-directory/', // Ajoutez cette ligne
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            // Mise à jour automatique du service worker
            registerType: 'autoUpdate',

            // Fichiers à inclure dans le cache
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],

            // Configuration du manifest
            manifest: {
                name: 'Annuaire des jeux', // Nom complet
                short_name: 'Jeux', // Nom court pour l'écran d'accueil
                description: 'Application de recherche de jeux vidéo',
                theme_color: '#ffffff', // Couleur du thème
                start_url: '/', // Page de démarrage
                display: 'standalone', // Mode d'affichage
                background_color: '#ffffff', // Couleur de fond au démarrage

                // Liste des icônes
                icons: [
                    {
                        src: 'pwa-192x192.png', // Chemin relatif au dossier public
                        sizes: '192x192', // Taille de l'icône
                        type: 'image/png' // Type de fichier
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable' // L'icône peut être masquée (Android)
                    }
                ]
            },

            // Configuration de Workbox pour le caching
            workbox: {
                runtimeCaching: [{
                    // Pattern pour les URLs de l'API RAWG
                    urlPattern: /^https:\/\/api\.rawg\.io\/api/,
                    // Stratégie de cache : sert le cache d'abord, puis met à jour
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'api-cache',
                        // Configuration de l'expiration du cache
                        expiration: {
                            maxEntries: 100, // Nombre maximum d'entrées
                            maxAgeSeconds: 86400 // Durée de vie (24h)
                        },
                        // Types de réponses à mettre en cache
                        cacheableResponse: {
                            statuses: [0, 200] // Codes HTTP acceptés
                        }
                    }
                }]
            }
        })
    ]
})
