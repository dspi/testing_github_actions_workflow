import { MongoClient, Db} from 'mongodb';

const uri = process.env["MONGO_URI"] || `mongodb://127.0.0.1:27017`;

let client: MongoClient | null = null;
let db: Db | null = null;

export const connectToDB = async (): Promise<Db> => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db();
        console.log(`Connected to database`);
    }
    return db!;
};

export const getDB = (): any => {
    if (!db) {
        throw new Error('Database not connected. Please call connectToDB() first.');
    }
    return db;
};

export const closeDB = async (): Promise<void> => {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log('Database connection closed.');
    }
};
