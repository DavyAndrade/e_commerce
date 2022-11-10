import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Teste - We Do Care (e2e)', () => {
  let token: any
  let usuarioId: any
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'we_do_care_teste',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Cadastrar Usuário', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuario/cadastrar')
    .send({
      nome_usuario: 'João Bobó',
      genero_usuario: 'Não-Binário',
      estado_civil: 'Viúvo',
      profissao_usuario: 'Surfista',
      renda_usuario: 'R$ 01.00',
      etnia_usuario: 'Chinês',
      data_usuario: 1648/10/20,
      cpf_usuario: '999.999.999-69',
      rg_usuario: '69.666.666-6',
      cep_usuario: '12345-444',
      endereco_usuario: 'kkkk top XD',
      telefone_usuario: '(21) 92345-6969',
      email_usuario: 'carlão.games@gmail.com',
      senha_usuario: 'jão22top',
      descricao_usuario: 'Mancando das perna'
    });

    expect(201)
    usuarioId = resposta.body.id_usuario;

  });

  it('02 - Autenticação do Usuário', async () => {
    const autenticacao =  await request(app.getHttpServer())
    .post('/auth/logar')
    .send({
      email_usuario: 'carlão.games@gmail.com',
      senha_usuario: 'jão22top'
    });

    expect(200)
    token = autenticacao.body.token;

  });

  it('03 - Não Deve Duplicar Usuário', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuario/cadastrar')
    .send({
      nome_usuario: 'João Bobó',
      genero_usuario: 'Não-Binário',
      estado_civil: 'Viúvo',
      profissao_usuario: 'Surfista',
      renda_usuario: 'R$ 01.00',
      etnia_usuario: 'Chinês',
      data_usuario: 1648/10/20,
      cpf_usuario: '999.999.999-69',
      rg_usuario: '69.666.666-6',
      cep_usuario: '12345-444',
      endereco_usuario: 'kkkk top XD',
      telefone_usuario: '(21) 92345-6969',
      email_usuario: 'carlão.games@gmail.com',
      senha_usuario: 'jão22top',
      descricao_usuario: 'Mancando das perna'
    });

    expect(400)
    
  });

  it('04 - Atualizar Usuário', async () => {
    const atualizar = await request(app.getHttpServer())
    .post('/usuario/atualizar')
    .send({ 
        nome_usuario: 'rodrigo',
        genero_usuario: 'estranho',
        estado_civil: 'solteiro',
        profissao_usuario: 'surfista',
        renda_usuario: '1',
        etnia_usuario: 'doberman',
        data_usuario: '1648/10/05',
        cpf_usuario: '666.666.666-66',
        rg_usuario: '66.666.666-6',
        cef_usuario: '66666-666',
        endereco_usuario: 'carneiro brito de joão gomes levei no cano, 7532. Rio de Janeiro',
        telefone_usuario: '(21)96666-6666',
        email_usuario: 'carlao_mixuri@hotmail.com',
        senha_usuario: 'carlao1234',
        descricao_usuario: 'SOU DOIDO'
    })
    expect(201)

    usuarioId = atualizar.body.id_usuario
  })

});
