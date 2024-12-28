import { MongoClient, MongoClientOptions } from 'mongodb';

// Define the MongoDB URI and options
const uri: string | undefined = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

// Create a new MongoClient
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client instance
  if (!(global as any).mongoClient) {
    client = new MongoClient(uri, options);
    (global as any).mongoClient = client;
  } else {
    client = (global as any).mongoClient;
  }
  clientPromise = client.connect();
} else {
  // In production mode, create a new client instance each time
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
