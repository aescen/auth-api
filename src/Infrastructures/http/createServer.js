const Hapi = require('@hapi/hapi');
const users = require('./api/users');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const ClientError = require('../../Commons/exceptions/ClientError');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    // internal Error
    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);
      if (translatedError instanceof ClientError) {
        const translatedResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        translatedResponse.code(translatedError.statusCode);
        return translatedResponse;
      }

      // native Error
      if (!translatedError.isServer) {
        return h.continue;
      }

      // server Error
      // console.error(response.stack);
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return response.continue || response;
  });

  return server;
};

module.exports = createServer;
