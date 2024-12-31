const { MongoClient } = require('mongodb');


const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"; 
const databaseName = 'APP_MONGODB_DATABASE';

async function createUsersCollection() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(databaseName);
        await db.createCollection("USERS", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["name", "createdAt", "isAdmin"],
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "Título do prompt, obrigatório e deve ser uma string"
                        },
                        isAdmin: {
                            bsonType: "bool",
                            description: "O usuário é administrador, obrigatório e deve ser um booleano"
                        },
                        createdAt: {
                            bsonType: "date",
                            description: "Data de criação do prompt, obrigatória e deve ser uma data válida"
                        },
                        isBanned: {
                            bsonType: "bool",
                            description: "O usuário está banido, opcional e deve ser um booleano"
                        }
                    }
                }
            }
        });

        console.log("Coleção 'USERS' criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar a coleção:", error);
    } finally {
        // Fecha a conexão com o MongoDB
        await client.close();
        console.log("Conexão com o MongoDB encerrada.");
    }
}


createUsersCollection();
