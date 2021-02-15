[![Maintainability](https://api.codeclimate.com/v1/badges/f8c7a14cc1ab305f54f8/maintainability)](https://codeclimate.com/github/rcdevgames/BaseQL/maintainability)
# Base Project - Nodejs GraphQL Server - PostgreSQL

## Features
- ___async___ functions
- Eslint - Airbnb
- [Helmet](https://github.com/helmetjs/helmet) and [Rate limit](https://github.com/nfriedly/express-rate-limit) middlewares

## Databases

1. PostgreSQL

## Getting Started

```bash
# Clone repository as AwesomeProject
git@github.com:rcdevgames/BaseQL.git nameProject

# Change directory
cd nameProject

## Follow commands based on your package manager

# Install yarn dependencies 
yarn

# Create and configure a .env file in the root directory

## Workflow:

# Developement
yarn dev

# Production
yarn start

# Docker compose
docker-compose up
```

<details>
<summary>GraphQL Playground Queries & Mutations</summary>

## Mutations

Initialize
```
mutation {
  initialize(
    data: {
      code: "T12345",
      imei: "q1w2w3e3r4r4t5t5y6y6y6u7u7i8i"
    }
  ) {
    token,
    user {
      code, 
      imei
    }
  }
}
```

##  Queries

Get User
```
query {
  user(
    userId: "1"
  ) {
    user
  }
}

#HTTP HEADERS
{
  "Authorization": "Bearer __TOKEN__"
}
```

Get All Todos
```
query {
  users {
    user
  }
}

#HTTP HEADERS
{
  "Authorization": "Bearer __TOKEN__"
}
```
</details>