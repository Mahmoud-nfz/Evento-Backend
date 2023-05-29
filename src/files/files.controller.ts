import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UsePipes,
	UploadedFile,
	UploadedFiles,
	Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './file-size.validation';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('upload')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const randomName = Array(8)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(8))
						.join('');
					cb(
						null,
						`${new Date().toISOString()}-${randomName}${extname(
							file.originalname
						)}`
					);
				},
			}),
		})
	)
	@UsePipes(new FileSizeValidationPipe())
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		console.log(file);
		return { file: file.path };
	}

	@Post('uploadMultiple')
	@UseInterceptors(FilesInterceptor('files'))
	@UsePipes(new FileSizeValidationPipe())
	uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
		console.log(files);
	}

	@Get(':fileName')
	async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
		// Get the file path or stream from your FilesService
		console.log(fileName);
		const fileStream = await this.filesService.getFileStreamByName(
			fileName
		);

		if (!fileStream) {
			// Handle the case when the file doesn't exist
			res.status(404).send('File not found.');
			return;
		}

		// Set the appropriate content type based on the file type
		res.setHeader('Content-Type', 'application/octet-stream');

		// Set the appropriate content disposition header to force the browser to download the file
		res.setHeader(
			'Content-Disposition',
			`attachment; filename="${fileName}"`
		);

		// Pipe the file stream to the response to send the file to the client
		fileStream.pipe(res);
	}
}
