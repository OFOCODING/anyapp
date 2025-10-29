import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, MapPin, Calendar, ShoppingBag, Heart, LogOut, Edit } from 'lucide-react';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUser(currentUser);

    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const myProducts = allProducts.filter(p => p.userName === currentUser.name);
    setUserProducts(myProducts);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header - Responsive */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/map')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <ArrowLeft size={24} className="text-white" strokeWidth={2.5} />
          </button>
          <button 
  onClick={() => navigate('/settings')}
  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all"
>
  <Settings size={24} className="text-white" strokeWidth={2} />
</button>
        </div>

        {/* Profile Info - Responsive layout */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center text-4xl sm:text-5xl shadow-xl flex-shrink-0">
            👤
          </div>
          <div className="flex-1 text-white text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{user.name || 'User'}</h1>
              <button className="inline-flex items-center justify-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-all">
                <Edit size={14} />
                Edit
              </button>
            </div>
            <p className="text-blue-100 mb-3 text-sm sm:text-base">{user.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                <Calendar size={14} />
                <span>Joined {new Date().toLocaleDateString()}</span>
              </div>
              <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                <MapPin size={14} />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Responsive grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/20 rounded-xl p-3 sm:p-4 text-center backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-bold text-white">{userProducts.length}</div>
            <div className="text-xs text-blue-100">Products</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 sm:p-4 text-center backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-bold text-white">142</div>
            <div className="text-xs text-blue-100">Followers</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 sm:p-4 text-center backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-bold text-white">89</div>
            <div className="text-xs text-blue-100">Following</div>
          </div>
        </div>
      </div>

      {/* Tabs - Responsive */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex gap-6 sm:gap-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`py-4 border-b-2 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
            activeTab === 'products'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500'
          }`}
        >
          <ShoppingBag size={20} className="inline mr-2" />
          My Products
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`py-4 border-b-2 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
            activeTab === 'favorites'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500'
          }`}
        >
          <Heart size={20} className="inline mr-2" />
          Favorites
        </button>
      </div>

      {/* Content - Responsive */}
      <div className="p-4 sm:p-6 lg:p-8">
        {activeTab === 'products' && (
          <div>
            {userProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {userProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer">
                    <div className="text-4xl sm:text-5xl mb-3 text-center">{product.emoji}</div>
                    <h3 className="font-bold text-gray-900 mb-1 truncate text-sm sm:text-base">{product.name}</h3>
                    <p className="text-blue-600 font-bold mb-2 text-sm sm:text-base">${product.price}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={12} className="flex-shrink-0" />
                      <span className="truncate">{product.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 mb-4 text-sm sm:text-base">No products yet</p>
                <button
                  onClick={() => navigate('/create-product')}
                  className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all text-sm sm:text-base"
                >
                  Create Your First Product
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <p className="text-gray-500 text-sm sm:text-base">No favorites yet</p>
<p className="text-xs sm:text-sm text-gray-400 mt-2">Start exploring and save your favorite products!</p>
</div>
)}
</div>
{/* Action Buttons - Responsive */}
  <div className="px-4 sm:px-6 lg:px-8 pb-6 space-y-3">
    <button
      onClick={() => navigate('/vendor')}
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
    >
      <ShoppingBag size={20} />
      Switch to Vendor Dashboard
    </button>
    
    <button
      onClick={handleLogout}
      className="w-full bg-red-50 text-red-600 py-3 sm:py-4 rounded-xl font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
    >
      <LogOut size={20} />
      Logout
    </button>
  </div>
</div>
);
};
export default ProfileScreen;
