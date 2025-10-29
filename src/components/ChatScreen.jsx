import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Send, ArrowLeft, Phone, MoreVertical, Home, Compass, Heart, User } from 'lucide-react';

const ChatScreen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'product',
      product: {
        name: 'iPhone 15 Pro Max',
        specs: '256GB, Space Black',
        price: '$1,199',
        emoji: '📱'
      },
      sender: 'store',
      time: '2:30 PM'
    },
    {
      id: 2,
      text: "Hello! I'm interested in this iPhone. Is it still available?",
      sender: 'user',
      time: '2:31 PM'
    },
    {
      id: 3,
      text: "Yes, it's available! Would you like to know more about it?",
      sender: 'store',
      time: '2:32 PM'
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          text: "Thanks for your message! Let me check that for you.",
          sender: 'store',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Responsive */}
      <div className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button 
          onClick={() => navigate('/reels')} 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all active:scale-95 flex-shrink-0"
        >
          <ArrowLeft size={24} className="text-blue-600" strokeWidth={2.5} />
        </button>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl sm:text-2xl shadow-md flex-shrink-0">
          🔧
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate">John's Electronics</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs sm:text-sm text-green-600 font-medium truncate">Online • Responds ~5 mins</p>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all flex-shrink-0">
          <Phone size={20} className="text-gray-700" />
        </button>
        <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 transition-all">
          <MoreVertical size={22} className="text-gray-700" />
        </button>
      </div>

      {/* Messages - Responsive with proper padding for bottom elements */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto pb-40">
        <div className="text-center">
          <span className="text-xs text-gray-500 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm">
            Today, 2:30 PM
          </span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === 'product' ? (
              <div className="flex gap-2 sm:gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 shadow-md" />
                <div className="bg-white rounded-2xl rounded-tl-sm p-1 shadow-md max-w-xs sm:max-w-sm">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 sm:p-4">
                    <div className="text-4xl sm:text-5xl mb-3 text-center">{msg.product.emoji}</div>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">{msg.product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{msg.product.specs}</p>
                    <p className="text-blue-600 font-bold text-lg sm:text-xl">{msg.product.price}</p>
                    <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all text-sm sm:text-base">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ) : msg.sender === 'store' ? (
              <div className="flex gap-2 sm:gap-3 items-end mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 shadow-md" />
                <div className="max-w-xs sm:max-w-md lg:max-w-lg">
                  <div className="bg-white rounded-2xl rounded-bl-sm px-3 sm:px-4 py-2 sm:py-3 shadow-md">
                    <p className="text-gray-900 text-sm sm:text-base">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-2 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-end items-end mb-4">
                <div className="max-w-xs sm:max-w-md lg:max-w-lg">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-sm px-3 sm:px-4 py-2 sm:py-3 shadow-md">
                    <p className="text-sm sm:text-base">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 mr-2 mt-1 block text-right">{msg.time}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input - Fixed position above nav */}
      <div className="bg-white border-t-2 border-gray-100 px-3 sm:px-4 py-3 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all text-blue-500 flex-shrink-0">
            <Plus size={24} strokeWidth={2} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="w-full pl-4 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-100 rounded-full border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all text-sm sm:text-base"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xl sm:text-2xl hover:scale-110 transition-transform">
              😊
            </button>
          </div>
          <button 
            onClick={sendMessage}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Send size={18} className="sm:w-5 sm:h-5 text-white ml-0.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Bottom Navigation - Now visible */}
      <div className="bg-white border-t-2 border-gray-100 shadow-2xl">
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

export default ChatScreen;
