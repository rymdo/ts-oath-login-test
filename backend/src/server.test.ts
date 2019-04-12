import portfinder from 'portfinder';
import request from 'supertest';
import { Server } from './server';

describe('server', () => {
  const getFreePort = async (): Promise<number> => {
    return portfinder.getPortPromise();
  };

  describe('when starting', () => {
    describe('should trow', () => {
      it('if port is busy', async () => {
        const port = await getFreePort();
        const server1: Server = new Server(port);
        await server1.start();
        const server2: Server = new Server(port);
        await expect(server2.start()).rejects.toThrow(
          new Error(`listen EADDRINUSE: address already in use :::${port}`)
        );
        await server1.stop();
        await server2.stop();
      });
    });
  });

  describe('when started', () => {
    let server: Server;
    beforeEach(async () => {
      const port = await getFreePort();
      server = new Server(port);
      await server.start();
    });
    afterEach(async () => {
      await server.stop();
    });
    describe('should respond successfully', () => {
      it('when calling /', (done) => {
        request(server.app)
          .get('/')
          .then((response) => {
            expect(response.status).toBe(200);
            done();
          });
      });
    });

    describe('should trow', () => {
      it('if already started', async () => {
        await expect(server.start()).rejects.toThrow(new Error('server already started'));
      });
    });
  });

  describe('should throw', () => {
    it('if calling stop while not started', async () => {
      const port = await getFreePort();
      const server = new Server(port);
      await expect(server.stop()).rejects.toThrow(new Error('server not started'));
    });
  });
});
