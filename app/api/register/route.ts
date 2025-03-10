import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '../../../lib/prismadb';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!email || !name || !password) {
    return new NextResponse('Missing info');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
