import { Injectable } from '@nestjs/common';
import { constants, createReadStream, promises } from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
	async getFileStreamByName(
		fileName: string
	): Promise<NodeJS.ReadableStream | null> {
		console.log(fileName);
		const filePath = path.join('./uploads/', fileName); // Adjust the path to the location of your files

		try {
			// Check if the file exists
			const fileExists = await promises
				.access(filePath, constants.F_OK)
				.then(() => true)
				.catch(() => false);

			if (!fileExists) {
				return null;
			}

			// Return a readable stream for the file
			return createReadStream(filePath);
		} catch (error) {
			// Handle any errors
			console.error(`Error retrieving file: ${error}`);
			return null;
		}
	}
}
