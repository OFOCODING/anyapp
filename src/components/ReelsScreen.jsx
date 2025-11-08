import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bell, User, Plus, Heart, MessageCircle, Send, Bookmark, Home, Search, Compass } from 'lucide-react';

const ReelsScreen = () => {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});

  const posts = [
    {
      id: 1,
      store: "Nike Store",
      location: "New York, USA",
      image: "👟",
      caption: "Nike Store New Collection Available Now! 🔥",
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      store: "Apple Store",
      location: "Silicon Valley, CA",
      image: "📱",
      caption: "Apple Store iPhone 15 Pro Now in Store! 📱",
      likes: 567,
      comments: 89
    },
    {
      id: 3,
      store: "Zara Fashion",
      location: "Los Angeles, CA",
      image: "👗",
      caption: "New Summer Collection is Here! ☀️",
      likes: 432,
      comments: 67
    }
  ];

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleSave = (postId) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <MapPin className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Anyapp
              </span>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <button 
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <Bell size={24} className="text-gray-700" strokeWidth={2} />
                {(() => {
                  const notifs = JSON.parse(localStorage.getItem('notifications') || '[]');
                  const unread = notifs.filter(n => !n.read).length;
                  return unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                      {unread}
                    </span>
                  );
                })()}
              </button>
              <button onClick={() => navigate('/profile')}>
                <User size={24} className="text-gray-700" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <button className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Plus size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-semibold text-gray-700">Add Story</span>
          </button>
          {[
            { name: 'Nike Store', emoji: '👟', color: 'from-purple-500 to-pink-500' },
            { name: 'Apple', emoji: '🍎', color: 'from-orange-500 to-red-500' },
            { name: 'Zara', emoji: '👗', color: 'from-green-500 to-teal-500' },
            { name: 'Starbucks', emoji: '☕', color: 'from-yellow-500 to-orange-500' }
          ].map((story, idx) => (
            <button key={idx} className="flex flex-col items-center gap-2 flex-shrink-0 group">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${story.color} p-1 shadow-lg hover:shadow-xl transition-all hover:scale-105`}>
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl sm:text-3xl">
                  {story.emoji}
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors truncate max-w-[80px]">
                {story.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4 sm:space-y-6 py-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl sm:text-2xl shadow-md flex-shrink-0">
                  {post.image}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 truncate">{post.store}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                    <MapPin size={12} className="flex-shrink-0" />
                    <span className="truncate">{post.location}</span>
                  </p>
                </div>
              </div>
              <button className="px-4 sm:px-6 py-2 bg-blue-500 text-white font-semibold rounded-full text-xs sm:text-sm hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 flex-shrink-0">
                Follow
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 cursor-pointer hover:opacity-95 transition-opacity"
                 style={{ height: 'clamp(300px, 50vh, 500px)' }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-7xl sm:text-8xl md:text-9xl animate-pulse">{post.image}</div>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4">
              <div className="flex items-center gap-4 sm:gap-6 mb-3">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-2 group"
                >
                  <Heart 
                    size={24}
                    className={`sm:w-7 sm:h-7 transition-all ${likedPosts[post.id] ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-700 group-hover:scale-110'}`}
                    strokeWidth={2}
                  />
                  <span className="font-semibold text-sm sm:text-base text-gray-900">{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                </button>
                <button 
                  onClick={() => navigate('/chat')}
                  className="flex items-center gap-2 group"
                >
                  <MessageCircle 
                    size={24}
                    className="sm:w-7 sm:h-7 text-gray-700 group-hover:scale-110 transition-transform" 
                    strokeWidth={2}
                  />
                  <span className="font-semibold text-sm sm:text-base text-gray-900">{post.comments}</span>
                </button>
                <button className="group">
                  <Send 
                    size={24}
                    className="sm:w-7 sm:h-7 text-gray-700 group-hover:scale-110 transition-transform" 
                    strokeWidth={2}
                  />
                </button>
                <button 
                  onClick={() => toggleSave(post.id)}
                  className="ml-auto group"
                >
                  <Bookmark 
                    size={24}
                    className={`sm:w-7 sm:h-7 transition-all ${savedPosts[post.id] ? 'fill-blue-500 text-blue-500 scale-110' : 'text-gray-700 group-hover:scale-110'}`}
                    strokeWidth={2}
                  />
                </button>
              </div>
              <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
                <span className="font-bold">{post.store}</span> {post.caption}
              </p>
              <button className="text-sm text-gray-500 mt-2 hover:text-gray-700">
                View all {post.comments} comments
              </button>
              <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation - WITH CHAT */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-2xl lg:hidden">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <button 
            onClick={() => navigate('/map')} 
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <Home size={22} className="text-gray-400" strokeWidth={2} />
            <span className="text-[10px] sm:text-xs text-gray-500">Home</span>
          </button>
          <button 
            onClick={() => navigate('/reels')} 
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-blue-50"
          >
            <Compass size={22} className="text-blue-600" strokeWidth={2.5} />
            <span className="text-[10px] sm:text-xs font-bold text-blue-600">Explore</span>
          </button>
          <button 
            onClick={() => navigate('/chat')}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <MessageCircle size={22} className="text-gray-400" strokeWidth={2} />
            <span className="text-[10px] sm:text-xs text-gray-500">Chat</span>
          </button>
          <button 
            onClick={() => navigate('/favorites')}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <Heart size={22} className="text-gray-400" strokeWidth={2} />
            <span className="text-[10px] sm:text-xs text-gray-500">Favorites</span>
          </button>
          <button 
            onClick={() => navigate('/profile')} 
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <User size={22} className="text-gray-400" strokeWidth={2} />
            <span className="text-[10px] sm:text-xs text-gray-500">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelsScreen;
