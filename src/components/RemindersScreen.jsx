import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Clock, Trash2, Plus, Calendar } from 'lucide-react';

const RemindersScreen = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    setReminders(savedReminders);
  }, []);

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
  };

  const clearAll = () => {
    setReminders([]);
    localStorage.setItem('reminders', JSON.stringify([]));
  };

  const getTimeLeft = (reminderDate) => {
    const now = new Date();
    const reminder = new Date(reminderDate);
    const diff = reminder - now;

    if (diff < 0) return 'Overdue';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `In ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `In ${hours} hour${hours > 1 ? 's' : ''}`;
    return 'Soon';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <ArrowLeft size={24} className="text-white" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Reminders</h1>
              <p className="text-sm text-orange-100">
                {reminders.length} active reminder{reminders.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          {reminders.length > 0 && (
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
            <Bell className="text-white" size={32} />
          </div>
          <div className="flex-1 text-white">
            <p className="text-sm opacity-90 mb-1">Never miss a deal</p>
            <p className="text-xl font-bold">Set reminders for items</p>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="p-4 sm:p-6">
        {reminders.length > 0 ? (
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="bg-white rounded-2xl p-4 shadow-sm border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {reminder.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
                      {reminder.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{reminder.message}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock size={14} />
                        <span className="font-semibold">{getTimeLeft(reminder.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar size={14} />
                        <span>{new Date(reminder.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 transition-all flex-shrink-0"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell size={48} className="text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Reminders Set</h3>
            <p className="text-gray-500 mb-6">
              Set reminders for products you want to buy later
            </p>
            <button
              onClick={() => navigate('/map')}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Browse Products
            </button>
          </div>
        )}

        {/* Add Reminder Button */}
        {reminders.length > 0 && (
          <button
            onClick={() => {
              // Sample reminder for demonstration
              const newReminder = {
                id: Date.now(),
                title: 'Check Nike Sale',
                message: 'Nike store sale ends soon!',
                emoji: '👟',
                date: new Date(Date.now() + 86400000).toISOString() // Tomorrow
              };
              const updated = [...reminders, newReminder];
              setReminders(updated);
              localStorage.setItem('reminders', JSON.stringify(updated));
            }}
            className="w-full mt-4 py-4 border-2 border-dashed border-orange-300 rounded-2xl text-orange-600 font-semibold hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add New Reminder
          </button>
        )}
      </div>
    </div>
  );
};

export default RemindersScreen;
