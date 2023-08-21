# init-project-tools

Este proyecto es una plantilla de inicio para un proyecto con Typescript

## Instalación

```sh
git init
git branch -m main #Ubicar la rama
git remote add origin https://github.com/paulgualambo/typescript-tool.git
git config core.sparseCheckout true
vim .git/info/sparse-checkout
echo "Vagrant/" >> .git/info/sparse-checkout
echo "start-typescript" >> .git/info/sparse-checkout
```

### Install libraries

```sh
# Install nvm
#https://github.com/nvm-sh/nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
#bash: source ~/.bashrc
#zsh: source ~/.zshrc
#ksh: . ~/.profile

nvm --version
nvm ls-remote
nvm ls
nvm run node --version
nvm install --lts
nvm install-latest-npm
nvm cache clear

# create .nvmrc
# echo "lts/*" > .nvmrc # to default to the latest LTS version

npm install npm@latest -g
node -v
npm -v

# Create directory 
mkdir name-project
mkdir -p app/src app/deploy app/tests
cd app
npm init -y

# Install typescript
# Install TS globally on my machine
npm i -D typescript@latest
npm i -D @types/node ts-node@latest
# Check version
tsc -v

# Jest
npm i -D jest@latest @types/jest@latest ts-jest@latest

# Prettier
npm i -D prettier@latest

# Eslint
npm i -D eslint@latest eslint-config-prettier@latest eslint-plugin-prettier@latest
npm i -D husky@latest

npm i -D rimraf@latest
npm i -D nodemon@latest
npm i -D run-script-os@latest

npm i dotenv@latest
npm i axios@latest

# Create tsconfig.json file
tsc --init

# Change the lines 
# "rootDir": "./src",
# "outDir": "./dist",
# strict mode true
```

### Setup VSCODE

Linter
EditorConfig
Prettier
Debug
Debug Docker
Jest
Jest Docker

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.

## Referencias

### Setup virtual machine

[Vagrant]<https://github.com/paulgualambo/env-tools/tree/main/vagrant/getstart>

[Vscode]

[README.md]

[CHANGELOG.md]
