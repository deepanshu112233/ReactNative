// app/api/wallets/route.ts
import { NextResponse } from 'next/server';
import api from '@/lib/axios'; // Import your axios instance

export async function GET() {
  try {
    // Proxy call to backend for wallets
    const response = await api.get('/wallets');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching wallets:', error);
    return NextResponse.json({ error: 'Failed to fetch wallets' }, { status: 500 });
  }
}
