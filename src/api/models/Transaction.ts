import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Transaction {
  @PrimaryColumn()
  public id: string;

  @IsNotEmpty()
  @Column()
  public name: string;

  @IsNotEmpty()
  @Column()
  public age: number;

  @ManyToOne(type => Account, account => account.transactions) 
  public Account: Account;

  public toString(): string {
    return `${this.name}`;
  }
}
