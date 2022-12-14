import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult } from "typeorm";
import { Produto } from "../entities/produtos.entity";
import {Injectable, HttpStatus, HttpException} from "@nestjs/common";


@Injectable()
export class ProdutosService{
    constructor(
        @InjectRepository(Produto)
        private produtosRepository: Repository<Produto>
        ){}
    
    //Método para achar todos
    async findAll(): Promise<Produto[]>{
        return await this.produtosRepository.find({
            relations: {
                categoria: true
            }
        });
    }

    //Método achar pelo ID
    async findById(id:number): Promise<Produto>{
        let produtos = await this.produtosRepository.findOne({
            where:{
                id
            },
            relations: {
                categoria: true
            }
        });
        if (!produtos){
            throw new HttpException('ID referente ao produto não existe.', HttpStatus.NOT_FOUND)
        }
        return produtos;
    }

    //Método de Achar pelo nome do Produto
    async findByName(nome: string): Promise<Produto[]>{
        return await this.produtosRepository.find({
            where : {
                nome: ILike(`%${nome}%`)
            }, 
            relations: {
                categoria: true
            }
        })
    }

    //Método de criar dados no banco de dados
    async create(produtos: Produto): Promise<Produto>{
        return await this.produtosRepository.save(produtos);
    }

    //Método de atualizar dados no banco de dados pelo ID
    async update(produtos: Produto): Promise<Produto>{
        let buscarProduto: Produto = await this.findById(produtos.id)
        if (!buscarProduto || !produtos.id){
            throw new HttpException('ID referente ao produto não existe.', HttpStatus.NOT_FOUND);
    }
    return await this.produtosRepository.save(produtos);
}

    //Método de deletar dados do banco de dados pelo ID
    async delete(id:number): Promise<DeleteResult>{
        let buscarProduto:Produto = await this.findById(id)
        if (!buscarProduto){
            throw new HttpException('ID referente ao produto não existe.', HttpStatus.NOT_FOUND);
        }
        return await this.produtosRepository.delete(id);
    }


}