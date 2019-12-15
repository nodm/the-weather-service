const SUBSCRIPTIONS = require('./subscribtions');

function addPushSubscriber(req, res) {
  const sub = req.body;

  SUBSCRIPTIONS.push(sub);

  res.status(200).json({ message: 'Subscription added successfully.' });
}

module.exports = addPushSubscriber;
