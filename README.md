# Advanced JWT Authentication with Email Confirmation (React + Redux Toolkit)

Read below to find out how to implement this authorization in your app.

## Features

- **JWT Authentication**: Utilize JWTs for secure user authentication.
- **Email Confirmation**: Ensure user email addresses are confirmed for security.

## Tech Stack and Libraries

- **Frontend**: React, Redux Toolkit, Axios
- **Backend**: Express, Express-validator, Nodemailer, Jsonwebtoken, Cors, Cookie-parser, Bcrypt, Uuid, Dotenv
- **Database**: Mongodb, Mongoose

## Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm i` in *server folder* and `npm i` in *client folder* to install dependencies.

## Adding .env

Add .env file in *server folder* with this structure:

1. PORT = 5000
2. DB_URL = // db url
3. JWT_ACCESS_SECRET = jwt-secret-key
4. JWT_REFRESH_SECRET = jwt-refresh-secret-key
5. SMTP_HOST = "smtp.mail.ru"
6. SMTP_PORT = 465
7. SMTP_USER = "" // your mail
8. SMTP_PASSWORD = "" // app password for mail
9. API_URL = http://localhost:5000
10. CLIENT_URL = http://localhost:3000

## Usage
1. Run `npm start` in *client folder* to start the development.
2. Run `npm run dev` in *server folder* to start the development.
3. You now have access to the app.
