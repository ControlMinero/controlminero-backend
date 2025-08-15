import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/item.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  logoUrl: string;

  @Column({ type: 'varchar', length: 7, default: '#3b82f6' })
  primaryColor: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => User, user => user.company)
  users: User[];

  @OneToMany(() => Item, item => item.company)
  items: Item[];
}
