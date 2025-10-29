import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Bell, MapPin, Moon, Globe, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
            >
              <ArrowLeft size={24} className="text-blue-600" strokeWidth={2.5} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Account Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <h2 className="font-bold text-sm text-gray-600 uppercase">Account</h2>
          </div>
          
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Edit Profile</p>
                <p className="text-sm text-gray-500">{user?.name || 'Update your details'}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail size={20} className="text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-500">{user?.email || 'Not set'}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Lock size={20} className="text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Update your password</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <h2 className="font-bold text-sm text-gray-600 uppercase">Preferences</h2>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Bell size={20} className="text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Notifications</p>
                <p className="text-sm text-gray-500">Push notifications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-8 rounded-full transition-all ${
                notifications ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <MapPin size={20} className="text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Location Services</p>
                <p className="text-sm text-gray-500">Find nearby stores</p>
              </div>
            </div>
            <button
              onClick={() => setLocation(!location)}
              className={`relative w-14 h-8 rounded-full transition-all ${
                location ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  location ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Moon size={20} className="text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-8 rounded-full transition-all ${
                darkMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              disabled
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Other Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <h2 className="font-bold text-sm text-gray-600 uppercase">Other</h2>
          </div>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Globe size={20} className="text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Language</p>
                <p className="text-sm text-gray-500">English (US)</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Shield size={20} className="text-teal-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Privacy Policy</p>
                <p className="text-sm text-gray-500">View our policies</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <HelpCircle size={20} className="text-pink-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Help & Support</p>
                <p className="text-sm text-gray-500">Get assistance</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <LogOut size={20} />
          Logout
        </button>

        <p className="text-center text-sm text-gray-400 pb-6">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default SettingsScreen;
