import mongoose from 'mongoose';

export interface IProject {
	_id: mongoose.Types.ObjectId;

	userId: string;
	userName: string;

	isAvailable: boolean;
	syncedAt: Date;

	createdAt: Date;
	updatedAt: Date;
}
