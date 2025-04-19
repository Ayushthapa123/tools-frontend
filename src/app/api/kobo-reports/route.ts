import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) {

    const url = new URL(request.url);
       const file = url.searchParams.get('file')

        // const daata = await request.json();
        // console.log('daata', daata);
        // const { file } = daata;
       

  try {
    // Make a GET request to the KoBoToolbox API
    const response = await axios.get(
      `https://eu.kobotoolbox.org/api/v2/assets/a8BUmUGZKgRqNESHTWAdDs/reports/`,
    );

    // Extract the data from the response
    const data = response.data;

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from KoBoToolbox API:', error);

    // Return an error response
    return NextResponse.error();
  }
}
