import * as dotenv from 'dotenv';
import { tryParseInt, validateEnv } from '../utils';
import { Enviroment } from '../types';
import { PRODUCT_DOMAIN } from '../constants';

dotenv.config();
validateEnv();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DB = process.env.MONGO_DB || 'BeyConsDB';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@worksharing.atwquvv.mongodb.net/${MONGO_DB}`;

const NODE_ENV = process.env.NODE_ENV || Enviroment.Development;
const SERVER_PORT = tryParseInt(process.env.PORT || '', 44393);

export const appConfig = {
	MONGO: {
		URL: MONGO_URL,
	},
	SERVER: {
		ENV: NODE_ENV,
		PORT: SERVER_PORT,
		BASE_URL: NODE_ENV == Enviroment.Development ? `http://localhost:${SERVER_PORT}` : PRODUCT_DOMAIN,
	},
};
