import Service from 'jimmy/service';

export default class StatusService extends Service {
    static get(params){
        return this.respond(params,'status');
    }
}