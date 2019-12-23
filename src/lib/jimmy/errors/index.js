
import standard from 'jimmy/errors/standard-error'
import notfound from 'jimmy/errors/not-found';
import response from 'jimmy/errors/response';
import unauthorized from 'jimmy/errors/unauthorized';

global.StandardError = standard;
global.NotFoundError = notfound;
global.ResponseError = response;
global.UnauthorizedError = unauthorized;


