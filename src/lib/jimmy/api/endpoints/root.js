import Endpoint from 'jimmy/api/endpoint'

export default class RootEndpoint extends Endpoint {
	static setup() {
		this.route('get', '/', 'index');
	}

	index() {
		return {
			status: 'ok',
			response: {
				welcome: 'Welcome to Castiel Framework'
			}
		};
	}
}
