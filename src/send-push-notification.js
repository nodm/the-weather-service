const webPush = require('web-push');
const SUBSCRIPTIONS = require('./subscribtions');

function sendPushNotification(req, res) {
  const message = (req.body && req.body.message) || 'Weather updates are ready.';

  const notificationPayload = {
    notification: {
      title: 'the Weather PWA',
      body: message,
      icon: 'https://nodm.github.io/the-weather/assets/icons/icon-512x512.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [{
        action: 'home',
        title: 'Go to the site',
        icon: 'https://nodm.github.io/the-weather/assets/icons/icon-512x512.png',
      }, {
        action: 'kyiv',
        title: 'Show the weather in Kyiv',
        icon: 'https://nodm.github.io/the-weather/assets/images/clear-day.svg'
      }]
    }
  };

  Promise.all(
    SUBSCRIPTIONS.map(subscription => webPush.sendNotification(subscription, JSON.stringify((notificationPayload))))
  )
    .then(() => res.status(200).json({ message: 'Notification is sent successfully.' }))
    .catch(err => {
      res.message = err.toString();
      res.sendStatus(500);
    });
}

module.exports = sendPushNotification;
