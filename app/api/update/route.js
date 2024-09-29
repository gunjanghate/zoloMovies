import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://ghategunjan:gg1234@cluster0.uz6sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let cachedClient = null;
let cachedClientPromise = null;

async function connectToDatabase() {
  if (!cachedClientPromise) {
    const client = new MongoClient(uri);
    cachedClientPromise = client.connect();
    cachedClient = client;
  }
  return cachedClientPromise;
}

export default async function handler(req, res) {
    if (req.method === 'PUT') {
      // Handle the update logic
      try {
        const { id, updatedData } = req.body;
  
        // Perform the update (e.g., update the stock in the database)
        // ...
  
        return res.status(200).json({ message: 'Update successful' });
      } catch (error) {
        return res.status(500).json({ message: 'Update failed' });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  
