import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import environment from '../config/environment';

export default class Server {
  private server: Application;

  constructor(server: Application) { this.server = server; }

  public async init(): Promise<Application> {
    this.setDependencies();
    this.setPort();
    return this.server;
  }

  public async start(): Promise<Application> {
    this.server
      .listen(
        this.getPort(),
        this.log.bind(this),
      );

    return this.server;
  }

  public getServer(): Application {
    return this.server;
  }

  private setPort(): void {
    this.server.set('PORT', environment.port || 3000);
  }

  private getPort(): string {
    return this.server.get('PORT');
  }

  private setDependencies(): void {
    this.server.use(
      cors(),
      morgan('dev'),
      express.json(),
      express.urlencoded({ extended: false, limit: '50mb' }),
    );
  }

  private log(): void {
    console.log(`Server running in port ${this.getPort()}`);
  }
} 
