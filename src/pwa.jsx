import { registerSW } from 'virtual:pwa-register'
// Configuration de la mise à jour du service worker
const updateSW = registerSW({
 // Appelé quand une mise à jour est disponible
 onNeedRefresh() {
 if (confirm('Une nouvelle version est disponible. Voulez-vous mettre à jour ?')){
 updateSW()
 }
 },
 // Appelé quand l'application est prête pour le mode hors-ligne
 onOfflineReady() {
 console.log('Application prête pour une utilisation hors-ligne')
 },
})