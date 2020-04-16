# Authentication API

## Description
A re-usable authentication API that allows a user to submit their email and password and returns  a valid access token.

## Tech Stack
* GraphQL
* Apollo
* MongoDB
* Express
* TypeScript
* JWT (JSON Web Tokens)

## Key Features
* Login via email and password
* Reset password
* Update details i.e Name, email, password

## Additional Features
* Login via Facebook
* Login via Twitter

## Main Methods
1. login()
2. createToken()
3. saveToken()
4. expireToken()
5. resetPassword()
6. updateUserDetails()

### 1. login()
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

### 2. createToken()
* Use JWT to create a new token

### 3. saveToken()
* Save the token to the database

### 4. expireToken()
* Check the token expiry date has passed
* set the expired field to true

### 5. resetPassword()
Needs discussion

### 6. updateUserDetails()
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
* secret: String
* grantType: String
* active: Boolean
* createdAt: Timestamp
* updatedAt: Timestamp

### LoginSession
* id: UID
* user: User
* token: Token
* client: Client
* createdAt: Timestamp
* updatedAt: Timestamp

### First Steps
- Create GitHub repository
- Install dependencies:
	- GraphQL
	- Express
	- Apollo Express
	- JWT
	- dotenv
- Set up TypeScript support
- Set up environment variables
- Set up project structure
- Set up routing
