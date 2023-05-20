import { Test, TestingModule } from '@nestjs/testing';
import { EventGenresService } from './event-genres.service';

describe('EventGenresService', () => {
	let service: EventGenresService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EventGenresService],
		}).compile();

		service = module.get<EventGenresService>(EventGenresService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
