import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsuarioModule } from "../Usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./constants/constants";
import { Bcrypt } from "./bcrypt/bcrypt";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [UsuarioModule, 
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '24h'
            }
    })
],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt]
  
})
export class AuthModule {}