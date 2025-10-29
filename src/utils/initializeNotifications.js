export const initializeNotifications = () => {
  const existing = localStorage.getItem('notifications');
  
  if (!existing) {
    const sampleNotifications = [
      {
        id: 1,
        type: 'order',
        title: 'New Order Received',
        message: 'You have a new order for iPhone 15 Pro Max',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        read: false
      },
      {
        id: 2,
        type: 'like',
        title: 'Someone liked your product',
        message: 'Your Nike Air Max got 5 new likes!',
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        read: false
      },
      {
        id: 3,
        type: 'message',
        title: 'New Message',
        message: 'John sent you a message about your product',
        timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        read: false
      }
    ];
    
    localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
  }
};
