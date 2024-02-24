import { createDirectus, rest, readSingleton } from '@directus/sdk';

const directusUrl = import.meta.env.DIRECTUS_URL;

export const client = createDirectus<Collection>(directusUrl).with(rest());

type Home = {
  full_name: string;
  description: string;
  image: string;
  cv: string;
};

type About = {
  photo: string;
  description: string;
};

type Collection = {
  home: Home;
  about_me: About;
};

export function fetchHome() {
  return client.request(readSingleton('home'));
}

export function fetchAbout() {
  return client.request(readSingleton('about_me'));
}

export function getFileUrl(fileId: string) {
  return `${directusUrl}/assets/${fileId}`;
}
