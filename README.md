**Healthera Jokes Challenge**
-

Fisrt of all I would like to thank you for the opportunity. Well, this project was made using **NodeJS**, **Mongodb**, **Docker** and **React**. I'm using Docker because I think it provides simplicity and it's easy to test in different environments. I'm also providing tests for the server service which covers all the api.

To start the whole application you must have docker-compose (*It's provided by the docker installation*). This is going to setup 3 services, the server will try to connect to mongo, sometimes mongo takes a few seconds, in this case the server service will be retrying, restarting the container until the connection is valid. So, simply run the following command at the root directory of the challenge.
```
cd server && npm i && cd ../client/app && npm i && cd ../../
docker-compose up --build
```

And to stop, you can hit `ctrl + c` or by typing:
```
docker-compose stop
```

If you want to remove all the data, for example, the mongodb collections, you can do this by running:
```
docker-compose rm
```

The **server** will be running at the port **3050** and the **client** at the port **3060**. You can access the front-end by going to **http://localhost:3060**, the client is also a container.

Inside the *documentation/evidences* you can find several images and videos as evidences of the application running.

**Tests**
-

The server has a good test approach over the API. If you want to run the tests, first of all you must **stop** the application if it's not already stopped. After that, go to the *server/tests* directory, you can find another docker-compose.yml. It's an **isolated enviroment** for tests, run:
```
docker-compose up --build
```
**Wait** for all containers to be ok and then go back to the *server* directory and run:
```
npm run test
```
It will execute all the tests and finish, when you see the tests you can **stop** the Test environment.

You can also find test evidences at *documentation/evidences*.

**The Server**
-

The server is very easy to understand, it has a very basic logger, it has some middlewares for data checking and it has two basic controllers, joke and type.

Joke controller handles the CRUD operations for the jokes. Type controller handles the CRUD operations for the types. You will also find some common functions that serve both controllers.


**The Client**
-

The client is also very basic, it's a React application with very few components. You can create types, jokes, find randomly, find all, filter by type ...

**Things that I think in a Real World scenario would be amazing**
-

Since the application handles jokes randomly, maybe using some cache system like **Redis**, or even a basic memory implementation would be nice. 

Also I think we could use mongodb using replicas and setup mongo to make all read operations from the second replicas, in this way we have some performance even reading from the database, it could be a good approach if the application has a high volume of access.

Another very nice tool is **Prometheus**, we could use it to collect information from the API and have a clear information about the traffic over the API in different times.