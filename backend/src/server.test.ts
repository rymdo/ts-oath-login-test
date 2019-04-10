import { Server } from './server';
describe('server', () => {
  describe('when started', () => {
    let server: Server;
    beforeEach(async () => {
      server = new Server();
      await server.start();
    });
    afterEach(async () => {
      await server.stop();
    });
    describe('should trow', () => {
      it('if already started', async () => {
        await expect(server.start()).rejects.toEqual('server already started');
      });
    });
  });

  describe('should throw', () => {
    it('if calling stop while not started', async () => {
      const server = new Server();
      await expect(server.stop()).rejects.toEqual('server not started');
    });
  });
});
