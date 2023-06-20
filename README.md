# Rent X

O projeto Rent X é uma API HTTP Rest do Node.js construída com Typescript, Express, Prisma, PostgreSQL, JWT e outras tecnologias. Ele permite o gerenciamento de um sistema de aluguel de carros, como a criação de um aluguel, devolução do aluguel, criação de carro e outros, consulte a documentação abaixo.

O aplicativo é totalmente testado com testes unitários e estou implementando testes de ponta a ponta usando Vitest e Supertest e segue os princípios SOLID.

## Cadastro de carro

### Requisitos funcionais

- Deve ser possível cadastrar um novo carro.

### Regras de negocio

- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## Listagem de carros

### Requisitos funcionais

- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo *** nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo *** nome da marca
- Deve ser possível listar todos os carros disponíveis pelo *** nome do carro

### Regras de negocio

- O usuário não precisar estar logado no sistema.

## Cadastro de Especificação no carro

### Requisitos funcionais

- Deve ser possível cadastrar uma especificação para um carro

### Regras de negocio

- Não deve ser possível cadastrar uma especificação para um *** carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já *** existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário *** administrador.

## Cadastro de imagens do carro

### Requisitos funcionais

- Deve ser possível cadastrar a imagem do carro

## Requisitos não funcionais

- Utilizar o multer para upload dos arquivos

### Regras de negocio

- O usuário deve poder cadastrar mais de uma imagem para o *** mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário *** administrador.

## Aluguel de carro

### Requisitos funcionais

- Deve ser possível cadastrar um aluguel

### Regras de negocio

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já *** exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já *** exista um aberto para o mesmo carro
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel, o status do carro deverá ser *** alterado para indisponível

## Devolução de carro

### Requisitos funcionais

- Deve ser possível realizar a devolução de um carro

### Regras de negocio

- Se o carro for devolvido com menos de 24 horas, deverá *** ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para *** outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado *** para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do *** aluguel.
- Caso o horário de devolução seja superior ao horário ***previsto de entrega, deverá ser cobrado multa*** proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação

## Listagem de Alugueis para usuário

### Requisitos funcionais

- Deve ser possível realizar a busca de todos os alugueis para o usuário

### Regras de negocio

- O usuário deve estar logado na aplicação

## Recuperar Senha

### Requisitos funcionais

- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

### Regras de negocio

- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas

## Rotas

O projeto esta documentado usando o swagger basta iniciar o servidor localmente e acessar a [rota da documentação](http://localhost:3333/api-docs).

## Tecnologias

Algumas tecnologias utilizadas para construção da aplicação.

- Node.js
- Typescript
- Express
- Prisma
- PostgreSQL
- JWT (JSON Web Token)
- TSup
- Vitest
- Supertest

## Rodar o servidor

```sh title="Clone o repositório"
  git clone https://github.com/manoguii/rentx.git
```

- Para rodar o servidor localmente
  1. Crie um arquivo ```.env``` na raiz do projeto e preencha as variáveis ambiente, o exemplo de como deve ficar esta em ```.env.example```.
  2. Instale as dependências ```npm install```
  3. Crie um container do Postgresql ```docker-compose up -d```
  4. Rodar as migrations ```npx prisma migrate dev```
  5. Iniciar servidor ```npm run start:dev```

## Rodar testes unitários

```zsh
npm run test
```

## Rodar testes E2E

```zsh
npm run test:e2e
```

<center>Made with 💙 by Guilherme David</center>
