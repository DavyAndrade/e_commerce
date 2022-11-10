import { Controller, Get, HttpStatus, HttpCode, Param, ParseIntPipe, Body, Post, Delete, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Produto } from '../entities/produtos.entity';
import { ProdutosService } from '../services/produtos.service';

@ApiTags('Produtos')
@Controller("/produtos")
@ApiBearerAuth()
export class ProdutosController{
    constructor(private readonly produtosService: ProdutosService){}


    //Retornando para o método de achar todos
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtosService.findAll();
    }

    //Retornando para o método de achar pelo ID
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtosService.findById(id);
    }

    //Retornando pelo metodo de achar pelo nome
    @Get('/search/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome')nome:string): Promise <Produto[]>{
        return   this.produtosService.findByName(nome);
    }


    //Criar um produto no banco de dados
    @UseGuards(JwtAuthGuard)
    @Post('/criar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body()produto: Produto): Promise<Produto>{
        return this.produtosService.create(produto);
    }

    //Mandar o método de atualizar funcionar no banco de dados
    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body()produto:Produto): Promise<Produto>{
        return this.produtosService.update(produto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtosService.delete(id)
    }

}