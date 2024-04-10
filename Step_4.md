# Étape 4: Automatisation avec le Langage de Programmation de votre Choix

Pour cette étape, nous allons automatiser les étapes précédentes en utilisant le langage de programmation de notre choix (ici, nous utiliserons JavaScript).

### 1. Création d'un script pour automatiser les étapes précédentes

Dans notre fichier fakeData.js, nous avons déjà créé un script pour générer des données aléatoires. Nous allons maintenant ajouter des fonctions pour effectuer les manipulations de base via la CLI MongoDB.

```javascript
const { MongoClient } = require('mongodb');

const uri = "mongodb://mongo:27017";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

async function findUsers() {
    const database = client.db('test');
    const users = database.collection('users');

    const result = await users.find({ age: { $gt: 30 } }).toArray();
    console.log("Users over 30:", result);
}

async function updateUsers() {
    const database = client.db('test');
    const users = database.collection('users');

    const result = await users.updateMany({}, { $inc: { age: 5 } });
    console.log("Users updated:", result.modifiedCount);
}

async function deleteUsers() {
    const database = client.db('test');
    const users = database.collection('users');

    const result = await users.deleteOne({ name: "Evelyn Rolfson" });
    console.log("User deleted:", result.deletedCount);
}

async function run() {
    await connect();
    await findUsers();
    await updateUsers();
    await deleteUsers();
    await client.close();
}

run().catch(console.error);
```

### 2. Exécution du script

Pour exécuter le script, nous devons d'abord installer le pilote MongoDB pour Node.js.

```bash
npm install mongodb
```

Ensuite, nous pouvons exécuter le script en utilisant la commande suivante.

```bash
node fakeData.js
```

Vous devriez voir les résultats des manipulations de base via la CLI MongoDB.

---

## Les différences notables rencontrées entre les deux approches

Dans l'approche précédente, nous avons utilisé la CLI MongoDB pour effectuer les manipulations de base. Dans cette approche, nous avons automatisé ces manipulations en utilisant un script JavaScript.

Les avantages de cette approche sont les suivants :

- **Automatisation** : Les manipulations de base peuvent être automatisées en utilisant un script, ce qui permet d'économiser du temps et d'éviter les erreurs humaines.
- **Personnalisation** : Vous pouvez personnaliser les manipulations en fonction de vos besoins en modifiant le script.
- **Réutilisabilité** : Vous pouvez réutiliser le script pour effectuer les mêmes manipulations sur différentes bases de données MongoDB.
- **Extensibilité** : Vous pouvez étendre le script pour effectuer des manipulations plus complexes ou pour intégrer d'autres fonctionnalités.
- **Facilité de maintenance** : Le script est plus facile à maintenir que les commandes manuelles via la CLI MongoDB.
- **Portabilité** : Le script peut être exécuté sur n'importe quelle machine avec Node.js et le pilote MongoDB installés.
- **Documentation** : Le script peut servir de documentation pour les manipulations effectuées.
- **Collaboration** : Le script peut être partagé avec d'autres membres de l'équipe pour faciliter la collaboration.

Les inconvénients de cette approche sont les suivants :

- **Complexité** : La création et la maintenance du script peuvent être plus complexes que l'utilisation de la CLI MongoDB.
- **Apprentissage** : Vous devez connaître le langage de programmation utilisé pour écrire le script.
- **Dépendances** : Vous devez installer les dépendances nécessaires pour exécuter le script.
- **Développement** : Vous devez développer et tester le script avant de l'utiliser en production.
- **Sécurité** : Vous devez prendre des mesures pour sécuriser le script et les données qu'il manipule.
- **Performance** : Le script peut être moins performant que les commandes manuelles via la CLI MongoDB en fonction de la complexité des manipulations.
- **Maintenance** : Vous devez mettre à jour le script en cas de changements dans la structure de la base de données ou des données.

En conclusion, l'automatisation des manipulations de base via un script offre de nombreux avantages, mais elle nécessite également des efforts supplémentaires en termes de développement, de maintenance et de sécurité. Il est important de peser les avantages et les inconvénients de chaque approche pour choisir celle qui convient le mieux à vos besoins et contraintes.

