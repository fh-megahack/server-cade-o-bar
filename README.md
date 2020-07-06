<h1 align="center">
    <img alt="CadêOBar?" title="#Cadê o Bar?" src="https://avatars2.githubusercontent.com/u/67425116?s=400&u=652083b6f4d46b59d93c8d11ceb0415d25cd415b&v=4" width="200px" />
</h1>


<p align="center">
  <a href="#-o-projeto">PROJETO</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-usando">INSTALAÇÃO</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias-usadas">TECNOLOGIAS</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#o-time">TIME</a>
</p>


## O PROJETO

No "Cadê o Bar?"  você descobre os melhores estabelecimentos perto da sua localização, visualiza as avaliações, garante pontos fazendo check-in, check-out e avaliando o local além de poder concorrer a brindes e descontos na hora para utilizar no bar com seus amigos! Legal, né?
E se gostar do bar, ainda pode deixar ele como favorito para acompanhar as ofertas e desconto!
Para a AMBEV, uma oportunidade de direcionar uma experiência única de acordo com o perfil de cada usuário!

🔗 [APRESENTAÇÃO EM SLIDES](https://github.com/fh-megahack/server-cade-o-bar/blob/master/public/Apresenta%C3%A7%C3%A3o%20-Cad%C3%AA%20o%20bar.pdf)


## USANDO
### Requisitos para rodar o projeto
- NodeJS >12.x.x

### TECNOLOGIAS USADAS

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [KnexJS](http://knexjs.org/#changelog)

### Instalação
- Baixe este repositório;

- Abra-o no terminal na pasta do projeto

- Rode o comando abaixo e aguarde a instalação
```
npm install
```
- Para subir o servidor local
```
npm run dev
```

O servidor irá rodar na porta `3333` 

### Rodando com o Expo

- Para rodar com o Expo é preciso verificar a Url de conexão que o expo gera ao ser executado 
<img src="./public/Screen%20Shot%202020-07-05%20at%2022.24.34.png" width="400px" />

- Rodar o comando
```
URL_PATH=http://192.168.1.113:3333 npm run dev
```

- Agora todos os serviços e API's estarão disponíveis no Expo

- ##### Link: da Aplicação Mobile: [Ir para o repositório do Github](https://github.com/fh-megahack/cade-o-bar-mobile)

### API's

#### UserAPI
- Criar um usuário
  - Método `POST`
  - URL `/users`
  - Body
  ```
  {
    "name": "NomeDoUsuario",
    "email": "email@email.com"
    "password": "senha123",
    "whatsapp": "1199998888",
    "uf": "SP",
    "city": "São Paulo",
    "image": "avatar.png"
    }
  ```
  
- Ler todos os Usuários
    - Método `GET`
    - URL `/users`
    
- Ler dados de um Usuário pelo ID
    - Método `GET`
    - URL `/users/:userId`
    
- Ler dados de um Usuário pelo ID
    - Método `GET`
    - URL `/users/:userId`

- Deletar um Usuário pelo ID
    - Método `DELETE`
    - URL `/users/:userId`
    
- Fazer Login
  - Método `POST`
  - URL `/users`
  - Body
  ```
  {
    "email": "email@email.com"
    "password": "senha123",
    }
  ```
  
  
#### BarAPI
- Criar um Bar
  - Método `POST`
  - URL `/bars`
  - Body
  ```
  {
    "name": "Bar da teste",
    "email": "contato@bardateste.com",
    "latitude": -23.5534688,
    "longitude": -46.6925377,
    "street": "Rua",
    "address_number": 680,
    "neighborhood": "Teste",
    "city": "São Paulo",
    "uf": "SP",
    "website": "www.sitedobar.com.br",
    "url_image": "image.jpeg",
    "phone": 1133331111
    }
  ```
  
- Ler todos os Bares
    - Método `GET`
    - URL `/bars`
    
- Ler dados de um Bar pelo ID
    - Método `GET`
    - URL `/users/:userId`
    
- Ler dados de um Bar pelo ID
    - Método `GET`
    - URL `/bars/:userId`

- Deletar um Bar pelo ID
    - Método `DELETE`
    - URL `/bars/:userId`
    
    
#### RatingAPI
- Criar uma Avaliação
  - Método `POST`
  - URL `/rating`
  - Body
  ```
  {
      "bar_id": barId,
      "user_id": userId,
      "rating": 5,
      "comment": "Algum Comentário!"
    }
  ```
  
- Ler todos as Avaliações
    - Método `GET`
    - URL `/rating`
    
- Ler dados de Avaliação de um Bar pelo ID do Bar
    - Método `GET`
    - URL `/rating/:barId`

- Deletar uma Avaliação pelo ID
    - Método `DELETE`
    - URL `/bars/:userId`
    
    
#### ProductAPI
- Criar uma Produto Destaque para um Bar
  - Método `POST`
  - URL `/product`
  - Body
  ```
  {
        "bar_id": barId,
        "name": "Jack Daniels",
        "image": "product-jack.png"
    }
  ```
  
- Ler todos os Produtos
    - Método `GET`
    - URL `/product`
    
- Ler dados todos os Produtos de um Bar pelo ID do Bar
    - Método `GET`
    - URL `/product/:barId`

- Deletar um Produto pelo ID
    - Método `DELETE`
    - URL `/bars/:userId`
    
    
#### DiscoveryAPI
- Criar uma Descoberta
  - Método `POST`
  - URL `/discovery`
  - Body
  ```
  {
      "user_id": userId,
      "bar_id": barId
    }
  ```
  
- Ler todas as Descobertas
    - Método `GET`
    - URL `/discovery`
    
- Ler todas as Descobertas de um Bar pelo ID do Bar
    - Método `GET`
    - URL `/discovery/:barId`

- Ler todas as Descobertas de um Usuário pelo ID do User
    - Método `GET`
    - URL `/discovery/:userId`
    
- Deletar uma Descoberta pelo ID
    - Método `DELETE`
    - URL `/discovery/:userId`


#### FavoriteAPI
- Criar um Favorito
  - Método `POST`
  - URL `/discovery`
  - Body
  ```
  {
      "user_id": userId,
      "bar_id": barId
    }
  ```
  
- Ler todos os Favoritos
    - Método `GET`
    - URL `/discovery`

- Ler todos os Favoritos de um Usuário pelo ID do User
    - Método `GET`
    - URL `/discovery/:userId`
    
- Deletar um Favorito pelo ID
    - Método `DELETE`
    - URL `/discovery/:userId`


#### PointsAPI
- Criar dados de Pontuação para um Usuário
  - Método `POST`
  - URL `/points`
  - Body
  ```
  {
      "user_id": userId,
      "total_points": 1640,
      "rescue_points": 1200
    }
  ```
  
- Atualizar os Dados de Pontos de um Usuário
    - Método `PUT`
    - URL `/points`
    - Body
  ```
  {
      "user_id": userId,
      "total_points": 1640,
      "rescue_points": 1200
    }
  ```
    
- Ler todos os Dados de Pontos de Usuários
    - Método `GET`
    - URL `/points`

- Ler os Pontos de um Usuário pelo ID do User
    - Método `GET`
    - URL `/points/:userId`
    
- Deletar dados de Pontos de um Usuário pelo ID
    - Método `DELETE`
    - URL `/points/:id`


# O TIME
  
| [<img src="https://media-exp1.licdn.com/dms/image/C4E03AQHImSDKRUifEA/profile-displayphoto-shrink_200_200/0?e=1599696000&v=beta&t=W4Ev7iiqp3T0Na8bFRjrcpnZUVHKjR4Xn9lGUypC7Z4" width="100px;" /><br /><sub><b>Pedro Augusto</b></sub>](https://www.linkedin.com/in/pedro-augusto-ribeiro-marques-47522119a/)<br /> | [<img src="https://avatars3.githubusercontent.com/u/39490440?s=460&u=ccf9446db9a1a8062b17bac56547f331109e9372&v=4" width="100px;"/><br /><sub><b>Andre Fuzi</b></sub>](https://www.linkedin.com/in/andre-fuziyama/)<br /> | [<img src="https://avatars3.githubusercontent.com/u/56003521?s=460&v=4" width="100px;"/><br /><sub><b>Matheus Henrique</b></sub>](https://github.com/MatheusHG)<br /> | [<img src="https://media-exp1.licdn.com/dms/image/C5603AQEDLc8JszvmyA/profile-displayphoto-shrink_200_200/0?e=1599696000&v=beta&t=6VAJLtoLDyOBxvQSYCT4njG4c1IeatQR4Uo8H4ztCqI" width="100px;"/><br /><sub><b>Izzy Freire</b></sub>](https://www.linkedin.com/in/izzyfreire/)<br> | [<img src="https://media-exp1.licdn.com/dms/image/C4D03AQHTUOndHBPo2A/profile-displayphoto-shrink_200_200/0?e=1599696000&v=beta&t=1v2eVNdHVkYj8kuBkHDfX8S-YRhpazCJkwm4fBz-v-Y" width="100px;"/><br /><sub><b>Anna Beatriz</b></sub>](https://www.linkedin.com/in/anna-beatriz-telmo-9794a21b1/)<br /> |
| :---: | :---: | :---: | :---: | :---: |
