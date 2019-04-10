import express from 'express';
import * as http from 'http';

export class Server {
  public app: express.Express;
  public server: http.Server | undefined;

  constructor() {
    this.app = express();
  }

  public start = (): Promise<void> => {
    if (this.server) {
      return Promise.reject('server already started');
    }
    return new Promise(
      (resolve): void => {
        this.server = this.app.listen(3000, () => {
          resolve();
        });
      }
    );
  };

  public stop = (): Promise<void | string> => {
    return new Promise(
      (resolve, reject): void => {
        if (this.server) {
          this.server.close(() => {
            delete this.server;
            resolve();
          });
        } else {
          reject('server not started');
        }
      }
    );
  };
}
