import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscription from '@/models/Subscription';

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Store emails in a JSON file
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    if (!data.email || !data.email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email: data.email });
    if (existingSubscription) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    const subscription = await Subscription.create({
      email: data.email
    });

    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save subscription' },
      { status: 500 }
    );
  }
}
