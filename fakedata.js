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