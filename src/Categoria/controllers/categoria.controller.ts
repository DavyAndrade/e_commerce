import { Controller, Get, HttpStatus, HttpCode, Param, ParseIntPipe, Body, Post, Delete, UseGuards } from '@nestjs/common'
import { Put } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Categoria } from '../entities/categoria.entity'
import { CategoriaService } from '../services/categoria.service'

@ApiTags('Categoria')
@Controller("/categoria")
@ApiBearerAuth()
export class CategoriaController {
    constructor ( private readonly categoriaService: CategoriaService) {}

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get('/search/:modelo')
    @HttpCode(HttpStatus.OK)
    findByModelo(@Param('modelo') modelo: string): Promise<Categoria[]> {
        return this.categoriaService.findByModelo(modelo);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/criar")
    @HttpCode(HttpStatus.CREATED)
    create(@Body()categoria: Categoria): Promise<Categoria>{
    return this.categoriaService.create(categoria)
    }

    @UseGuards(JwtAuthGuard)
    @Put("/atualizar")
    @HttpCode(HttpStatus.OK)
    update(@Body()categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.update(categoria)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.categoriaService.delete(id)
    }
}

