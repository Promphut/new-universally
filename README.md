## Getting started

```bash
git clone https://github.com/ctrlplusb/react-universally my-project
cd my-project
yarn
yarn run develop
```

Or, if you aren't using [`yarn`](https://yarnpkg.com/):

```bash
git clone https://github.com/ctrlplusb/react-universally my-project
cd my-project
npm install
npm run develop
```

# Note:
- Developed on NodeJS 6.9.4
- Require node-gyp for building lwip (plan to remove this package)
- Development mode uses self-signed cert, other modes uses gen from CA that'll be handled via nginx.

# Development: 
- yarn run develop
- npm run develop

# Staging NextEmpire:
- NODE_ENV=staging PORT=5000 npm run build
- NODE_ENV=staging npm run start 
	e.g. on test server: NODE_ENV=staging PORT=5000 forever start -c 'npm run start'

# Staging Aommoney:
- NODE_ENV=staging PORT=5500 npm run build
- NODE_ENV=staging 'npm run start' 
	e.g. on test server: NODE_ENV=staging PORT=5500 forever start -c 'npm run start'

# Production:
- NODE_ENV=production PORT=5000 npm run build
- NODE_ENV=production node . 
	e.g. on nextempire production server: NODE_ENV=production PORT=5000 forever start -c 'npm run start'

# Test:
- Page Request Test using Jest : npm run test:app2 <FRONTURL>
- Authentication Test using Nightmare : npm run test:auth OR npm run test:auth -- --fronturl=<FRONTURL> --backurl=<BACKURL> (default is localhost 3000 and 4000)
- Share Test using Nightmare : npm run test:share OR npm run test:share -- --fronturl=<FRONTURL> --backurl=<BACKURL> (default is localhost 3000 and 4000)
