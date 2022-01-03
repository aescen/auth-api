/* eslint-disable no-undef */
const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError', () => {
  it('should create an error correctly', () => {
    const errMsg = 'Authentication error!';
    const authenticationError = new AuthenticationError(errMsg);

    expect(authenticationError.statusCode).toStrictEqual(401);
    expect(authenticationError.message).toStrictEqual(errMsg);
    expect(authenticationError.name).toStrictEqual('AuthenticationError');
  });
});
