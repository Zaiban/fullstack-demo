# Fullstack Demo

## For the students of "Full stack web –sovelluksen rakenne ja toimintaperiaate"

The shell commands below demonstrate how the development of this 
"TSP-Appi" app was initially started. Follow this guide to get started with
your own project.

This guide expects that the student has the following environment setup:
* Windows 10 or 11 development PC
* Visual Studio Code as the editor: https://code.visualstudio.com/
* WSL2 (Windows Subsystem For Linux) command line tool: https://learn.microsoft.com/en-us/windows/wsl/install
  * In the WSL2 terminal: Node.js (install with NVM: https://github.com/nvm-sh/nvm)
* Docker Desktop, Windows edition: https://www.docker.com/products/docker-desktop/

**In the WSL terminal**

```bash
# Create the root folder for the project and init Git
mkdir fullstack-demo
cd fullstack-demo
git init

## Optional: add your Git remote, i.e. GitHub 
git remote add origin git@github.com:Username/name-of-the-repo.git

# Generate backend files with express-generator and test it
npx express-generator backend
cd backend
npm start # After this, navigate to http://localhost:3000 to verify.

# Init the frontend with create-react-app
cd ..
npx create-react-app frontend
cd frontend
npm start # After this, navigate to http://localhost:3000 to verify.

# Create Docker files
# For the file contents, see an example in this repo
cd ..
touch docker-compose.yml
touch backend/Dockerfile
touch frontend/Dockerfile
```

## For those wanting to dev the TSP-Appi app

### Initial setup

Clone the repo and install deps

```sh
git clone git@github.com:Zaiban/fullstack-demo.git
cd fullstack-demo
cd backend
npm install
cd ../frontend
npm install
cd ..
docker-compose up -d
```

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

* [x] `0.1.0` Initial release. 
  * Basic information about the bike, such as brand, model, color etc.
* [ ] `0.2.0` Payments Management (In Progress)
  * Features:
    * Store and calculate remaining payments.
  * Tasks:
    * [ ] Desing database models
    * [ ] Back-end logic
    * [ ] UI components
* [ ] `0.3.0` Maintenance History (Upcoming)
  * Features:
    * Store and manage maintenance history.
  * Tasks:
    * [ ] Desing database models
    * [ ] Back-end logic
    * [ ] UI components
* [ ] `1.0.0` Internationalization & Final release
  * Features:
    * Support for multiple languages (English & Finnish)
    * Finalize and stabilize the application with testing.
  * Tasks:
    * [ ] Implement language selecttion mechanism (via dropdown menu)
    * Translations:
      * [x] Finnish translation
      * [ ] English translation
    * Testing:
      * [ ] Unit tests for all major components
      * [ ] Implement integration tests
    * [ ] Fix any remaining bugs
