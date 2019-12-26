import { respondWithResponder } from 'jimmy/helpers/response';

export default class Service {
    static withContext(context){
        return Object.create(this,{
            context:{
                configurable:true,
                enumerable:true,
                writable:false,
                value:context
            }
        });
    }

    static respond(model, id, metadata={}){
        return respondWithResponder(id,model,metadata);
    }
}