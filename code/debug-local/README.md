# DEBUG

Ejecucion en local script
-- env
    DOTENV_CONFIG_PATH=.env npx ts-node -r dotenv/config --project execute/tsconfig.json execute/local.ts
    DOTENV_CONFIG_PATH=.env npx ts-node -r dotenv/config --project execute/tsconfig.json execute/exec-by-port.ts
    
    node --inspect=0.0.0.0:9229 -r ts-node/register -r dotenv/config execute/exec-by-port.ts --project execute/tsconfig.json


Debuggin en local
    aplicacion jest

Unit Test command
    npm run test

Unit Test debug
     aplicacion jest

Docker ejecucion run script
    cd app
    MY_IMAGE_NAME=debug-basic-run docker compose -p debug-basic -f ./execute/docker/run/docker-compose.yml up --build

Debugging Docker ejecucion script
    MY_IMAGE_NAME=debug-basic-debug docker compose -p debug-basic -f ./execute/docker/debug/docker-compose.yml up --build
    se activa el debug vscode
    se invoca a 
    http://localhost:3000/

Unit Test docker

Unit Test docker debug

## problemas para nvm

sudo ln -s "$(which node)" /usr/bin/node
