require('dotenv').config();

const User = require('./User');

describe('User model tests', () => {
  it('hashes password', () => {
    const user = new User({
      username: 'test username',
      password: 'testPassword'
    });
    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });

  it('creates a jwt auth token', () => {
    const user = new User({
      username: 'test username',
      password: 'testPassword'
    });
    const token = user.authToken();
    expect(token).toBeTruthy();
  });

  it('finds a user by token', () => {
    const user = new User({
      username: 'test4',
      password: 'verySecure'
    });
    const token = user.authToken();
    return User
      .findByToken(token)
      .then(foundUser => {
        expect(foundUser.toJSON()).toEqual(user.toJSON());
      });
  });
});
