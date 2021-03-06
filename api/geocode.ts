import { Handler } from '@netlify/functions';
import 'dotenv/config';
import fetch from 'node-fetch';

const API_ENDPOINT = 'http://api.openweathermap.org';

const handler: Handler = async (event, context) => {
  let response = createResponse(404, { error: 'Failed to find location' });
  try {
    const params = event.queryStringParameters;
    if (params && 'location' in params) {
      const locations = await getLocationsByName(params.location as string);
      response = createResponse(200, { locations });
    }
  } catch (error) {
    response = createResponse(500, {
      error: 'An unexpected error has occurred',
    });
  }

  return response;
};

const createResponse = (statusCode: number, jsonBody: any) => ({
  statusCode,
  body: JSON.stringify(jsonBody),
});

const getLocationsByName = async (locationQuery: string, resultLimit = 5) => {
  const response = await fetch(
    `${API_ENDPOINT}/geo/1.0/direct?q=${locationQuery}&limit=${resultLimit}&appid=${process.env.OPENWEATHER_API_KEY}`,
  );
  if (!response.ok) {
    throw new Error(
      `An error has ocurred. Status Code ${response.status} returned.`,
    );
  }
  return await response.json();
};

export { handler };
