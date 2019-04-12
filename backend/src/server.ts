import express from 'express';
import * as http from 'http';

export class Server {
  public app: express.Express;
  public server: http.Server | undefined;

  constructor(readonly port: number) {
    this.app = express();
    this.configurePaths();
  }

  public start = async (): Promise<void> => {
    if (this.server) {
      throw new Error('server already started');
    }
    return new Promise(
      (resolve, reject): void => {
        this.server = this.app
          .listen(this.port, () => {
            resolve();
          })
          .on('error', (err) => {
            reject(err);
          });
      }
    );
  };

  public stop = async (): Promise<void | string> => {
    await new Promise(
      (resolve, reject): void => {
        if (this.server) {
          this.server.close(() => {
            delete this.server;
            resolve();
          });
        } else {
          reject(new Error('server not started'));
        }
      }
    );
  };

  private configurePaths(): void {
    this.app.get('/', (req, res) => {
      res.status(200).send('Hello World!');
    });
  }
}
