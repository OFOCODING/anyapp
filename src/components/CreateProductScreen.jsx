import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, DollarSign, Package, FileText, MapPin, Tag } from 'lucide-react';

const CreateProductScreen = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    location: '',
    emoji: '📦'
  });

  const emojis = ['📱', '👟', '👗', '🎮', '📚', '🏠', '🚗', '🍔', '💻', '⌚', '🎨', '🎵'];
  const categories = ['Electronics', 'Fashion', 'Food', 'Home', 'Sports', 'Books', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const newProduct = {
      ...product,
      id: Date.now(),
      userId: currentUser.id || Date.now(),
      userName: currentUser.name || 'Anonymous',
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0
    };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    navigate('/vendor');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header - Responsive */}
      <div className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/vendor')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all flex-shrink-0"
          >
            <ArrowLeft size={24} className="text-blue-600" strokeWidth={2.5} />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Create New Product</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
        {/* Product Icon - Responsive grid */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Product Icon *
          </label>
          <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-3">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setProduct({...product, emoji})}
                className={`aspect-square text-3xl sm:text-4xl rounded-xl transition-all ${
                  product.emoji === emoji
                    ? 'bg-blue-500 shadow-lg scale-110'
                    : 'bg-white hover:bg-gray-50 shadow'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name *
          </label>
          <div className="relative">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              required
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              placeholder="iPhone 15 Pro Max"
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 text-gray-400" size={20} />
            <textarea
              required
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              placeholder="Describe your product..."
              rows="4"
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all resize-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Price and Category - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                required
                value={product.price}
                onChange={(e) => setProduct({...product, price: e.target.value})}
                placeholder="1299"
                className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                required
                value={product.category}
                onChange={(e) => setProduct({...product, category: e.target.value})}
                className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all appearance-none text-sm sm:text-base"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              required
              value={product.location}
              onChange={(e) => setProduct({...product, location: e.target.value})}
              placeholder="New York, NY"
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Image Upload Area (Visual only) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Images (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center hover:border-blue-400 transition-all cursor-pointer bg-gray-50">
            <Image className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-sm sm:text-base text-gray-600 mb-1">Click to upload images</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
          </div>
        </div>

        {/* Submit Button - Responsive */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Publish Product 🚀
          </button>
          <p className="text-xs sm:text-sm text-gray-500 text-center mt-3">
            Your product will be visible to all users immediately
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateProductScreen;
