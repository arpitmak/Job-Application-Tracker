# Job Application Tracker — Backend

REST API backend for a Job Application Tracker with JWT authentication and user-scoped job applications.

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

## Features
- User authentication (register, login) using JWT
- Protected routes using auth middleware
- User-specific job applications (no cross-user access)
- Job Applications CRUD
- Pagination, filtering, and search on jobs

## Project Structure
Job Application tracker/

              backend/ 
              
                  src/
                  
                      config/
                      
                      controllers/
                      
                      middleware/
                      
                      models/
                      
                      routes/
                      
                      app.js
                      
                  server.js
