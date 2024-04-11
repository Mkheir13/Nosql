# Étape 2: Génération de Fausses Données

Dans cette étape, nous allons générer de fausses données pour tester le Replica Set MongoDB.

### 1. Création d'un script pour générer des données

Créez un fichier nommé `fakedata.js` et ajoutez le contenu suivant.

```javascript
const{ faker } = require('@faker-js/faker');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://mongo:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('test');
        const users = database.collection('users');

        const userList = [];

        for (let i = 0; i < 100; i++) {
            const user = {
                name: faker.person.fullName(),
                age: faker.number.int({ min: 18, max: 99 }),
                email: faker.internet.email(),
                createdAt: faker.date.past()
            };

            userList.push(user);
        }

        await users.insertMany(userList);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
```

Dans ce script, nous avons utilisé le module `@faker-js/faker` pour générer des données aléatoires. Nous avons créé une collection `users` dans la base de données `test` et inséré 100 documents avec des données aléatoires.

### 2. Exécution du script grace a Dockerfile

Créez un fichier `Dockerfile` avec le contenu suivant.

```Dockerfile
FROM node:slim

WORKDIR /app/data/db
COPY fakedata.js .
COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm i
```


### 3. Exécution du script

Ouvrez un terminal et exécutez la commande suivante :

```bash
docker exec -it mongo1 mongo
```

Ensuite, exécutez la commande suivante pour exécuter le script.

```bash
node fakedata.js
```

```bash
use test
```

```bash
db.users.find()
```

Vous devriez voir les données générées dans la collection `users`.

---



