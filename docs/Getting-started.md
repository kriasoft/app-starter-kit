# App Starter Kit - ASK

ASK is a merger of two projects: [React Starter Kit](https://github.com/kriasoft/react-starter-kit) & [Node.js API Starter Kit](https://github.com/kriasoft/nodejs-api-starter).

It's suggested to get to know both projects before starting with this.

A basic knowledge of Docker, Docker-compose and Docker volumes are a great asset when working with ASK.

## Requirements

### Hardware requirements

- An internet connection
- At least 420MB storage with on a major OS such as Linux or Windows

- If you have RAM issues while installing the project, a [Swap file](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04) at 2GB fixes that.

### Software requirements

- [Node.js](https://nodejs.org/en/) v6.11 or higher
- [Yarn](https://yarnpkg.com/en/) v1.2.1 or higher
- [Docker CE](https://docs.docker.com/engine/installation/) v17 or higher **with** Docker-compose
- Text editor such as _but not limited to_ [VS Code](https://code.visualstudio.com/)(preferred), [Atom](https://atom.io/) and [WebStorm](https://www.jetbrains.com/webstorm/).

#### Not required but really useful

Recommended and useful plugins for VS Code:

- ESLint
- Prettier
- Flow
- Project Snippets
- Docker

___

## Instructions

### Getting started

1. Clone [App Starter Kit](https://github.com/kriasoft/app-starter-kit.git)
1. Run `cd ./web && yarn install && yarn build --release && cd ..`
1. Run `docker-compose up` in project root

When the images are built and running, two urls should become available:

- Web: [http://localhost:3000/](http://localhost:3000/)
- API: [http://localhost:8080/graphql](http://localhost:8080/graphql)

___

### Commands

#### Docker

- `docker image ps`
- `docker-compose images`

#### Git

Keeping up to date

```bash
git remote add app-starter-kit https://github.com/kriasoft/app-starter-kit.git
git checkout master
git fetch app-starter-kit
git merge app-starter-kit/master
```

## Important files

> **The following locations assumes your working directory is at the root of ASK**

### Configuration, Environment variables & Back-end

- API configuration help: `api/tools/README.md`
- Web configuration help: `web/tools/README.md`

- Dockerfiles:
  - Main: `docker-compose.yml`
  - Web: `web/Dockerfile`
  - API: `/api/Dockerfile.dev` or `/api/Dockerfile`
- API environment variables: `api/.env`

### Front-end

- Global HTML configuration: `web/src/components/Html.js`
- Express app and middleware: `web/src/server.js`
- Client history, routing and runtime HTML tags: `web/src/client.js`

### Data layer

- `api/src/app.js`
