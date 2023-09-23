# Rating Movies

The goal of the project is to learn about Nodejs And SQL.
## Apprenticeship

- API;
- Node.js;
- v8 Engine;
- Express;
- Routes and Methods HTTP;
- Nodemon;
- Imsomnia;
- Controllers;
- Middlewares;
- Http Codes;
- Exception handling;
- SQL;
- SGBD;
- DML commands;
- DDL commands;
- Migrations;
- Bcrypt;
- Knex;
- NPM;
- NPX;
- Cardinality;
- Sqlite;





## 🔗 Contact
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafael-carvalho-f%C3%BCllenbach-9b25a6148/)



## 🛠 Skills
Nodejs, Javascript, Express, SQL

## Installation

First step is to install all necessary dependencies :

```bash
  npm install
```

Now route the command to create all database tables :

```bash
  npm run migrate
```

Now just start the API :

```bash
  npm start
```
## API documentation

- The purpose of this api is to create film notes containing the description, title, a note for that film and a tag that is the style of the film, such as action, adventure, etc..
- I recommend using a DBMS to monitor the creation of data, I recommend beekeeper but it is not mandatory;
- If you install beekeeper, it is very easy to use, just choose the sqlite option and then navigate to the src/database/database.db file;
- You will need a tool for API testing and debugging, I recommend imsomnia;

### Users route

#### post method
```http
  POST /localhost:3333/users

 {
	"name": "Your name",
	"email": "Your email",
	"password": "Your password"
  }
```

#### update method

- insert the user id you want to change in the parameter;

```http
  PUT /localhost:3333/users/user_id

 {
	"name": "Your new name",
	"email": "Your new email",
	"password": "Your new password",
   "old_password": "Your old password"
  }
```

### Movie notes route

#### post method

- insert in the parameter the id of the user who wants to create a note
- in rating specify a number from 1 to 5;

```http
  POST /localhost:3333/movie_notes/user_id

{
	"title": "Movie title",
	"description": "Movie description",
	"rating": 5,
	"tags": ["Tag1", "Tag2"]
}
```

#### show method

- insert in the parameter the id of the user who wants to see the notes;

```http
  GET /localhost:3333/movie_notes/user_id
```

#### delete method

- Enter the ID of the note you want to delete

```http
  DELETE /localhost:3333/movie_notes/note_id
```

#### index method

- We have 3 query parameters that we can pass;
- the user_id parameter which is the notes of which user you want to see;
- the title parameter you can write the title of the movie or something similar to the name the title of the movie;
- and the tags parameter that you can filter by the movie tag, and you can enter more than one by separating with a comma;

```http
  GET /localhost:3333/movie_notes
```

### Movie tags route

#### index method

- insert in the user_id parameter you want to see the tags;

```http
  GET /localhost:3333/movie_tags/user_id
```



## API demo

https://github.com/RafaFullenbach/rating_movies/assets/63618616/a4c57aaa-0681-40cf-a806-31f1dbc4cfae

