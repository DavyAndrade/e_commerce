import { Controller, HttpStatus, HttpCode, Body, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../services/usuario.service';


@ApiTags('Usuario')
@Controller("/usuario")
@ApiBearerAuth()
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService) {}

    // Criar um Usuario no Banco de Dados
    @Post("/cadastrar")
    @HttpCode(HttpStatus.CREATED)
    create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario);
    }

    // Atualizar Usuário pelo ID
    @UseGuards(JwtAuthGuard)
    @Put("/atualizar")
    @HttpCode(HttpStatus.OK)
    update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario);
    }
}