# Project ReactJs App

Projeto ReactApp + Dockerfile

## Pre-requisitos

Assumo que as seguintes dependências estão instaladas e funcionando:

 - [Docker 19.03.13](http://www.docker.io/gettingstarted/#h_installation)
 
Em caso de erro tente instalar também:

 - [Node 14.13.1 + NPM 6.14.8](https://nodejs.org/en/download/current/)
 - [react-scripts 3.4.3](https://www.npmjs.com/package/react-scripts)
 
## Build + Exec + Kill

### Passos para construção da imagem Docker:
##### (Opção 1) Github:

1.  Clone o repositório:

        git clone https://github.com/itsgnegrao/ProjectReact.git

2.  Construa a imagem:

        cd ProjectReact
        docker build -t itsgnegrao/itsgnegrao-react-app .
        
    Este comando deve levar algum tempo, tome uma xícara de café ...
    
##### (Opção 2) Docker Hub:

1.  Clone a imagem previamente contruída:

        docker pull itsgnegrao/itsgnegrao-react-app

    Este comando deve levar algum tempo, tome uma xícara de café ...
    
#### Passos para execução da imagem Docker:
1.  Execute a imagem:

        docker run -d -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --name react-app itsgnegrao/itsgnegrao-react-app:latest

2.  Acesse o endereço do APP:

        http://localhost:3000/
        
#### Excerrar a execução:
1.  Execute o comando:
        
    docker kill react-app
