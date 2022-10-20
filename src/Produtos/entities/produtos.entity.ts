import { IsNotEmpty } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({name: "tb_products"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    descricao: string

    @IsNotEmpty()
    @Column("decimal", {precision: 3, scale: 2})  // Float MySQL
    preco: number

    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    detalhe_produto: string

    @IsNotEmpty()
    @Column()
    quantidade: number
}