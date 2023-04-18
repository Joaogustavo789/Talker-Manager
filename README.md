# Talker Manager

<a name="readme-top"></a>

## Sobre o Projeto

Talker Manager é uma aplicação na qual é possível cadastrar, pesquisar, editar e excluir palestrantes utilizando `Node.js`!

## Rodando com Docker
<details>
  <summary>Clique para expandir</summary>
  
  ## É necessário ter o Docker instalado em sua máquina.
  
- Clone o projeto

```bash
  git clone git@github.com:Joaogustavo789/Talker-Manager.git
```

- Entre no diretório do projeto

```bash
  cd Talker-Manager
```

- Crie os Containers

```js
  docker-compose up -d  // Ele irá rodar um serviço do node!
```

OBS: Se estiver usando `macOS` será necessário colocar manualmente uma opção `platform: linux/amd64` no serviço do banco de dados no arquivo docker-compose.yml desse projeto.

- Entre no Container

```bash
  docker exec -it talker_manager bash
```

- Instale as dependências dentro do container

```bash
  npm install
```

- Execute a aplicação dentro do container

```bash
  npm run dev
```
</details>

## Rodando localmente
<details>
  <summary>Clique para expandir</summary>
  
   ## É necessário ter o Node.js instalado em sua máquina.
  
- Clone o projeto

```bash
  git clone git@github.com:Joaogustavo789/Talker-Manager.git
```

- Entre no diretório do projeto

```bash
  cd Talker-Manager
```

- Instale as dependências

```bash
  npm install
```
</details>


## Documentação da API

### Retorna todos os palestrantes

```http
  GET /talker
```
<details>
  <summary>Clique para expandir</summary>
  <br>
  
#### Resposta esperada

```js
[
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Heloísa Albuquerque",
    "age": 67,
    "id": 2,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Ricardo Xavier Filho",
    "age": 33,
    "id": 3,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Marcos Costa",
    "age": 24,
    "id": 4,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
]
```

#### Resposta esperada caso não tenha valores

```js
[]
```
</details>


### Retorna um palestrante

```http
  GET /talker/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do palestrante que você deseja buscar. |

<details>
  <summary>Clique para expandir</summary>
  <br>

#### Resposta esperada

```js
{
  "name": "Henrique Albuquerque",
  "age": 62,
  "id": 1,
  "talk": { "watchedAt": "23/10/2020", "rate": 5 }
}
```

#### Caso não encontre um palestrante

```js
{
  "message": "Pessoa palestrante não encontrada"
}
```
</details>


### Login

```http
  POST /login
```

<details>
  <summary>Clique para expandir</summary>
  <br>

#### Formato da requisição

```js
{
  "email": "email@email.com",
  "password": "123456"
}
```

#### Resposta esperada

```js
{
  "token": "7mqaVRXJSp886CGr"
}
```

#### Resposta com algum parâmetro errado
<details>
  <summary>Clique para expandir</summary>
  <br>

- **email vazio**

```js
{
  "message": "O campo \"email\" é obrigatório"
}
```

- **Quando é passado um email inválido**

```js
{
  "message": "O \"email\" deve ter o formato \"email@email.com\""
}
```

- **password vazio**

```js
{
  "message": "O campo \"password\" é obrigatório"
}
```

- **password menor que 6 caracteres**

```js
{
  "message": "O \"password\" deve ter pelo menos 6 caracteres"
}
```
</details>
</details>

### Cria um novo palestrante

```http
  POST /talker
```

<details>
  <summary>Clique para expandir</summary>
  <br>

#### Formato da requisição

```js
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

#### Retorno esperado

