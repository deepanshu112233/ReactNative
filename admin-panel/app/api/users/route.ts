// app/api/users/route.ts
import { NextResponse } from 'next/server';
import api from '@/lib/axios'; // Import your axios instance
import { clerkMiddleware } from '@clerk/nextjs/server';


export async function GET() {
  const response = await api.get('/users'); // Proxy call to backend
  return NextResponse.json(response.data);
}
