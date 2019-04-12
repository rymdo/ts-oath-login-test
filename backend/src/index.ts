import { config } from './config';
import { Server } from './server';

const server: Server = new Server(config.port);
server
  .start()
  .then(() => {
    // tslint:disable:no-console
    console.log('Server stared!');
  })
  .catch((error) => {
    // tslint:disable:no-console
    console.log(`Failed to start server. Error: ${error}`);
  });
