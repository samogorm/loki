# Authentication API

## Description
A re-usable authentication API that allows a user to submit their email and password and returns  a valid access token.

## Minimum Requirements
* NodeJS 10.16.0+

## Get Started With This Repo

1. Clone this repo `git clone https://github.com/samogorm/oauth-api.git`.
2. cd in to the cloned directory.
3. Run `npm install`.
4. Add a *.env* file in the root directory. 
5. Copy the enviroment variables from *.env.example* into *.env*.
6. Update the environment variables if needed.
7. Run `npm run start:dev`.
8. Open browser and go to http://localhost:5000/api/v1/test.
9. If you can see a JSON response message saying "Success!" then you are all up and running.

## POSTMAN Collection
To test the API endpoints, I have created a collection --> [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0598f505914cab337147)

## Tech Stack
* MongoDB
* Express
* TypeScript
* JWT (JSON Web Tokens)

## Key Features
* Create user
* Login via email and password
* Reset password
* Update details i.e Name, email, password
* Create Client
* Update Client

## Additional Features
* Login via Facebook
* Login via Twitter

## Main Methodss
1. createUser()
2. login()
3. createToken()
4. saveToken()
5. expireToken()
6. resetPassword()
7. updateUserDetails()

### 2. login()
* Grab ‘email’ and ‘password’ from request params
* Check that the user exists
* Check that the user is active
* Check that the password matches
	* Check that the user has a valid token:
		* no: 
			* Expire the latest token with expireToken()
			* Create a token (use JWT on this part to help)
			* Save the token to the database
			* Save a new login session
			* Return the token with a 200 response code
		* yes:
			* grab the token that hasn’t expired 
			* Save a new login session
			* Return that token with a 200 response code
* If the password does not match:
	* Return 401 status code with unauthorised message
* If any other errors occur:
	* Return 500 with server error message

### 3. createToken()
* Use JWT to create a new token

### 4. saveToken()
* Save the token to the database

### 5. expireToken()
* Check the token expiry date has passed
* set the expired field to true

### 6. resetPassword()
Needs discussion

### 7. updateUserDetails()
Needs discussion

## Database Schema
### User
* id: UID
* name: String
* email: String
* password: String
* active: Boolean
* createdAt: Timestamp
* updatedAt: Timestamp

### Token
* id: UID
* user: User
* token: String
* expires: Timestamp
* client: Client
* createdAt: Timestamp
* updatedAt: Timestamp

### Client
* id: UID
* name: String,
* url: String,
* secret: String
* grantType: String
* active: Boolean
* createdAt: Timestamp
* updatedAt: Timestamp

### UserSession
* id: UID
* type: String
* user: User
* token: Token
* client: Client
* createdAt: Timestamp
* updatedAt: Timestamp
