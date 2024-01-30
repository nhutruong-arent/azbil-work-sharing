import { cleanEnv, port, str } from 'envalid';
import { Enviroment } from '../types';

export const validateEnv = () => {
	cleanEnv(process.env, {
		NODE_ENV: str({ choices: Object.values(Enviroment) }),
		PORT: port(),

		MONGO_USERNAME: str(),
		MONGO_PASSWORD: str(),
		MONGO_DB: str(),
	});
};
