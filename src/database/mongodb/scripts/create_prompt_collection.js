const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"; 
const databaseName = 'APP_MONGODB_DATABASE';

async function createPromptsCollection() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(databaseName);
        await db.createCollection("PROMPTS", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["name", "content", "createdBy", "createdAt"],
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "Título do prompt, obrigatório e deve ser uma string"
                        },
                        content: {
                            bsonType: "string",
                            description: "Conteúdo do prompt, obrigatório e deve ser uma string"
                        },
                        createdBy: {
                            bsonType: "objectId",
                            description: "Referência ao usuário que criou o prompt, obrigatório e deve ser um ObjectId"
                        },
                        createdAt: {
                            bsonType: "date",
                            description: "Data de criação do prompt, obrigatória e deve ser uma data válida"
                        },
                        updatedAt: {
                            bsonType: "date",
                            description: "Data de atualização do prompt, opcional e deve ser uma data válida"
                        }
                    }
                }
            }
        });

        console.log("Coleção 'PROMPTS' criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar a coleção:", error);
    } finally {
        // Fecha a conexão com o MongoDB
        await client.close();
        console.log("Conexão com o MongoDB encerrada.");
    }
}

createPromptsCollection();
