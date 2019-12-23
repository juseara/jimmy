import StandardError from './standard-error';
export default class ResponseError extends StandardError {
	constructor() {
		super('No response body.');
	}
}
