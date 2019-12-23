import fs from 'fs'
import hpp from 'hpp'
import path from 'path'
import helmet from 'helmet'
import bunyan from 'bunyan';
import express from 'express';
import bodyParser from 'body-parser'
import responseTime from 'response-time'
import requestId from 'request-id/express'
import methodOverride from 'method-override'
import bunyanLogger from 'express-bunyan-logger'

const Logger = bunyan.createLogger({ name: 'APPLICATION '})

export default class Application{
    constructor(){
        Logger.info('Starting routers.')
        this.router = express();
        Logger.info('Configuring middlewares.');
        this.configureMiddlewares();
    }

    initialize(){
        return Jimmy.initialize();
    }

    configureMiddlewares(){
        this.router.enable('trust proxy');
        this.router.use(helmet());
        this.router.use(hpp());
		this.router.use(responseTime());
		this.router.use(requestId());
		this.router.use(bodyParser.json());
		this.router.use(bodyParser.urlencoded({ extended: true }));
		this.router.use(methodOverride());
		this.router.use(bunyanLogger());
    }
}