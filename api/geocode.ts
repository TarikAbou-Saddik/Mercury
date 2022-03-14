import { Handler } from '@netlify/functions';
import 'dotenv/config';
import fetch from 'node-fetch';

const API_ENDPOINT = 'http://api.openweathermap.org';

const createResponse = (statusCode: number, jsonBody: any) => ({
  statusCode,
  body: JSON.stringify(jsonBody),
});

const getCoordinatesByLocationName = async (
  locationQuery: string,
  resultLimit = 5,
) => {
  const response = await fetch(
    `${API_ENDPOINT}/geo/1.0/direct?q=${locationQuery}&limit=${resultLimit}&appid=${process.env.OPENWEATHER_API_KEY}`,
  );
  return await response.json();
};

const handler: Handler = async (event, context) => {
  try {
  } catch (error) {
    return createResponse(500, { error: 'Failed contacting OpenWeatherAPI' });
  }
};

export { handler };
