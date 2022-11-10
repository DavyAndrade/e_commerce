import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Produto } from "../../Produtos/entities/produtos.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_category"})
export class Categoria {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    fornecedor : string

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    modelo: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    material: string;

    @ApiProperty({type: () => Produto})
    @OneToMany(()=> Produto, (produto) => produto.categoria)
    produto : Produto []

    
}