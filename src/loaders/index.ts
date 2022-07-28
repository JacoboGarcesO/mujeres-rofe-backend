import { Application } from 'express';
import Server from './server.loader';
import Database from './database.loader';
import Router from './router.loader';

export default class {
  private server: Server;
  private router: Router;
  private database: Database;

  constructor(app: Application) {
    this.server = new Server(app);
    this.router = new Router(app);
    this.database = new Database();
  }

  public async load(): Promise<void> {
    await this.server.init();
    await this.router.init();
    await this.database.connect();
    await this.server.start();
  }
}
