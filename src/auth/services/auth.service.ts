import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../Usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService {  
    constructor (
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const buscarUsuario = await this.usuarioService.findByEmail(username)

        if(!buscarUsuario)
        throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);

        const match = await this.bcrypt.compararSenha(buscarUsuario.senha_usuario, password)

        if(buscarUsuario && match) {
            const { senha_usuario, ...result } = buscarUsuario;
            return result
        }
        return null;
    }

    async login(usuarioLogin: any) {
        const payload = { username: usuarioLogin.email_usuario, sub: "we_do_care"};

        return {
            usuario: usuarioLogin.email_usuario,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }
}