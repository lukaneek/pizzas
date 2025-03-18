This full stack MERN project is a pizza shop that uses:

  bycrpt, cors, express, mongoose, bootstrap, axios, nodemailer and react.

  -------------------------------------------------------------------------

  The enire application is written in javascript.  The client uses react for the UI, bootstrap for styling, and axois for REST API calls.  

  The server uses express web framework that provides the REST API's and buisiness logic.  Mongoose provides the ORM(Object Relational Mapping) of my model objects to a mongoose DB. Bcrypt is used for password hashing and confirm password features.  

  ------------------------------------------------------------------------------------

  Project details:

  Register/login authentication/error validation.
	
  Protected routes that protect against non logged in users from accessing further into the site without logging in/registering.
	
  Password hashing and confirm password using bcrypt.
	
  Used react library to build out the UI.  

  Using Nodemailer for registration email. 
	
  All data retrieved from the user is validated before entering MongoDB.

  -------------------------------------------------------------------------------

  The project is made up of a 3 tier architecture:

  React is a single page arcitecture it makes REST calls to the API's running on express. Express handles the buisiness logic which then uses MondoBD (the database).

 
