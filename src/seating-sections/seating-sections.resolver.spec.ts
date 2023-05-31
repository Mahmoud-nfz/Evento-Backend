import { Test, TestingModule } from '@nestjs/testing';
import { SeatingSectionsResolver } from './seating-sections.resolver';
import { SeatingSectionsService } from './seating-sections.service';

describe('SeatingSectionsResolver', () => {
	let resolver: SeatingSectionsResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SeatingSectionsResolver, SeatingSectionsService],
		}).compile();

		resolver = module.get<SeatingSectionsResolver>(SeatingSectionsResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
