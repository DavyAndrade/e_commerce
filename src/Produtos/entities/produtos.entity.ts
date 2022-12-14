import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Categoria } from "../../Categoria/entities/categoria.entity";
import { Usuario } from "../../Usuario/entities/usuario.entity";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";

@Entity({name: "tb_product"})
export class Produto {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    descricao: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column("decimal", {precision: 5, scale:2})
    preco: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    detalhe_produto: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    quantidade: number;

    @ApiProperty({ type: () => Categoria})
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete : "CASCADE"  
    })
    categoria : Categoria

}