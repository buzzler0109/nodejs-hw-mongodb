import { setupServer } from './server.js';
import { initMongoDb } from './db/initMongoDb.js';

const bootStrap = async () => {
  await initMongoDb();
  setupServer();
};

bootStrap();
