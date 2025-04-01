import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Store tip data and also collect the email
export async function POST(request: Request) {
  try {
    const tipData = await request.json();
    
    // Basic validation
    if (!tipData.email || !tipData.name || !tipData.recipientName) {
      return NextResponse.json({ 
        success: false, 
        message: 'Required fields missing' 
      }, { status: 400 });
    }
    
    // Store the tip data
    const tipsDir = path.join(process.cwd(), 'data');
    const tipsFilePath = path.join(tipsDir, 'tips.json');
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(tipsDir)) {
      fs.mkdirSync(tipsDir, { recursive: true });
    }
    
    // Read existing tips or create empty array
    let tips: any[] = [];
    if (fs.existsSync(tipsFilePath)) {
      const fileContent = fs.readFileSync(tipsFilePath, 'utf8');
      tips = JSON.parse(fileContent);
    }
    
    // Add timestamp to tip data
    const tipWithTimestamp = {
      ...tipData,
      timestamp: new Date().toISOString()
    };
    
    // Add the new tip
    tips.push(tipWithTimestamp);
    fs.writeFileSync(tipsFilePath, JSON.stringify(tips, null, 2));
    
    // Also store the email in subscribers.json
    const subscribersFilePath = path.join(tipsDir, 'subscribers.json');
    
    // Read existing emails or create empty array
    let subscribers: string[] = [];
    if (fs.existsSync(subscribersFilePath)) {
      const fileContent = fs.readFileSync(subscribersFilePath, 'utf8');
      subscribers = JSON.parse(fileContent);
    }
    
    // Only add email if it's not already in the list
    if (!subscribers.includes(tipData.email)) {
      subscribers.push(tipData.email);
      fs.writeFileSync(subscribersFilePath, JSON.stringify(subscribers, null, 2));
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tip successfully saved' 
    });
    
  } catch (error) {
    console.error('Error saving tip:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error' 
    }, { status: 500 });
  }
}
