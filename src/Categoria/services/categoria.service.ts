import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, DeleteResult } from 'typeorm'
import { Categoria } from '../entities/categoria.entity'

@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria> ){}

        // Método Achar Todos
        async findAll(): Promise<Categoria[]> {
            return await this.categoriaRepository.find();
        }

        // Método Achar/Encontrar pelo ID
        async findById(id: number): Promise<Categoria> {
            let categoria = await this.categoriaRepository.findOne({
                where: {
                    id
                }});

            if(!categoria) {
                throw new HttpException('Id Relacionado ao Objeto não foi encontrado.', HttpStatus.NOT_FOUND) }

            return categoria; 
        }

        // Método Achar Pelo Modelo
        async findByModelo(modelo: string): Promise<Categoria[]> {
            return await this.categoriaRepository.find({
                where: {
                    modelo: ILike(`%${modelo}%`)
                }})}

        // Mandar Dados Novos para o Banco de Dados
        async create(categoria: Categoria): Promise<Categoria> {
            return await this.categoriaRepository.save(categoria)
        }

        // Atualizar os Dados Já Existentes
        async update(categoria: Categoria): Promise<Categoria> {
        let buscaCategoria: Categoria = await this.findById(categoria.id)

        if (!buscaCategoria || !categoria.id)
            throw new HttpException('ID Relacionado ao Objeto não foi encontrado.', HttpStatus.NOT_FOUND)
        
            return await this.categoriaRepository.save(categoria) }

        // Deletar os Dados no Banco de Dados
        async delete(id: number): Promise<DeleteResult> {
            let buscaCategoria = await this.findById(id);

            if (!buscaCategoria)
            throw new HttpException('ID Relacionado ao Objeto não foi encontrado.', HttpStatus.NOT_FOUND)

            return await this.categoriaRepository.delete(id)
        }
 }