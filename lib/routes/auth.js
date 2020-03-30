const { Router } = require('express');
const User = require('../models/User');

const expAge = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        const token = user.authToken();
        res.cookie('session', token, {
          maxAge: expAge,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => {
        const token = user.authToken();
        res.cookie('session', token, {
          maxAge: expAge,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  });
