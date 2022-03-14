import { Handler } from '@netlify/functions';
import 'dotenv/config';
import fetch, { Request } from 'node-fetch';

const API_ENDPOINT = 'https://api.unsplash.com/';

const createRequest = (url: string) =>
  new Request(url, {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
  });

const createResponse = (statusCode: number, jsonBody: any) => ({
  statusCode,
  body: JSON.stringify(jsonBody),
});

const handler: Handler = async (event, context) => {
  try {
    if (
      event.queryStringParameters &&
      'collectionId' in event.queryStringParameters
    ) {
      const id = event.queryStringParameters['collectionId'];
      const request = createRequest(`${API_ENDPOINT}/collections/${id}/photos`);
      const response = await fetch(request);
      if (response.ok) {
        const photos = await response.json();
        return createResponse(200, { photos });
      }
      return createResponse(response.status, response.body);
    }
    return createResponse(404, { message: 'Collection does not exist' });
  } catch (error) {
    return createResponse(500, {
      error: 'Failed fetching collection from Unsplash',
    });
  }
};

export { handler };
