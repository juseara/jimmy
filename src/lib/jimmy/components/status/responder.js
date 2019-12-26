import Jimmy from 'jimmy';

export default (model, context) => {
    return {
        status:'ok',
        environment: Jimmy.config.environment,
        date: new Date(),
    }
}