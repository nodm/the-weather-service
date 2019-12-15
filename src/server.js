const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const webPush = require('web-push');

const addPushSubscriber = require('./add-push-subscriber');
const sendPushNotification = require('./send-push-notification');

const PORT = 80;
const appConfig = require('./app-config.json.dist');
const vapidPublicKey = appConfig.vapid.publicKey;
const vapidPrivateKey = appConfig.vapid.privateKey;

webPush.setVapidDetails(`mailto: ${appConfig.vapid.email}`, vapidPublicKey, vapidPrivateKey);

const app = express();


app.use(cors());

app.use(bodyParser.json());

const proxyConfig = {
  target: 'https://api.darksky.net',
  pathRewrite: {
    '^/api/forecast': `/forecast/${appConfig.darkSkyAPIKey}`
  },
  changeOrigin: true,
};
app.use('/api/forecast/*', proxy(proxyConfig));

app.route('/api/subscribe').post(addPushSubscriber);

app.route('/api/send').post(sendPushNotification);

const httpServer = app.listen(PORT, () => {
  console.log('HTTP Server is running at ' + httpServer.address().port);
});
