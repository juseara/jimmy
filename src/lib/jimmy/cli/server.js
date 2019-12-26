import dotenv from 'dotenv';
import bunyan from 'bunyan';
import Server from '../server';
import program from 'commander';
import pkg from '../../../../package.json';
dotenv.config()
const Logger = bunyan.createLogger({ name: 'SERVER' });


export default (application) => {
    
    program
    .version(pkg.version)
    .option('-p, --port [port]','port to start server on(default=3000)',process.env.PORT || 3000)
    .option('-b, --bind [bind]','bind to this address(default = 0.0.0.0)',process.env.BIND || '0.0.0.0')
    //.parse(process.env.NODE_ENV ==? process.argv);
    
    let server = new Server(application,{
        port: program.port,
        bind: program.bind
    })

    return Promise.resolve()
    .then(_ =>{
        Logger.info("Starting initializer.");
        return application.initialize()
    })
    .then(_ =>{
        Logger.info("Starting server.")
        return server.run();
    })
    .then(_=>Logger.info(`Listening on port ${program.port} successfully`))
    .catch(error =>{
        Logger.error(error.stack);
        Logger.error({ err:error });
    })
    
}
