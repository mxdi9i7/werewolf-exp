# werewolf-exp
This is a platform for people to create off-line game events especially for the game werewolves.
The platform is run by Node.js and Express in the backend, mySQL as the database and MaterializeCSS as design framework.

Created by Peter Zheng in 2016.


# www.egiang.com
## 面杀网


1. Install npm packages

`npm install `


2. Download and install docker for database container

`(For MacOS) install docker at https://www.docker.com/docker-mac`

3. Create the container named test-mysql on port 3306 redirected from 3306 with a table test

`docker run -d --name test-mysql -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e MYSQL_DATABASE=test mysql`

4. Start the docker container with the database

`docker start test-mysql`

5. Run database migration and seeding script to bootstrap the database

`npm run db`

6. Download and install Redis server for caching

`wget http://download.redis.io/redis-stable.tar.gz
	tar xvzf redis-stable.tar.gz
	cd redis-stable
	make`

7. Start Redis server

`redis-server`

8. Start Node server with nodemon

`npm run dev`