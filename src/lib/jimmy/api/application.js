import fs from 'fs'
import hpp from 'hpp'
import path from 'path'
import Jimmy from 'jimmy';
import helmet from 'helmet'
import bunyan from 'bunyan';
import express from 'express';
import bodyParser from 'body-parser'
import responseTime from 'response-time'
import requestId from 'request-id/express'
import methodOverride from 'method-override'
import bunyanLogger from 'express-bunyan-logger';
import * as Endpoints from 'jimmy/api/endpoints';
import { respondNotFoundHandler, respondErrorHandler } from 'jimmy/helpers/response';

const Logger = bunyan.createLogger({ name: 'APPLICATION '})

export default class Application{
    constructor(){
        Logger.info('Starting routers.')
        this.router = express();
        Logger.info('Configuring middlewares.');
        this.configureMiddlewares();
        Logger.info('Loading custom middlewares.');
        this.registerMiddlewares();
        Logger.info('Loading endpoints.');
        this.registerEndpoints();
        // 404 handler
        this.router.use((req, res, next) => {
			return res.status(404).json(respondNotFoundHandler(req, {message: 'Invalid URL.'}));
		});
		// 500 Handler
		this.router.use((err, req, res, next) => {
			Logger.error('An unhandled error ocurred on router:');
			Logger.error(err)
			
			return res.status(500).json(respondErrorHandler(req, err));
		});
    }

    initialize(){
        return Jimmy.initialize();
    }

    registerMiddlewares(){

    }

    registerMiddleware(middleware){
        this.router.use(middleware);
    }

    registerEndpoints(){
        Object.values(Endpoints).forEach(endpoint =>{
            endpoint.setup()
            this.registerEndpoint(endpoint)
        })
    }

    registerEndpoint(endpoint) {
		this.router.use(endpoint.router);
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