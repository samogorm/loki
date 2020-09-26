# Authentication API

## Description
A re-usable authentication API that allows a user to submit their email and password and returns a valid access token.

## Minimum Requirements
* NodeJS 10.16.0+
* MongoDB

## Get Started With This Repo

1. Clone this repo `git clone https://github.com/samogorm/loki.git`.
2. cd in to the cloned directory.
3. Run `npm install`.
4. Add a *.env* file in the root directory.
5. Copy the environment variables from *.env.example* into *.env*.
6. Update the environment variables, if needed (current ones are fine for testing).
7. Run `npm run start:dev`.
8. Open browser and go to http://localhost:5000/api/v1/status.
9. If you can see a JSON response message saying "OK!" then you are all up and running.

## Testing Endpoints
To test the API endpoints, you can import the collection into Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0598f505914cab337147)

## Tech Stack
* MongoDB
* Express
* TypeScript
* JWT (JSON Web Tokens)

## Key Features
* Create user
* Login via email and password
* Reset password
* Update user details i.e Name, email, password
* Create, read, update and delete a Client

## Future Roadmap

### Testing
* Add unit tests!

### Tech Stack
* Add GraphQL

### Tools
* Production builds

### Features
* Login via Facebook
* Login via Twitter
* Client-based permissions/roles
