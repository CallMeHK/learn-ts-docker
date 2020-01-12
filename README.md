## Identity BC

### What is this?

This is an authentication service that will be connected to a queue and used for other microservices and applications.  I find myself writing authentication for apps over and over again, so i decided to make this a microservice i can use for other projects.  

## How to run

 - Install docker
 - cd into this folder
 - run ```docker-compose up```
 - enter this containers shell: ```docker exec -it <container name> bash```
 - in the container shell: ```npm run migrate```
   - to add sample data: ```npm run sample-data```
   - to tear down the tables and rebuild with sample data: ```npm run rebuild-db```
 - The container will be available at localhost:3000
 - postgres will be available at port 35432

## REST API

### Find user by ID

Request:  ```GET localhost:3000/api/user/:id```

Success response: 

```
{
  "success": true,
  "user": {
    "id": 3,
    "username": "Haeli",
    "email": "haeli@ex.com",
    "role": "user",
    "active": true,
    "created_at": "2020-01-11T21:59:24.354Z"
  }
}
```
Error response: 

```
{
  "success": false
}
```

### Create a user

Request: ```POST localhost:3000/api/user/create```

Body: 

```
{
	"username":"Bobby3",
	"email":"bobby3@ex.com",
	"password":"bobby2"
}
```

Success response:

```
{
  "success": true,
  "user": {
    "id": 6,
    "username": "Bobby5",
    "email": "bobby5@ex.com",
    "role": "user",
    "active": true,
    "created_at": "2020-01-11T23:37:44.988Z"
  }
}
```

Error response: 

```
{
  "success": false,
  "error": "Email or username already in use"
}
```

### Log in a user

Request: ```POST localhost:3000/api/auth/login ```

Body: 

```
{
	"username":"Ty",
	"password": "1"
}
```

Response: 

```
{
  "success": true // or false
}
```

Sets a cookie to ```Token: <json web token here>```

### Log out a user

Request: ```POST localhost:3000/api/auth/logout ```

Response: 

```
{
  "success": true
}
```

