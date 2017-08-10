/* eslint-disable no-console */

import express from 'express';
import compression from 'compression';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import reactApplication from './middleware/reactApplication';
import security from './middleware/security';
import clientBundle from './middleware/clientBundle';
import serviceWorker from './middleware/serviceWorker';
import offlinePage from './middleware/offlinePage';
import errorHandlers from './middleware/errorHandlers';
import config from '../config';
import cookiesMiddleware from 'universal-cookie-express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from 'fs';

import { FRONTURL, port, host, basename, ANALYTIC, COVER, aws , PID } from '../shared/config.js'
import api from '../shared/services/api';

import FroalaEditor from './wysiwyg-editor-node-sdk/lib/froalaEditor.js';

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  // require('longjohn')
}
// Create our express based server.
const app = express();

// Don't expose any software information to potential hackers.
app.disable('x-powered-by');

// Security middlewares.
app.use(...security);

// Gzip compress the responses.
app.use(compression());

app.use(cookiesMiddleware());

app.use(cors());
// Register our service worker generated by our webpack config.
// We do not want the service worker registered for development builds, and
// additionally only want it registered if the config allows.
if (process.env.BUILD_FLAG_IS_DEV === 'false' && config('serviceWorker.enabled')) {
  app.get(`/${config('serviceWorker.fileName')}`, serviceWorker);
  app.get(
    `${config('bundles.client.webPath')}${config('serviceWorker.offlinePageFileName')}`,
    offlinePage,
  );
}

// Configure serving of our client bundle.
app.use(config('bundles.client.webPath'), clientBundle);

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), config('publicAssetsPath'))));

app.get('/robots.txt', (req, res) => {
	let robotTxt = ''

	if(process.env.NODE_ENV === 'production')
		robotTxt =
`User-agent: *
Disallow: /me/*
Disallow: /editor
Disallow: /editor/*
Sitemap: ${FRONTURL}/sitemap.xml`
	else
		robotTxt =
`User-agent: *
Disallow: /
Sitemap: ${FRONTURL}/sitemap.xml`

	res.send(robotTxt)
})

app.get(['/feed', '/feed/rss', '/rss'],(req,res) => {
	let type = req.query.type || 'article'
	api.getFeed(type.toLowerCase() ,{ status: 1 },'latest',null,null,20,{'rss' :true}).then(result => {
		res.set('Content-Type', 'text/xml');
		res.send(result.xml)
	})
})

app.get(['/feed/atom', '/atom'],(req,res) => {
	let type = req.query.type || 'article'
	api.getFeed(type.toLowerCase(),{ status: 1 },'latest',null,null,20,{'atom' :true}).then(result => {
		res.set('Content-Type', 'text/xml');
		res.send(result.xml)
	})
})

app.get(['/linetoday', '/feed/linetoday'],(req,res) => {
	let type = req.query.type || 'article'
	api.getFeed(type.toLowerCase(),{ status: 1 },'latest',null,null,20,{'line' :true}).then(result => {
		res.set('Content-Type', 'text/xml');
		res.send(result.xml)
	})
})

app.get('/get_signature', function (req, res) {
  var configs = {aws}
  var s3Hash = FroalaEditor.S3.getHash(configs);
  res.send(s3Hash);
});

// The React application middleware.
app.get('*', reactApplication);

// Error Handler middlewares.
app.use(...errorHandlers);

function startListen(_server, _url, _port) {
  _server.listen(_port);

  _server.on('error', (err) => {
    if (err.syscall !== 'listen') {
      throw err;
    }

    let bind = typeof _port === 'string' ? `Pipe ${_port}` : `Port ${_port}`;

    // handle specific listen errors with friendly messages
    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw err;
    }
  });

  _server.on('listening', () => {
    const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`;

    let addr = _server.address();
    let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.info(`Server is running at ${boldBlue(`${_url}:${_port}/`)}`);
  });
}

// Create an http listener for our express app.
// const listener = app.listen(config('port'), () =>
//   console.log(`Server listening on port ${config('port')}`),
// );

const listener = () => {
  const server = http.createServer(app);
  startListen(server, 'http://localhost', config('port'));

  if (process.env.NODE_ENV === 'development') {
    const ssl_options = {
      key: fs.readFileSync('./private/keys/localhost.key'),
      cert: fs.readFileSync('./private/keys/localhost.crt'),
      passphrase: 'thepublisher',
    };
    const secureServer = https.createServer(ssl_options, app);
    startListen(secureServer, 'https://localhost', config('port') + 100);
  }
};

// We export the listener as it will be handy for our development hot reloader,
// or for exposing a general extension layer for application customisations.
export default listener();
