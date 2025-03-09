import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const { winnerUrl } = await request.json();

    const client = await clientPromise;

    const db = client.db('pawsome')

    await db.collection('winners').insertOne({
      url: winnerUrl,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      message: 'Winner saved successfully',
      winnerUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error saving winner', error },
      { status: 500 }
    );
  }
}