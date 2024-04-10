FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Installez les dépendances du projet
RUN npm install

# Copiez le reste des fichiers du projet dans le conteneur
COPY . .

# Exécutez l'application avec npm start
CMD ["npm", "start"]