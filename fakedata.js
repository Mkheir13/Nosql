// Importation du module MongoClient de MongoDB et du module Faker.js pour générer des données fictives
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

// URI de connexion à la base de données MongoDB
const uri = "mongodb://mongo:27017";
// Création d'une nouvelle instance du client MongoClient
const client = new MongoClient(uri);

// Fonction pour insérer des utilisateurs fictifs dans la base de données
async function insertUsers() {
    try {
        // Connexion à la base de données
        await client.connect();
        // Sélection de la base de données
        const database = client.db('test');
        // Sélection de la collection 'users'
        const users = database.collection('users');

        // Liste pour stocker les utilisateurs générés
        const userList = [];

        // Génération de 100 utilisateurs fictifs
        for (let i = 0; i < 100; i++) {
            const user = {
                // Génération d'un nom aléatoire
                name: faker.person.fullName(),
                // Génération d'un âge aléatoire entre 18 et 99 ans
                age: faker.number.int({ min: 18, max: 99 }),
                // Génération d'une adresse email aléatoire
                email: faker.internet.email(),
                // Génération d'une date de création aléatoire dans le passé
                createdAt: faker.date.past()
            };

            // Ajout de l'utilisateur à la liste
            userList.push(user);
        }

        // Insertion de tous les utilisateurs dans la collection
        await users.insertMany(userList);
    } finally {
        // Fermeture de la connexion
        await client.close();
    }
}

// Fonction pour récupérer les utilisateurs de plus de 30 ans
async function getUsersOver30() {
    try {
        // Connexion à la base de données
        await client.connect();
        // Sélection de la base de données
        const database = client.db('test');
        // Sélection de la collection 'users'
        const users = database.collection('users');

        // Définition de la requête pour récupérer les utilisateurs de plus de 30 ans
        const query = { age: { $gt: 30 } };
        // Récupération des utilisateurs correspondant à la requête
        const userList = await users.find(query).toArray();

        // Affichage des utilisateurs récupérés
        console.log(userList);
    } finally {
        // Fermeture de la connexion
        await client.close();
    }
}

// Fonction pour mettre à jour l'âge de tous les utilisateurs
async function updateUserAge() {
    try {
        // Connexion à la base de données
        await client.connect();
        // Sélection de la base de données
        const database = client.db('test');
        // Sélection de la collection 'users'
        const users = database.collection('users');

        // Définition du document de mise à jour
        const updateDoc = {
            $inc: {
                // Incrémentation de l'âge de tous les utilisateurs de 5 ans
                age: 5,
            },
        };

        // Mise à jour de tous les utilisateurs
        await users.updateMany({}, updateDoc);
    } finally {
        // Fermeture de la connexion
        await client.close();
    }
}

// Fonction pour supprimer les utilisateurs de moins de 25 ans
async function deleteUser() {
    try {
        // Connexion à la base de données
        await client.connect();
        // Sélection de la base de données
        const database = client.db('test');
        // Sélection de la collection 'users'
        const users = database.collection('users');

        // Définition de la requête pour supprimer les utilisateurs de moins de 25 ans
        const query = { age: { $lt: 25 } };

        // Suppression des utilisateurs correspondant à la requête
        await users.deleteMany(query);
    } finally {
        // Fermeture de la connexion
        await client.close();
    }
}

// Exécution des fonctions
insertUsers();
getUsersOver30();
updateUserAge();
deleteUser();
