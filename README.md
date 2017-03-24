# werewolf-exp
This is a platform for people to create off-line game events especially for the game werewolves.
The platform is run by Node.js and Express in the backend, mySQL as the database and MaterializeCSS as design framework.

Created by Peter Zheng in 2016.


#www.egiang.com
##面杀网


1. `npm install `


2. (For MacOS) install docker at https://www.docker.com/docker-mac

3. docker run -d --name test-mysql -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e MYSQL_DATABASE=test mysql

4. docker start test-mysql

5. npm run db

6. wget http://download.redis.io/redis-stable.tar.gz
	tar xvzf redis-stable.tar.gz
	cd redis-stable
	make

7. redis-server

8. npm run dev