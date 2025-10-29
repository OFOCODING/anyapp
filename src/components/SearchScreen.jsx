import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, TrendingUp } from 'lucide-react';

const SearchScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const trendingSearches = [
    '📱 iPhone 15',
    '👟 Nike Shoes',
    '☕ Coffee Shop',
    '🏠 Home Decor',
    '🎮 Gaming Console',
    '📚 Books',
  ];

  const stores = [
    { id: 1, name: "Target", type: "Store", icon: "🎯", location: "0.8 miles away" },
    { id: 2, name: "Walmart", type: "Store", icon: "🏪", location: "1.2 miles away" },
    { id: 3, name: "Best Buy", type: "Store", icon: "🔌", location: "1.5 miles away" },
    { id: 4, name: "Starbucks", type: "Store", icon: "☕", location: "0.3 miles away" },
    { id: 5, name: "Apple Store", type: "Store", icon: "🍎", location: "0.9 miles away" },
    { id: 6, name: "Nike Store", type: "Store", icon: "👟", location: "1.1 miles away" }
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = (query) => {
    setLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      // Get all products from localStorage
      const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Search in products
      const productResults = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
      );

      // Search in stores
      const storeResults = stores.filter(store =>
        store.name.toLowerCase().includes(query.toLowerCase())
      );

      // Combine results
      const combined = [
        ...productResults.map(p => ({ ...p, type: 'Product', resultType: 'product' })),
        ...storeResults.map(s => ({ ...s, resultType: 'store' }))
      ];

      setResults(combined);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all flex-shrink-0"
            >
              <ArrowLeft size={24} className="text-gray-700" strokeWidth={2.5} />
            </button>
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, stores, or locations"
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {!searchQuery.trim() ? (
          // Trending Searches
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-blue-500" />
              <h2 className="text-lg font-bold text-gray-900">Trending Searches</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {trendingSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(search.split(' ').slice(1).join(' '))}
                  className="bg-white p-4 rounded-xl shadow-sm border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all text-left"
                >
                  <div className="text-2xl mb-2">{search.split(' ')[0]}</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {search.split(' ').slice(1).join(' ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : loading ? (
          // Loading State
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          // Search Results
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {results.length} Results for "{searchQuery}"
            </h2>
            <div className="space-y-3">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (result.resultType === 'store') {
                      navigate('/reels');
                    } else {
                      navigate('/reels');
                    }
                  }}
                  className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                      {result.emoji || result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-base text-gray-900 truncate">
                          {result.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-semibold">
                          {result.type}
                        </span>
                      </div>
                      {result.resultType === 'product' ? (
                        <>
                          <p className="text-sm text-gray-600 truncate mb-1">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <p className="text-blue-600 font-bold">${result.price}</p>
                            {result.location && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={12} />
                                <span>{result.location}</span>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin size={14} className="text-blue-500" />
                          <span>{result.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-blue-500 text-2xl font-light">›</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // No Results
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-500 mb-6">
              Try searching for something else
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
