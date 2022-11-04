import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Account {
  @PrimaryColumn()
  public id: string;

  @OneToMany(type => Transaction,  transaction => transaction.Account) 
  public transactions: Transaction[];

  @IsNotEmpty()
  @Column()
  public email: string;

  // userID on GRPC User Service
  @Column("uuid")
  public userid: string;

  public toString(): string {
    return `User's Email: ${this.email}, UserID on GRPC End: ${this.userid}`;
  }
}
