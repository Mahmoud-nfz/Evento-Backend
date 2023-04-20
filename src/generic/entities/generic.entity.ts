import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';

@ObjectType()
export class GenericEntity {
	@Field(() => Int, { description: 'id' })
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Date, { description: 'created at' })
	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date;

	@Field(() => Date, { description: 'updated at' })
	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updatedAt: Date;

	@Field(() => Date, { description: 'deleted at' })
	@DeleteDateColumn({ type: 'timestamp', nullable: true })
	deletedAt: Date;
}
