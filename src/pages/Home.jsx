import { Link } from "react-router-dom";
<Link to={'/myshop'} className="bg-green-500 text-white px-4 py-2 rounded">MyShop</Link>

import React, { useState, useContext } from "react";
import BookmarksContext from "../BookmarksContext";

const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [games, setGames] = useState([]);
    const { bookmarks, setBookmarks } = useContext(BookmarksContext);

    const handleSearch = (e) => {
        e.preventDefault();
        const apiKey = 'e68491eee12141e483dab20346fbb0bf';
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => { setGames(data.results) })
            .catch(() => { alert('Une erreur est survenue') });
    };

    const toggleBookmark = (game) => {
        const isBookmarked = bookmarks.some(b => b.slug === game.slug);
        if (isBookmarked) {
            setBookmarks(bookmarks.filter(b => b.slug !== game.slug));
        } else {
            setBookmarks([...bookmarks, {
                slug: game.slug,
                name: game.name,
                background_image: game.background_image
            }]);
        }
    };

    return (
        <> 
            <form className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl" onSubmit={handleSearch}>
                <input type="text" className="form-control" autoFocus={true}
                    onInput={e => { setSearchText(e.target.value) }}
                    value={searchText}
                    placeholder='Rechercher' />
                <button type="submit" className="bg-blue-700 rounded-r text-white px-4 py-2">Rechercher</button>
            </form>
            <Link to={'/bookmarks'}>Favoris</Link>
            <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
                {games.map(game => (
                    <li className="py-2 px-4 border-b border-gray-500 flex items-center" key={game.id}>
                        <Link to={`/details/${game.slug}`} className="flex-grow flex items-center">
                            <img src={game.background_image} alt="" className="w-24 pr-2" />
                            <div className="text-2xl font-bold flex-grow">{game.name}</div>
                            <div>{game.rating}</div>
                        </Link>
                        <button onClick={() => toggleBookmark(game)} className="text-2xl px-2">
                            {bookmarks.some(b => b.slug === game.slug) ? '★' : '☆'}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Home;
       