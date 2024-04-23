import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenId: number;

  @Column()
  name: string;

  @Column()
  symbol: string;
}
