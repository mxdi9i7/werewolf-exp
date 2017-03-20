module.exports = {
 	development: {
	  	client: 'mysql',
	  	connection: {
		    host: '127.0.0.1',
		    user: 'root',
		    password: 'jjnn123',
		    database: 'test',
  		}
  	},
  	production: {
	  	client: 'mysql',
	  	connection: {
		    host: '127.0.0.1',
		    password: 'jjnn123',
		    user: 'root',
		    database: 'test',
	  	}
	}
}