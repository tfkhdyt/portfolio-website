import { createDirectus, rest, readSingleton } from '@directus/sdk';

const directusUrl = import.meta.env.DIRECTUS_URL;

export const client = createDirectus<Collection>(directusUrl).with(rest());

type Home = {
  full_name: string;
  description: string;
  image: string;
};

type Collection = {
  home: Home;
};

export async function fetchHome() {
  return await client.request(readSingleton('home'));
}

export function getImageUrl(fileId: string) {
  return `${directusUrl}/assets/${fileId}`;
}
