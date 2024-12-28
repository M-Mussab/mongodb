'use server';
import clientPromise from '@/mongodb/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const db = (await clientPromise).db('practice').collection('item_data');
  const data = await db.find().toArray();
  console.log(data);
  return NextResponse.json(data);
};

interface PostRequest {
  name: string;
  description: string;
}

export const POST = async (req: NextRequest) => {
  const db = (await clientPromise).db('practice').collection('item_data');
  //   const data = await db.insertOne();
  const userData: PostRequest = await req.json();
  const data = await db.insertOne(userData);
  const resp: any = await db.findOne({
    _id: data.insertedId,
  });

  console.log(resp);
  return NextResponse.json({
    name: resp.name,
    description: resp.description,
    _id: resp._id,
  });
};
