import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { VALIDATE_ERROR_MESSAGE } from '../../constants';
import { IGeneralResponse } from '../../types';

export const validateSchema = (schema: yup.AnyObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate(req.body, { abortEarly: true, recursive: false });
			next();
		} catch (error) {
			let errorData: IGeneralResponse = { message: VALIDATE_ERROR_MESSAGE };
			if (error instanceof Error) errorData.message = error.message;

			return res.status(422).json(errorData);
		}
	};
};
