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

export async function GET (request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('pawsome')
    const topWinners = await db.collection('winners')
    .aggregate([
      {
        $group: {
          _id: '$url',
          votes: { $sum: 1 },
          latestVote: { $max: '$createdAt' },
        },
      },
      { $sort: { votes: -1 } },
      { $limit: 3 },
    ])
    .toArray();

    return NextResponse.json({ topWinners });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error getting Top3 winners', error },
      { status: 500 },
    )
  }
}