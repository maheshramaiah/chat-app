import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackConfig from './webpack.config';
import httpProxy from 'http-proxy';
import { config } from './config.js';

const port = config.port;
const app = express();
const compiler = webpack(webpackConfig);
const proxy = httpProxy.createProxyServer({
	secure: false,
	target: config.backendService,
	proxyTimeout: 60000,
	hostRewrite: port,
	changeOrigin: true
});

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: webpackConfig.output.publicPath
}));

app.use('/', function (req, res) {
	const { url } = req;

	if (url.startsWith('/api') || url.startsWith('/socket.io/')) {
		proxy.web(req, res, {}, function (e) { });
	}
	else {
		res.sendFile(path.join(__dirname, 'src/index.html'));
	}
});

app.listen(port, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log(`Listening on port ${port}`);
	}
});