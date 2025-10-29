import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OnboardingScreen from './components/OnboardingScreen';
import AuthScreen from './components/AuthScreen';
import MapScreen from './components/MapScreen';
import ReelsScreen from './components/ReelsScreen';
import ChatScreen from './components/ChatScreen';
import VendorDashboard from './components/VendorDashboard';
import CreateProductScreen from './components/CreateProductScreen';
import ProfileScreen from './components/ProfileScreen';
import NotificationsScreen from './components/NotificationsScreen';
import SearchScreen from './components/SearchScreen';
import FavoritesScreen from './components/FavoritesScreen';
import SettingsScreen from './components/SettingsScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6 min-h-screen">
            <div className="lg:col-span-2 bg-white lg:rounded-2xl lg:my-6 lg:shadow-xl overflow-hidden">
              <Routes>
                <Route path="/" element={<Navigate to="/onboarding" />} />
                <Route path="/onboarding" element={<OnboardingScreen />} />
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/map" element={<MapScreen />} />
                <Route path="/reels" element={<ReelsScreen />} />
                <Route path="/chat" element={<ChatScreen />} />
                <Route path="/vendor" element={<VendorDashboard />} />
                <Route path="/create-product" element={<CreateProductScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/notifications" element={<NotificationsScreen />} />
                <Route path="/search" element={<SearchScreen />} />
                <Route path="/favorites" element={<FavoritesScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
              </Routes>
            </div>
            
            <div className="hidden lg:block lg:col-span-1 my-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">🏪</div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Local Stores</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">📦</div>
                    <div className="text-2xl font-bold text-gray-900">10K+</div>
                    <div className="text-sm text-gray-600">Products</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">👥</div>
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                  <div className="text-sm font-semibold mb-1">💡 Pro Tip</div>
                  <div className="text-xs">Enable location services for better nearby recommendations!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
