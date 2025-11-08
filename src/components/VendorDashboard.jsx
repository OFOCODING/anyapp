import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, Package, ShoppingBag, User, BarChart3, Plus, MessageCircle, Home, TrendingUp, DollarSign, Power } from 'lucide-react';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [stats, setStats] = useState({
    todaySales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    rating: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUser(currentUser);

    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const userProducts = allProducts.filter(p => p.userName === currentUser.name);
    setMyProducts(userProducts);

    const totalValue = userProducts.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
    setStats({
      todaySales: totalValue > 0 ? (totalValue * 0.15).toFixed(0) : 0,
      totalOrders: userProducts.length * 3 + Math.floor(Math.random() * 20),
      totalCustomers: userProducts.length * 8 + Math.floor(Math.random() * 50),
      rating: userProducts.length > 0 ? (4.5 + Math.random() * 0.5).toFixed(1) : 0,
      pendingOrders: Math.floor(Math.random() * 6)
    });

    // Load online status from localStorage
    const savedStatus = localStorage.getItem('vendorOnlineStatus');
    if (savedStatus !== null) {
      setIsOnline(savedStatus === 'true');
    }
  }, []);

  const toggleOnlineStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    localStorage.setItem('vendorOnlineStatus', newStatus.toString());
    
    // Show notification
    const notification = {
      id: Date.now(),
      type: 'product',
      title: newStatus ? 'Store is now Online' : 'Store is now Offline',
      message: newStatus 
        ? 'Your store is visible to customers and accepting orders' 
        : 'Your store is hidden from customers. You won\'t receive new orders',
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const existingNotifs = JSON.parse(localStorage.getItem('notifications') || '[]');
    existingNotifs.unshift(notification);
    localStorage.setItem('notifications', JSON.stringify(existingNotifs));
  };

  if (!user || !user.name) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Vendor Account</h2>
          <p className="text-gray-600 mb-6">Please login to access vendor dashboard</p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
                🏪
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{user.name}'s Store</h2>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <p className={`text-sm font-medium ${isOnline ? 'text-green-100' : 'text-red-100'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <Bell size={20} className="text-white" />
              {stats.pendingOrders > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {stats.pendingOrders}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <Settings size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Online/Offline Toggle */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isOnline ? 'bg-green-500/30' : 'bg-red-500/30'
              }`}>
                <Power className={`${isOnline ? 'text-green-100' : 'text-red-100'}`} size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Store Status</h3>
                <p className="text-blue-100 text-sm">
                  {isOnline 
                    ? 'Accepting orders and visible to customers' 
                    : 'Hidden from customers, not accepting orders'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleOnlineStatus}
              className={`relative w-16 h-9 rounded-full transition-all shadow-lg ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full transition-transform flex items-center justify-center ${
                  isOnline ? 'translate-x-7' : 'translate-x-0'
                }`}
              >
                {isOnline ? '✓' : '✕'}
              </div>
            </button>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-blue-100 text-xs mb-1">Total Revenue</p>
              <p className="text-white text-2xl font-bold">${stats.todaySales}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs mb-1">Products Listed</p>
              <p className="text-white text-2xl font-bold">{myProducts.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Today's Sales</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">${stats.todaySales}</h3>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp size={12} />
              +12.5% from yesterday
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-blue-600" size={20} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Orders</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
            <p className="text-xs text-gray-600 mt-1">{stats.pendingOrders} pending</p>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="text-purple-600" size={20} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Customers</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalCustomers}</h3>
            <p className="text-xs text-blue-600 mt-1">+8 this week</p>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">⭐</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Store Rating</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats.rating}</h3>
            <p className="text-xs text-gray-600 mt-1">89 reviews</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <button 
            onClick={() => navigate('/create-product')}
            className="flex flex-col items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl border shadow-md hover:shadow-xl transition-all text-white"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Plus size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-semibold">Add Product</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={24} className="text-orange-500" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Orders</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-green-500" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Customers</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart3 size={24} className="text-purple-500" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Analytics</span>
          </button>
        </div>

        {/* My Products Section */}
        <div className="bg-white rounded-xl border p-4 sm:p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base sm:text-lg">My Products</h3>
            <button 
              onClick={() => navigate('/create-product')}
              className="text-blue-500 text-sm font-semibold hover:text-blue-600"
            >
              Add New +
            </button>
          </div>
          
          {myProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {myProducts.map((product) => (
                <div key={product.id} className="bg-gray-50 rounded-xl p-3 hover:shadow-md transition-all cursor-pointer">
                  <div className="text-4xl mb-2 text-center">{product.emoji}</div>
                  <h4 className="font-semibold text-sm truncate mb-1">{product.name}</h4>
                  <p className="text-blue-600 font-bold text-sm">${product.price}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>👁️ {product.views || 0}</span>
                    <span>❤️ {product.likes || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">📦</div>
              <p className="text-gray-500 mb-3">No products yet</p>
              <button
                onClick={() => navigate('/create-product')}
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-all text-sm"
              >
                Create First Product
              </button>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base sm:text-lg">Recent Orders</h3>
            <button className="text-blue-500 text-sm font-semibold hover:text-blue-600">View all →</button>
          </div>
          
          {myProducts.length > 0 ? (
            <div className="space-y-3">
              {myProducts.slice(0, 3).map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="text-2xl">{product.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate text-sm">#{1000 + idx} - {product.name}</h4>
                      <p className="text-sm text-gray-500">1 item • ${product.price}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold whitespace-nowrap ml-2 ${
                    idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                    idx === 1 ? 'bg-green-100 text-green-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {idx === 0 ? 'Processing' : idx === 1 ? 'Delivered' : 'Shipped'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📋</div>
              <p className="text-sm">No orders yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-2xl lg:hidden">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <button onClick={() => navigate('/vendor')} className="flex flex-col items-center gap-1 px-6 py-2 rounded-xl bg-blue-50">
            <Home size={24} className="text-blue-600" strokeWidth={2.5} />
            <span className="text-xs font-bold text-blue-600">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-6 py-2 rounded-xl hover:bg-gray-50 transition-all">
            <BarChart3 size={24} className="text-gray-400" strokeWidth={2} />
            <span className="text-xs text-gray-500">Analytics</span>
          </button>
          <button 
            onClick={() => navigate('/create-product')}
            className="flex flex-col items-center gap-1 px-6 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <Plus size={24} className="text-gray-400" strokeWidth={2} />
            <span className="text-xs text-gray-500">Add</span>
          </button>
          <button onClick={() => navigate('/chat')} className="flex flex-col items-center gap-1 px-6 py-2 rounded-xl hover:bg-gray-50 transition-all">
            <MessageCircle size={24} className="text-gray-400" strokeWidth={2} />
            <span className="text-xs text-gray-500">Messages</span>
          </button>
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 px-6 py-2 rounded-xl hover:bg-gray-50 transition-all">
            <User size={24} className="text-gray-400" strokeWidth={2} />
            <span className="text-xs text-gray-500">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
