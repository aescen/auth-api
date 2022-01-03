/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const BCryptPasswordHash = require('../BCryptPasswordHash');

describe('BCryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bCryptPasswordHash = new BCryptPasswordHash(bcrypt);
      const plainPassword = 'plain_password';

      // Action
      const encryptedPassword = await bCryptPasswordHash.hash(plainPassword);

      // Assert
      expect(typeof encryptedPassword).toStrictEqual('string');
      expect(encryptedPassword).not.toStrictEqual(plainPassword);
      expect(spyHash).toBeCalledWith(plainPassword, 10); // 10: default bcrypt saltRound
    });
  });
});
