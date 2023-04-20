import { ValueTransformer } from 'typeorm';

export class LowercaseTransformer implements ValueTransformer {
	to(value: string): string {
		return value.toLowerCase();
	}

	from(value: string): string {
		return value;
	}
}
