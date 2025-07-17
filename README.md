This is an express project of managing a simple API collections of a to-do list application that supports user login, verification, JWT and other functionalities


USER SCHEMA
- userid
- username
- password
- email

TO-DO SCHEMA
- objectid
- Title
- Slug
- Description
- Status (bool)
- Deadline

Functionality: Just see the jobs that are currently undone

CRUD functionality for the todo with the schema as above.

Necessity: 
- Use middleware to protect job-related API.
- Use JWT to authenticate people. Token has time limit of 1h

Functionality
- Refresh Token
- 