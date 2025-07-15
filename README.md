<h1 align="center">🐾 PetGuard – Monitoramento Inteligente de Pets</h1>

<div align="justify">PetGuard é uma aplicação inovadora que integra sistemas embarcados, Internet das Coisas (IoT) e uma interface web moderna para oferecer monitoramento completo e em tempo real do seu animal de estimação.

A solução é composta por um dispositivo embarcado conectado à coleira do pet, equipado com GPS e módulo Wi-Fi (ESP32/ESP8266), capaz de transmitir continuamente a localização do animal para o servidor. Os dados são exibidos em um mapa interativo na aplicação web, permitindo que o tutor acompanhe, em tempo real, onde seu pet está.

Além da geolocalização, o sistema conta com um dispenser automático de ração, controlado remotamente pela plataforma. O tutor pode programar horários ou liberar comida manualmente, garantindo a nutrição adequada mesmo à distância.

A interface do site também oferece funcionalidades complementares para o cuidado do pet, incluindo:

- 📅 Tabela de Vacinação: com lembretes de datas e registros de vacinas aplicadas.

- 🧼 Guia de Higiene: com checklists e alertas de banho, tosa e limpeza dos utensílios.

- ❤️ Controle de Cuidados Gerais: como administração de medicamentos, visitas ao veterinário e acompanhamento de peso.</div>

<h2 align="center">Tecnologias utilizadas!</h2>
<div align="center">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="logo=typescript">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="logo=css3"/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="logo=react">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="logo=tailwind-css">
</div>

## Iniciando projeto

A criação do projeto [Next.js](https://nextjs.org) ocorreu da seguinte forma:

### Instalação do Node
Instale o NodeJs para usar as dependências corretamente. Acesse o site https://nodejs.org/

### Editor de código

Escolha um editor de código de sua preferência. Algumas opções populares incluem o Visual Studio Code, Sublime Text, Atom, entre outros. Você pode baixar e instalar o Visual Studio Code em https://code.visualstudio.com/.

### Criação do projeto

Para criar um projeto NextJs, execute o seguinte comando no terminal

~~~
    npx create-next-app@latest
~~~

E, em seguida, entre na pasta do projeto com 

~~~
    cd nome-do-projeto
~~~

## Executando o Projeto ⏳

Para executar o projeto, realize as seguintes etapas:

### Clone do repositório

- Verifique se o git está instalado na sua máquina
- Digite o comando via terminal

~~~
git clone https://github.com/prsousa8/petguard.git
~~~

E entre na pasta do projeto usando 

~~~
cd petguard
~~~


E instale todas as dependências de uma única vez com:
~~~
npm install
~~~

### Migrations do Prisma

Utilize o comando abaixo via terminal para gerar as migrations:
~~~
npx prisma migrate dev
~~~

### Migrations do Prisma

Utilize o comando abaixo via terminal para gerar o cliente Prisma:
~~~
npx prisma generate
~~~

### Execução

Utilize o comando abaixo via terminal para executar o código:
~~~
npm run dev
~~~


Abra [http://localhost:3000](http://localhost:3000) com o navegador para ver o resultado.
