import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, ArrowLeft, Home, Compass, User, Trash2 } from 'lucide-react';

const FavoritesScreen = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const clearAll = () => {
    setFavorites([]);
    localStorage.setItem('favorites', JSON.stringify([]));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <ArrowLeft size={24} className="text-white" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Favorites</h1>
              <p className="text-sm text-pink-100">
                {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={clearAll}
              className="text-white text-sm font-semibold hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
            <Heart className="text-white fill-white" size={32} />
          </div>
          <div className="flex-1 text-white">
            <p className="text-sm opacity-90 mb-1">Your Collection</p>
            <p className="text-xl font-bold">{favorites.length} Favorites</p>
          </div>
        </div>
      </div>

      {/* Favorites List */}
      <div className="p-4 sm:p-6">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 hover:border-pink-200 hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 flex items-center justify-center">
                  <div className="text-6xl">{item.emoji || item.icon || '❤️'}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900 flex-1 truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-all flex-shrink-0 ml-2"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                  
                  {item.price && (
                    <p className="text-blue-600 font-bold text-xl mb-2">${item.price}</p>
                  )}
                  
                  {item.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}

                  {item.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <span className="text-yellow-500 text-sm">⭐</span>
                        <span className="font-bold text-gray-900 text-sm">{item.rating}</span>
                      </div>
                      {item.reviews && (
                        <span className="text-gray-500 text-sm">({item.reviews})</span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => navigate('/reels')}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={48} className="text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 mb-6">
              Start adding products and stores to your favorites
            </p>
            <button
              onClick={() => navigate('/map')}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-red-600 transition-all"
            >
              Explore Products
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-2xl lg:hidden">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <button 
            onClick={() => navigate('/map')} 
            className="flex flex-col items-center gap-1 px-4 sm:px-6 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <Home size={24} className="text-gray-400" strokeWidth={2} />
            <span className="text-xs text-gray-500">Home</span>
          </button>
          <button 
            onClick={() => navigate('/reels')} 
            className="flex flex-col items-center gap-1 px-4 sm:px-6 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <Compass size={24} className="text-gray-400" strokeWidth={2} />
            <span className="text-xs text-gray-500">Explore</span>
          </button>
          <button 
            onClick={() => navigate('/favorites')}
            className="flex flex-col items-center gap-1 px-4 sm:px-6 py-2 rounded-xl bg-pink-50"
          >
            <Heart size={24} className="text-pink-600" strokeWidth={2.5} />
            <span className="text-xs font-bold text-pink-600">Favorites</span>
          </button>
          <button 
            onClick={() => navigate('/profile')} 
            className="flex flex-col items-center gap-1 px-4 sm:px-6 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <User size={24} className="text-gray-400" strokeWidth={2} />
            <span className="text-xs text-gray-500">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesScreen;
