import LoggerAdapter from './logger';
import statusComponent from 'jimmy/components/status';

const Logger = LoggerAdapter.createLogger({ name: 'COMPONENT' });

export default {
    initialize(responders){
        Logger.info('Loading responders');
        this.loadResponders(responders)
        
    },
    loadResponders(responders){
        responders['status'] = statusComponent.responder;
    }
}