import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Transaction {
  @PrimaryColumn()
  public id: string;

  @Column()
  public chargeid: string;

  @IsNotEmpty()
  @Column()
  public bookingid: string;

  @ManyToOne(type => Account, account => account.transactions) 
  public account: Account;

  public toString(): string {
    return `Account Associated ${this.account}, Booking_id associated: ${this.bookingid}, \
            Stripe Transaction id: ${this.id}`;
  }
}
