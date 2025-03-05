// app/api/winner/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { winnerUrl } = await request.json();

    //todo save data in Mongodb

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
