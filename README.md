# This code is forked from [here](https://github.com/l0609890/pern-todo-app)

There is an associated tutorial [here](https://www.youtube.com/watch?v=ldYcgPKEZC8) if you need a quick refresher.

Use your fork of this to experiment and follow along with WDD03 videos.
We will Dockerize, swaggerize, authenticate, and deploy this app, and you can use this as inspiration when you come to work on your group project.

<img src="https://www.freecodecamp.org/news/content/images/size/w2000/2020/03/PERN.png" />

## Run PostgreSQL

Start a PostgreSQL container to get your database running:

```zsh
docker run -d \
  --name pern-todo-db \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=password \
  -v pern-todo-db:/var/lib/postgresql/data \
  -d \
  postgres
```
