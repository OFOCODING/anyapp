export const initializeReminders = () => {
  const existing = localStorage.getItem('reminders');
  
  if (!existing) {
    const sampleReminders = [
      {
        id: 1,
        title: 'Nike Sale Ending',
        message: 'Nike store sale ends tomorrow! Check out new arrivals',
        emoji: '👟',
        date: new Date(Date.now() + 86400000).toISOString() // Tomorrow
      },
      {
        id: 2,
        title: 'iPhone Restock',
        message: 'iPhone 15 Pro Max back in stock at Apple Store',
        emoji: '📱',
        date: new Date(Date.now() + 172800000).toISOString() // 2 days
      }
    ];
    
    localStorage.setItem('reminders', JSON.stringify(sampleReminders));
  }
};
