import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  tokenId: number;

  @Column()
  name: string;

  @Column()
  symbol: string;
}
