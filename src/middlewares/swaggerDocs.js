import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = (app) => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH, 'utf8'));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  } catch (err) {
    console.error('❌ Error loading Swagger docs:', err.message);
    app.use('/api-docs', (req, res, next) =>
      next(createHttpError(500, "Can't load Swagger docs")),
    );
  }
};
