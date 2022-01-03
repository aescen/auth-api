/* eslint-disable no-undef */
const IPasswordHash = require('../IPasswordHash');

describe('PasswordHash interface', () => {
  it('should throw an error when invoke abstract behaviour', async () => {
    // Arrange
    const iPasswordHash = new IPasswordHash();

    // Action and Assert
    await expect(iPasswordHash.hash('dummy_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});
