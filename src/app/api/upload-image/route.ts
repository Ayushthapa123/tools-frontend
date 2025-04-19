import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get binary data from the request body
    const url = new URL(request.url);

    const daata = await request.json();
    // console.log('daata',daata)
    const { file,style } = daata;
    // const style = url.searchParams.get('style');
    // console.log('ffffffff',file)
    // console.log('ffffffffstyle', style);

    // Make a POST request to the API endpoint
    const response = await axios.post(
      `https://api-renovate.onrender.com/upload-image?style=victorian&room=bedroom`,
      { file: file },
      {
        headers: {
          'Content-Type': 'application/octet-stream', // Set content type for binary data
        },
      },
    );

    // Log the binary data received from the API
    // console.log('Binary data from API:', response.data);

    // Extract the data from the response
    const data = response.data;

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling API:', error);

    // Return an error response
    return NextResponse.error();
  }
}
