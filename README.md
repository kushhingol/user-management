# user-management
Microservices for User Management

The repository contains micro services for user management.


Following are the functionalities 

* To Register a user with username and password as user details
* To Login a user with username and password
* To Fetch all the users

**Steps for installing and running the server**

- Step 1 : Clone the repository by running the command ``
- Step 2 : In the root folder run the following command in the terminal `npm install`
- Step 3 : Create a .env file to add all the required environment variables (Here is the list of environment variables to be maintained
            1. MONGODB_URI, 2. SECRET_KEY, 3. TOKEN_EXPIRATION_TIME)

- Step 4: Run the following command to start the server `npm start`
- Step 5: Use the collection named **User Management.postman_collection** for postman testing

**Note**: In the postman testing the tokens will be automatically set in the Authorization by a script so no need to add the token manually for /api/users route

**Routes of the API**

- POST `/api/users/register` - Route to Register new users
- POST `/api/users/login` - Route to login a user
- GET `/api/users` - Route to fetch all the users
