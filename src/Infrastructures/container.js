/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid/non-secure');
// const { promisify } = require('util');
// const crypto = require('crypto');

// const randomBytes = promisify(crypto.randomBytes);
// const pbkdf2 = promisify(crypto.pbkdf2);
const bcrypt = require('bcrypt');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
// const PBKDF2PasswordHash = require('./security/PBKDF2PasswordHash');
const BcryptPasswordHash = require('./security/BCryptPasswordHash');

// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const IUserRepository = require('../Domains/users/IUserRepository');
const IPasswordHash = require('../Applications/security/IPasswordHash');

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: IUserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: IPasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  /* {
    key: IPasswordHash.name,
    Class: PBKDF2PasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: pbkdf2,
        },
        {
          concrete: randomBytes,
        },
      ],
    },
  }, */
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: IUserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: IPasswordHash.name,
        },
      ],
    },
  },
]);

module.exports = container;
