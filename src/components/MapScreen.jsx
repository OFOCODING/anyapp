import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Home, Compass, Heart, User, Menu, Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon for stores
const storeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUgMEMxMC4wMjk0IDAgNiA0LjAyOTQzIDYgOUM2IDEzLjk3MDYgMTUgMjUgMTUgMjVDMTUgMjUgMjQgMTMuOTcwNiAyNCA5QzI0IDQuMDI5NDMgMTkuOTcwNiAwIDE1IDBaIiBmaWxsPSIjRUYzMzQ0Ii8+PGNpcmNsZSBjeD0iMTUiIGN5PSI5IiByPSI0IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

// Custom marker for user location
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjM0I4MkY2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Component to recenter map
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const MapScreen = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState([40.7128, -74.0060]); // Default: NYC
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const stores = [
    { id: 1, name: "Target", distance: "0.8 miles", rating: 4.8, reviews: "2.3k", icon: "🎯", lat: 40.7580, lng: -73.9855 },
    { id: 2, name: "Walmart", distance: "1.2 miles", rating: 4.6, reviews: "3.1k", icon: "🏪", lat: 40.7489, lng: -73.9680 },
    { id: 3, name: "Best Buy", distance: "1.5 miles", rating: 4.7, reviews: "1.8k", icon: "🔌", lat: 40.7614, lng: -73.9776 },
    { id: 4, name: "Starbucks", distance: "0.3 miles", rating: 4.5, reviews: "3.5k", icon: "☕", lat: 40.7505, lng: -73.9934 },
    { id: 5, name: "Apple Store", distance: "0.9 miles", rating: 4.9, reviews: "5.2k", icon: "🍎", lat: 40.7632, lng: -73.9726 },
    { id: 6, name: "Nike Store", distance: "1.1 miles", rating: 4.7, reviews: "2.9k", icon: "👟", lat: 40.7418, lng: -73.9887 }
  ];

  useEffect(() => {
    // Get user's real location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setLoading(false);
        },
        (error) => {
          console.log('Location error:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }

    // Get unread notification count
    updateNotificationCount();
  }, []);

  const updateNotificationCount = () => {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setLoading(false);
        },
        (error) => {
          alert('Unable to get your location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Responsive */}
      <div className="bg-white shadow-sm sticky top-0 z-[1000]">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <Search className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                anyApp
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <Bell size={24} className="text-gray-700" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Clickable Search Bar */}
          <div 
            className="relative cursor-pointer" 
            onClick={() => navigate('/search')}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            <input
              type="text"
              placeholder="Search products, stores, or locations"
              readOnly
              className="w-full pl-12 pr-12 py-3 sm:py-4 bg-gray-50 rounded-2xl border-2 border-transparent text-sm focus:outline-none cursor-pointer hover:bg-gray-100 transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
              🎤
            </button>
          </div>
        </div>
      </div>

      {/* Real Map Section */}
      <div className="relative mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white" 
           style={{ height: 'clamp(320px, 45vh, 450px)' }}>
        {loading ? (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center z-[500]">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">📍</div>
              <p className="text-gray-600 font-semibold">Loading map...</p>
            </div>
          </div>
        ) : (
          <MapContainer 
            center={userLocation} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <RecenterMap center={userLocation} />
            
            {/* User Location Marker */}
            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <div className="text-center p-2">
                  <div className="text-2xl mb-2">📍</div>
                  <p className="font-bold text-sm">You are here</p>
                </div>
              </Popup>
            </Marker>
            
            {/* Store Markers */}
            {stores.map((store) => (
              <Marker key={store.id} position={[store.lat, store.lng]} icon={storeIcon}>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl">{store.icon}</div>
                      <div>
                        <h3 className="font-bold text-base">{store.name}</h3>
                        <p className="text-xs text-gray-500">{store.distance} away</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-sm">{store.rating}</span>
                      <span className="text-gray-500 text-xs">({store.reviews})</span>
                    </div>
                    <button 
                      onClick={() => navigate('/reels')}
                      className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-all"
                    >
                      View Store
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
        
        {/* Locate Me Button */}
        <button 
          onClick={handleLocateMe}
          className="absolute bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center group z-[500]"
        >
          <Navigation className="text-blue-500 group-hover:text-blue-600" size={24} strokeWidth={2.5} />
        </button>

        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 z-[500]">
          <div className="flex items-center gap-2 text-sm mb-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="font-medium">Your Location</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="font-medium">Nearby Stores</span>
          </div>
        </div>
      </div>

      {/* Nearby Stores Section - Responsive grid */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Nearby Stores</h3>
          <button className="text-blue-500 text-sm font-semibold hover:text-blue-600">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stores.map((store) => (
            <div 
              key={store.id} 
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 cursor-pointer"
              onClick={() => navigate('/reels')}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform flex-shrink-0">
                  {store.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1 truncate">{store.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin size={14} className="text-blue-500 flex-shrink-0" />
                    <span className="truncate">{store.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="font-bold text-gray-900 text-sm">{store.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({store.reviews})</span>
                  </div>
                </div>
                <div className="text-blue-500 text-2xl sm:text-3xl font-light group-hover:translate-x-1 transition-transform">
                  ›
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-semibold hover:border-blue-400 hover:text-blue-500 transition-all">
          + Load More Stores
        </button>
      </div>

      {/* Bottom Navigation - UPDATED WITH FAVORITES */}
      <div className="fixed lg:relative bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-2xl lg:shadow-none z-[999]">
        <div className="max-w-7xl mx-auto flex justify-around py-3">
          <button 
            onClick={() => navigate('/map')} 
            className="flex flex-col items-center gap-1 px-4 sm:px-6 py-2 rounded-xl bg-blue-50"
          >
            <Home size={24} className="text-blue-600" strokeWidth={2.5} />
            <span className="text-xs font-bold text-blue-600">Home</span>
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
            className="flex flex-col items-center gap-1 px-4 sm:px-6 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <Heart size={24} className="text-gray-400" strokeWidth={2} />
            <span className="text-xs text-gray-500">Favorites</span>
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

export default MapScreen;
