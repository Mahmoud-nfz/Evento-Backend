import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		// "value" is an object containing the file's attributes and metadata
		const oneMb = 1000 * 1000;

		const maxSize = 10 * oneMb;
		// check if value is an array of files
		if (Array.isArray(value)) {
			if (value.some((file) => file.size >= maxSize)) {
				throw new BadRequestException(
					'File size exceeds the maximum allowed size.'
				);
			}
		}

		if (value.size >= maxSize) {
			throw new BadRequestException(
				'File size exceeds the maximum allowed size.'
			);
		}
		return value;
	}
}
