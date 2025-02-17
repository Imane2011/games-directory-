import './App.css';
import BookmarksContext from './BookmarksContext';
import Home from './pages/Home';
import { useState, useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorMessage from './pages/ErrorMessage';
import Details from './pages/Details';
import Bookmarks from './pages/Bookmarks';
import MyShop from './pages/MyShop';


function App() {
   
   const [bookmarks, setBookmarks] = useState([
      {
         slug: "super-mario-bros-3",
         name: "Super Mario Bros. 3",
         background_image: "https://media.rawg.io/media/screenshots/092/092fc1910f067a95a07c0fbfdbe25f03.jpg"
      },
      {
        slug: "the-legend-of-zelda-the-wind-waker",
        name: "The Legend of Zelda: The Wind Waker",
        background_image: "https://media.rawg.io/media/games/45f/45f6d31b0fcefe029e33d258a7beb6a2.jpg"
      }
    ]);
 
     // Création du routeur
 const router = createBrowserRouter([
    {
    path: "/",
    element: <Home />,
    errorElement: <ErrorMessage />,
    },
    {
       path: "/details/:slug",
    element: <Details />,
    },
     // On ajoute cette route
   {
   path: "/bookmarks",
   element: <Bookmarks />,
   },
   {
   path: "/myshop", // Ajout de la nouvelle route
   element: <MyShop />,
   },


    ], { basename: "/games-directory" });

    const [dataLoaded, setDataLoaded] = useState(false);
    
    useEffect(() => {
    if (dataLoaded) {
    console.log("Sauvegarde:", bookmarks)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    }, [bookmarks])
    
    useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(savedBookmarks);
    console.log("Chargement:", savedBookmarks);
    setDataLoaded(true);
     }, [])

     const [canInstall, setCanInstall] = useState(false);
 // Référence pour stocker l'événement d'installation
 const deferredPrompt = useRef(null);
 useEffect(() => {
 // Fonction appelée quand l'application peut être installée
 const handleBeforeInstallPrompt = (e) => {
 // Empêche l'affichage automatique du prompt
 e.preventDefault();
 // Stocke l'événement pour une utilisation ultérieure
 deferredPrompt.current = e;
 // Affiche notre bouton d'installation
 setCanInstall(true);
 };
 // Écoute l'événement d'installation
 window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
 // Nettoyage à la destruction du composant
 return () => {
 window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
 };
 }, []);
 // Fonction appelée quand l'utilisateur clique sur le bouton d'installation
 const handleInstallClick = async () => {

   if (!deferredPrompt.current) {
      return;
   }
   // Affiche le prompt d'installation natif
   const result = await deferredPrompt.current.prompt();
   console.log(`Installation ${result.outcome}`);
   // Réinitialise l'état
   deferredPrompt.current = null;
   setCanInstall(false);
   };
 return (
<BookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
 {/* Affiche le bouton d'installation si disponible */}
 {canInstall && (
 <div className="bg-gray-300 shadow-gray-700 p-4 flex items-center">
 <div className="flex-grow text-center">
 Voulez-vous installer l'application sur votre appareil ?
 </div>
 <button
 className="px-4 py-2 rounded text-white bg-teal-600"
 onClick={handleInstallClick}
 >
 Installer
 </button>
 </div>
 )}
 <RouterProvider router={router} />
 </BookmarksContext.Provider>
 );
}
export default App;