```js
{
  "id": 1,
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

#### Resposta com algum parâmetro errado
<details>
  <summary>Clique para expandir</summary>
  <br>
  
- **Quando não é passado um token**

```js
{
  "message": "Token não encontrado"
}
```

- **Quando é passado um token é inválido**

```js
{
  "message": "Token inválido"
}
```

- **name vazio**

```js
{
  "message": "O campo \"name\" é obrigatório"
}
```

- **name menor que 3 caracteres**

```js
{
  "message": "O \"name\" deve ter pelo menos 3 caracteres"
}
```

- **age vazio**

```js
{
  "message": "O campo \"age\" é obrigatório"
}
```

- **age menor de 18**

```js
{
  "message": "A pessoa palestrante deve ser maior de idade"
}
```

- **talk vazio**

```js
{
  "message": "O campo \"talk\" é obrigatório"
}
```
- **watchedAt vazio**

```js
{
  "message": "O campo \"watchedAt\" é obrigatório"
}
```

- **watchedAt inválido**

```js
{
  "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
}
```

- **rate vazio**

```js
{
  "message": "O campo \"rate\" é obrigatório"
}
```

- **rate menor que 1 ou maior que 5**

```js
{
  "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
}
```
</details>
</details>

### Altera um palestrante

```http
  PUT /talker/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do palestrante que você deseja alterar. |

<details>
  <summary>Clique para expandir</summary>
  <br>
  
#### Formato da requisição

```js
{
  "id": 1,
  "name": "Danielle Barbosa",
  "age": 57,
  "talk": {
    "watchedAt": "23/09/2020",
    "rate": 4
  }
}
```

#### Resposta esperada

```js
{
  "id": 1,
  "name": "Danielle Barbosa",
  "age": 57,
  "talk": {
    "watchedAt": "23/09/2020",
    "rate": 4
  }
}
```

#### Resposta com algum parâmetro errado
<details>
  <summary>Clique para expandir</summary>
  <br>

- **Quando não é passado um token**

```js
{
  "message": "Token não encontrado"
}
```

- **Quando é passado um token é inválido**

```js
{
  "message": "Token inválido"
}
```

- **name vazio**

```js
{
  "message": "O campo \"name\" é obrigatório"
}
```

- **name menor que 3 caracteres**

```js
{
  "message": "O \"name\" deve ter pelo menos 3 caracteres"
}
```

- **age vazio**

```js
{
  "message": "O campo \"age\" é obrigatório"
}
```

- **age menor de 18**

```js
{
  "message": "A pessoa palestrante deve ser maior de idade"
}
```

- **talk vazio**

```js
{
  "message": "O campo \"talk\" é obrigatório"
}
```
- **watchedAt vazio**

```js
{
  "message": "O campo \"watchedAt\" é obrigatório"
}
```

- **watchedAt inválido**

```js
{
  "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
}
```

- **rate vazio**

```js
{
  "message": "O campo \"rate\" é obrigatório"
}
```

- **rate menor que 1 ou maior que 5**

```js
{
  "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
}
```
</details>
</details>

### Exclui um palestrante

```http
  DELETE /talker/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do palestrante que você deseja excluir. |

<details>
  <summary>Clique para expandir</summary>
  <br>

- **Quando não é passado um token**

```js
{
  "message": "Token não encontrado"
}
```

- **Quando é passado um token é inválido**

```js
{
  "message": "Token inválido"
}
```

#### OBS: Caso a exclusão tenha dado certo, o `status 204` é retornado sem conteúdo.
</details>

### Retorna um palestrante por nome

```http
  GET /talker/search?q=searchTerm
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `searchTerm`      | `string` | **Obrigatório**. O nome do palestrante que você deseja buscar. |

<details>
  <summary>Clique para expandir</summary>
  <br>

- **Ao digitar na rota...**

```js
  /search?q=Da
```

#### Resposta esperada

```js
[
  {
    "id": 1,
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5,
    },
  }
]
```

- **Quando não é passado um token**

```js
{
  "message": "Token não encontrado"
}
```

- **Quando é passado um token é inválido**

```js
{
  "message": "Token inválido"
}
```
</details>

## Tecnologias e Ferramentas

<br>
<br>
<table width="320px" align="center">
  <tbody>
    <tr valign="top">
      <td width="80px" align="center">
        <span><strong>Docker</strong></span>
        <img height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" />
      </td>
      <td width="80px" align="center">
        <span><strong>Node.js</strong></span><br>
          <img height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
      </td>
      <td width="80px" align="center">
        <span><strong>Express</strong></span><br>
          <img height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
      </td>
    </tr>
  </tbody>
</table>


## Documentação

- [Docker](https://docs.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)


## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de jgustavomendonca@gmail.com
