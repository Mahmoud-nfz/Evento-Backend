import { Test, TestingModule } from '@nestjs/testing';
import { SeatingSectionsService } from './seating-sections.service';

describe('SeatingSectionsService', () => {
	let service: SeatingSectionsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SeatingSectionsService],
		}).compile();

		service = module.get<SeatingSectionsService>(SeatingSectionsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
