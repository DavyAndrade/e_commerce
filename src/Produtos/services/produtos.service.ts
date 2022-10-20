import { Injectable, HttpException, HttpCode, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult } from "typeorm";
import { Produto } from "../entities/produtos.entity";

@Injectable()
export class ProdutosService {
    constructor(
    @InjectRepository(Produto) 
    private produtosRepository: Repository<Produto> ) {}

    // Método Para Achar Todos
    async findAll(): Promise<Produto[]> {
        return await this.produtosRepository.find();
    }

    // Método Localizar pelo ID
    async findById(id: number): Promise<Produto> {
        let produtos = await this.produtosRepository.findOne({
            where: {id}
        })
        if (!produtos) {
        throw new HttpException ('ID Referente ao Produto não existe', HttpStatus.NOT_FOUND)}

        return produtos
    }

    // Método de Achar pelo Nome
    async findByName(nome: string): Promise<Produto[]> {
        return await this.produtosRepository.find({
            where: { nome: ILike (`%${nome}%`) 
        }})
    }

    // Método de Criar Dados no Banco de Dados
    async create(produtos: Produto): Promise<Produto> {
        return await this.produtosRepository.save(produtos)
    }

    // Método de Atualizar Dados do Banco de Dados pelo ID
    async update(produtos: Produto): Promise<Produto> {
        let buscarProduto: Produto = await this.findById(produtos.id)

        if (!buscarProduto || !produtos.id) {
            throw new HttpException('ID Referente ao Produto não existe.', HttpStatus.NOT_FOUND) 
    }
    return await this.produtosRepository.save(produtos)
}

    // Método de Deletar Dados do Banco de Dados pelo ID
    async delete(id: number): Promise<DeleteResult> {
        let buscarProduto: Produto = await this.findById(id);

        if (!buscarProduto) {
            throw new HttpException('ID Referente ao Produto não existe.', HttpStatus.NOT_FOUND)
        }
        return await this.produtosRepository.delete(id)
    }
}