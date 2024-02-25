import { createDirectus, rest, readSingleton, readItems } from '@directus/sdk';

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

type Education = {
  name: string;
  major: string;
  gpa?: number;
  time_span_start: string;
  time_span_end?: string;
  achievements?: string[];
};

type WorkExperince = {
  company_name: string;
  role: string;
  time_span_start: string;
  time_span_end?: string;
  job_desk: string[];
};

type Collection = {
  home: Home;
  about_me: About;
  education: Education[];
  work_experience: WorkExperince[];
};

export function fetchHome() {
  return client.request(readSingleton('home'));
}

export function fetchAbout() {
  return client.request(readSingleton('about_me'));
}

export function fetchEducation() {
  return client.request(readItems('education'));
}

export function fetchWorkExperience() {
  return client.request(readItems('work_experience'));
}

export function getFileUrl(fileId: string) {
  return `${directusUrl}/assets/${fileId}`;
}
