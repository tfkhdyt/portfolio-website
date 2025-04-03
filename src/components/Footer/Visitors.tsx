import axios from 'axios';
import useSWR from 'swr';

import People from './People';
import TextWithTooltip from './TextWithTooltip';

const BASE_URL = process.env.BASE_URL;

const umamiClient = axios.create({
  baseURL: BASE_URL,
});

const fetcher = async (url: string) => {
  const { data } = await umamiClient.get(url).catch((err) => {
    throw err;
  });
  if (!data) return null;
  return data;
};

const Visitors = () => {
  const { data } = useSWR('/api/umami/stats', fetcher);

  // if (error) console.error(error);

  return (
    <div className='flex items-center text-xs font-semibold text-slate-500'>
      <People />
      {' : '}
      {data ? (
        <span className='divide-x divide-slate-600'>
          <TextWithTooltip
            tooltipLabel='Last 24 hours'
            value={data.last24Hours}
          />
          <TextWithTooltip
            tooltipLabel='Last 30 days'
            value={data.last30Days}
          />
          <TextWithTooltip tooltipLabel='All time' value={data.allTime} />
        </span>
      ) : (
        <div className='animate-pulse ml-1 w-12 h-3 rounded-sm bg-slate-500 '></div>
      )}
    </div>
  );
};

export default Visitors;
