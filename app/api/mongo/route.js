import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB connection string
const uri = "mongodb+srv://ghategunjan:gg1234@cluster0.uz6sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Cached client and promise for reuse
let cachedClient = null;
let cachedClientPromise = null;

// Function to connect to MongoDB and cache the connection
async function connectToDatabase() {
  if (!cachedClientPromise) {
    const client = new MongoClient(uri);
    cachedClientPromise = client.connect();
    cachedClient = client;
  }
  return cachedClientPromise;
}

// GET method to fetch the movie 'Back to the Future'
export async function GET(request) {
  try {
    // Ensure connection to MongoDB
    await connectToDatabase();

    // Access the database and collection
    const database = cachedClient.db('zoloMovies');
    const movies = database.collection('posts');

    // Query for the movie 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.find(query).toArray();

    // Return the found movie in JSON format
    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 });
  }
}
