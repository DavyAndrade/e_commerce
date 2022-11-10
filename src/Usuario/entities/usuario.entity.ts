import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";
import { Produto } from "../../Produtos/entities/produtos.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_usuario"})
export class Usuario {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    nome_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 15, nullable: false})
    genero_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 10, nullable: false})
    estado_civil: string;

     @ApiProperty()
     @IsNotEmpty()
     @Column({length: 40, nullable: false})
     profissao_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column("decimal", {precision: 6, scale: 2})
    renda_usuario: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 15, nullable: false})
    etnia_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    data_usuario: Date;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 14, nullable: false})
    cpf_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 12, nullable: false})
    rg_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 9, nullable: false})
    cep_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 150, nullable: false})
    endereco_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 15, nullable: false})
    telefone_usuario: string;

    
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty({example: "email@email.com.br"})
    email_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @Column({length: 15, nullable: false})
    senha_usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    descricao_usuario: string;
    
}