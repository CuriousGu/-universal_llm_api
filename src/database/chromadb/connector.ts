import { ChromaClient, Collection, AddRecordsParams, DeleteParams } from "chromadb";
import { embeddingFunction } from "../../services/embeddings";


// If needed, you add more methods to this class
export class ChromaDBClient {
    uri: string = process.env.CHROMADB_URI || 'http://localhost:8000';
    client: ChromaClient;

    constructor() {
        this.client = new ChromaClient({ "path": this.uri });
    }

    async checkConnection(): Promise<number> {
        try {
            const heartbeat = await this.client.heartbeat();
            return heartbeat; 
        }
        catch (error) {
            throw new Error('Cant connect to ChromaDB');
        }
    }

    async getCollection(collectionName: string): Promise<Collection> { 
        const collection = await this.client.getCollection({
            name: collectionName,
            embeddingFunction: embeddingFunction, 
        });

        return collection;
    }

    async insertOne<T>(
        collectionName: string, 
        document: AddRecordsParams
    ): Promise<void> {
        try {
            const collection = await this.getCollection(collectionName);
            await collection.add(document);
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(
        collectionName: string, 
        params?: DeleteParams
    ): Promise<void> {
        try {
            const collection = await this.getCollection(collectionName);
            await collection.delete(params);
        } catch (error) {
            throw error;
        }
    }

};