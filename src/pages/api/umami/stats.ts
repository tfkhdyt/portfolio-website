import axios from 'axios';
import { sub } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.UMAMI_USERNAME;
const PASSWORD = process.env.UMAMI_PASSWORD;
const UMAMI_URL = process.env.UMAMI_URL;

// axios instance, pre-configured headers and base URL
const umami = axios.create({
  baseURL: UMAMI_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// get token from umami `/api/auth/login`
const getTokenFromUmami = async (username: string, password: string) => {
  const body = { username, password };
  try {
    const response = await umami.post<{ token: string }>(
      '/api/auth/login',
      body
    );
    // return null if the status not 200
    if (response.status !== 200) {
      return null;
    }
    // return the token
    return response.data.token;
  } catch (error) {
    return null;
  }
};

const umamiAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentDate = Date.now();
  const startDateAllTime = 0;
  const startDateLast24Hours = sub(currentDate, { hours: 24 }).getTime();
  const startDateLast30Days = sub(currentDate, { days: 30 }).getTime();

  // get token from umami, with given username and password from .env file
  const token = await getTokenFromUmami(USERNAME as string, PASSWORD as string);

  // if token is null, return 500
  if (!token) {
    return res.status(500).send({
      message: 'Error when trying to get token from umami',
    });
  }

  // get pageviews from umami `/api/website/1/pageviews`
  const { data: allTime } = await umami.get(
    `/api/website/1/stats?start_at=${startDateAllTime}&end_at=${currentDate}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const { data: last24Hours } = await umami.get(
    `/api/website/1/stats?start_at=${startDateLast24Hours}&end_at=${currentDate}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const { data: last30Days } = await umami.get(
    `/api/website/1/stats?start_at=${startDateLast30Days}&end_at=${currentDate}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.status(200).send({
    allTime: allTime.pageviews.value,
    last24Hours: last24Hours.pageviews.value,
    last30Days: last30Days.pageviews.value,
  });
};

export default umamiAPI;
