import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './Categoria/entities/categoria.entity';
import { CategoriaModule } from './Categoria/categoria.module';
import { ProdutosModule } from './Produtos/produtos.module';
import { Produto } from './Produtos/entities/produtos.entity';
import { Usuario } from './Usuario/entities/usuario.entity';
import { UsuarioModule } from './Usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'we_do_care_teste',
      entities: [Categoria, Produto, Usuario],
      synchronize: true,
    }),*/
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    CategoriaModule,
    ProdutosModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
