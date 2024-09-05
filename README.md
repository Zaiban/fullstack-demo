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


```
