import axios from 'axios';

export const url =
  'https://u0e8utqkk2.execute-api.eu-west-2.amazonaws.com/dev/microservice-controller/health';

export default async function emailServiceHealth(): Promise<boolean> {
  let response;
  try {
    response = await axios.post(url);
  } catch (err) {
    return false;
  }
  return response.status === 200;
}
