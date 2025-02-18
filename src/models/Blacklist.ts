import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Unique, UpdateDateColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";
@Entity()
export class Blacklist extends BaseEntity {
    @Column({ unique: true })
    token: string;

    @CreateDateColumn({ type: 'timestamp' }) 
    createdAt: Date;


}
