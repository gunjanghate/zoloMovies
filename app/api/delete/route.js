import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// Connection URI
const uri ="mongodb+srv://ghategunjan:gg1234@cluster0.uz6sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Global client and promise to maintain the connection pool
let cachedClient = null;
let cachedClientPromise = null;

// Function to connect to the MongoDB
async function connectToDatabase() {
  if (!cachedClientPromise) {
    const client = new MongoClient(uri);
    cachedClientPromise = client.connect();
    cachedClient = client;
  }
  return cachedClientPromise;
}

export async function DELETE(request) {
  try {
    // Parse the product ID from the request
    const { id } = await request.json(); // make sure id is being passed correctly

    // Ensure MongoDB client connection is established
    const client = await connectToDatabase();

    // Access the database and collection
    const database = client.db('zoloMovies');
    const inventory = database.collection('posts');

    // Delete the product by ID
    const result = await inventory.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { _id, name, genre, year } = req.body;
    try {
      const client = await connectToDatabase();
      const db = client.db("your_database_name");
      const collection = db.collection("movies");

      const updatedMovie = await collection.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: { name, genre, year } },
        { returnDocument: 'after' }
      );

      if (!updatedMovie.value) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      res.status(200).json({ success: true, movie: updatedMovie.value });
    } catch (error) {
      console.error('Database update error:', error); 
      res.status(500).json({ success: false, message: 'Failed to update movie', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
