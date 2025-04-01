import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Store emails in a JSON file
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Valid email is required' 
      }, { status: 400 });
    }
    
    // Path to our emails storage file
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'subscribers.json');
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Read existing emails or create empty array
    let subscribers: string[] = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      subscribers = JSON.parse(fileContent);
    }
    
    // Only add email if it's not already in the list
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email successfully saved' 
    });
    
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error' 
    }, { status: 500 });
  }
}
