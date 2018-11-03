import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import { config } from './config.js';

const port = config.port;
const app = express();
const proxy = httpProxy.createProxyServer({
	secure: false,
	target: config.backendService,
	proxyTimeout: 60000,
	hostRewrite: port,
	changeOrigin: true
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', function (req, res, next) {
	const { url } = req;

	if (url.startsWith('/api') || url.startsWith('/socket.io/')) {
		proxy.web(req, res, {}, function (e) { });
	}
	else {
		next();
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log(`Listening on port ${port}`);
	}
});