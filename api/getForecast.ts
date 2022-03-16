import { Handler } from '@netlify/functions';
import 'dotenv/config';
import fetch from 'node-fetch';

const API_ENDPOINT = 'http://api.openweathermap.org';

const handler: Handler = async (event, context) => {
  let response = createResponse(404, {
    error: 'Failed to fetch forecast for location',
  });
  try {
    const params = event.queryStringParameters;
    if (params && 'lat' in params && 'lon' in params) {
      const forecast = await getForecastByCoords(
        params.lon as string,
        params.lat as string,
      );
      response = createResponse(200, { forecast });
    }
  } catch (error) {
    response = createResponse(500, { error });
  }

  return response;
};

const createResponse = (statusCode: number, jsonBody: any) => ({
  statusCode,
  body: JSON.stringify(jsonBody),
});

const getForecastByCoords = async (
  lon: string,
  lat: string,
  units = 'metric',
) => {
  const response = await fetch(
    `${API_ENDPOINT}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,hourly&appid=${process.env.OPENWEATHER_API_KEY}`,
  );
  if (!response.ok) {
    throw new Error(
      `An error has ocurred. Status Code ${response.status} returned.`,
    );
  }
  return await response.json();
};

export { handler };
