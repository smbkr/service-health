import axios from 'axios';

export const url =
  'https://u0e8utqkk2.execute-api.eu-west-2.amazonaws.com/dev/transaction-monitor/health';

export default async function emailServiceHealth(): Promise<boolean> {
  let response;
  try {
    response = await axios.get(
      url,
      // This service times out when not healthy, let's not wait any
      // longer than needed.
      { timeout: 1000 },
    );
  } catch (err) {
    return false;
  }
  return response.status === 200;
}
