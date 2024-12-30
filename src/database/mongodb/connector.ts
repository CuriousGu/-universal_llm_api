import { 
    MongoClient, Db, Collection, 
    Filter, Document, UpdateFilter, 
    WithId, OptionalUnlessRequiredId 
} from 'mongodb';


export class MongoDBConnector {
    private client: MongoClient;
    private db: Db | null = null;
    private uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017';

    constructor() {
        this.client = new MongoClient(this.uri);
    }

    async connect(dbName: string): Promise<void> {
        try {
            await this.client.connect();
            this.db = this.client.db(dbName);
        } catch (error) {
            throw error;
        }
    }

    async close(): Promise<void> {
        try {
            await this.client.close();
        } catch (error) {
            throw error;
        }
    }

    private getCollection<T extends Document>(
        collectionName: string
    ): Collection<T> {
        if (!this.db) {
            throw new Error('Database connection not established. Call connect() first.');
        }
        return this.db.collection<T>(collectionName);
    }

    async insertOne<T extends Document>(
        collectionName: string, 
        document: OptionalUnlessRequiredId<T>
    ): Promise<void> {
        try {
            const collection = this.getCollection<T>(collectionName);
            await collection.insertOne(document);
            console.log('Document inserted successfully');
        } catch (error) {
            console.error('Error inserting document:', error);
            throw error;
        }
    }

    async find<T extends Document>(
        collectionName: string, 
        filter: Filter<T>
    ): Promise<Array<WithId<T>>> {
        try {
            const collection = this.getCollection<T>(collectionName);
            return await collection.find(filter).toArray();
        } catch (error) {
            console.error('Error finding documents:', error);
            throw error;
        }
    }

    async updateOne<T extends Document>(
        collectionName: string,
        filter: Filter<T>,
        update: UpdateFilter<T>
    ): Promise<void> {
        try {
            const collection = this.getCollection<T>(collectionName);
            await collection.updateOne(filter, update);
            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);
            throw error;
        }
    }

    async deleteOne<T extends Document>(
        collectionName: string, 
        filter: Filter<T>
    ): Promise<void> {
        try {
            const collection = this.getCollection<T>(collectionName);
            await collection.deleteOne(filter);
            console.log('Document deleted successfully');
        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    }
}