import { Test, TestingModule } from '@nestjs/testing';
import { EventGenresResolver } from './event-genres.resolver';
import { EventGenresService } from './event-genres.service';

describe('EventGenresResolver', () => {
	let resolver: EventGenresResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EventGenresResolver, EventGenresService],
		}).compile();

		resolver = module.get<EventGenresResolver>(EventGenresResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
