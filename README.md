# Fullstack Demo

## Instructions about how this demo was set up

```bash
# Create the root folder for git
mkdir fullstack-demo
cd fullstack-demo
git init
git remote add origin git@github.com:Zaiban/fullstack-demo.git

# Init the backend with express-generator and test it
npx express-generator backend
cd backend
npm start # After this, navigate to http://localhost:3000 to verify.

# Init the frontend with create-react-app
cd ..
npx create-react-app frontend
cd frontend
npm start # After this, navigate to http://localhost:3000 to verify.

# Create Docker files
# For the file contents, refer to the repository
cd ..
touch docker-compose.yml
touch backend/Dockerfile
touch frontend/Dockerfile
```

## Setting up the dev env

### Environment files

A file called `backend/.env` is required for the app to work. For the
development environment, here is an example content:

```sh
MONGO_URI=mongodb://root:example@mongodb:27017/bikedb?authSource=admin
```

## Fullstack demo app: TSP-Appi (työsuhdepyöräsovellus)

The objective is to create an app for managing employee bikes. An employee
can save their bike with the app. The app can for example, store basic
information about the bike, calculate the remaining payment plan, and
keep a log of maintenance operations done on the bike.

### Roadmap

[x] Initial releas. 
    Basic information about the bike, such as brand, model, color etc.
[ ] Store and calculate the remaining payments.
[ ] Store and manage the maintenance history.
