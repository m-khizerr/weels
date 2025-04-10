import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = 'mongodb+srv://abdulmannankhan1000:weels1234@weelsdb.d023vim.mongodb.net/?retryWrites=true&w=majority&appName=weelsDB';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Valid email is required' }, 
        { status: 400 }
      );
    }
    
    const client = new MongoClient(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    await client.connect();
    
    const database = client.db('weelsDB');
    const collection = database.collection('subscribers');
    
    await collection.insertOne({
      email,
      timestamp: new Date()
    });
    
    await client.close();
    
    return NextResponse.json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}