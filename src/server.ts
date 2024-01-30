import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { appConfig } from './configs';
import { Logging } from './libraries';
import bodyParser from 'body-parser';
import { Enviroment } from './types';

const app = express();
const serverHTTP = http.createServer(app);

/** Connect to Mongo **/
mongoose.set('strictQuery', true);
mongoose
	.connect(appConfig.MONGO.URL, { retryWrites: true, w: 'majority' })
	.then(() => {
		Logging.info('Connected to MongoDB');
		StartServer();
	})
	.catch((error) => {
		Logging.error('Unable to connect: ');
		Logging.error(error);
	});

/** Only start the server if Mongo connected **/
const StartServer = () => {
	app.use((req, res, next) => {
		/** Log the Request **/
		Logging.info(`Incomming => Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		res.on('finish', () => {
			/** Log the Response **/
			Logging.info(
				`Outcomming => Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
			);
		});

		next();
	});

	app.use(express.json());
	app.use(bodyParser.json());
	app.use(express.urlencoded({ extended: false }));

	/** Routes **/
	// app.use(`${userParentRoute}`, userSubRoutes);

	/** Health Check **/
	app.get('/ping', (_req, res, _next) => res.status(200).json({ message: 'pong' }));

	/** Error Handling **/
	app.use((_req, res, _next) => {
		const error = new Error('Not found!');
		Logging.error(error);

		return res.status(404).json({ message: error.message });
	});

	serverHTTP.listen(appConfig.SERVER.PORT, () => Logging.info(`Server is running on port ${appConfig.SERVER.PORT}`));
};
