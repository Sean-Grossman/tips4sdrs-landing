import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tip from '@/models/Tip';

// Store tip data and also collect the email
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    if (!data.name || !data.email || !data.recipientName || !data.tipAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tip = await Tip.create({
      sender: {
        name: data.name,
        email: data.email
      },
      recipient: {
        name: data.recipientName,
        email: data.recipientEmail || null
      },
      amount: parseFloat(data.tipAmount.replace(/[^0-9.]/g, '')),
      message: data.message || 'Thanks for your help!'
    });

    return NextResponse.json({ success: true, tip });
  } catch (error) {
    console.error('Error saving tip:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save tip' },
      { status: 500 }
    );
  }
}
