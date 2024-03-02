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

export type SkillSet = {
  name: string;
  type: string;
  logo: string;
  status: string;
};

type Portfolio = {
  status: string;
  date_created: Date;
  name: string;
  description: string;
  repo_url?: string | null;
  demo_url?: string | null;
  type: string;
  image: string;
  tech_stack: {
    skill_set_id: SkillSet;
  }[];
};

type Contact = {
  name: string;
  username: string;
  url: string;
};

type Collection = {
  home: Home;
  about_me: About;
  education: Education[];
  work_experience: WorkExperince[];
  skill_set: SkillSet[];
  portfolio: Portfolio[];
  contact: Contact[];
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

export function fetchContact() {
  return client.request(readItems('contact'));
}

export function fetchSkillSet() {
  return client.request(
    readItems('skill_set', {
      filter: {
        status: {
          _eq: 'published',
        },
      },
      fields: ['name', 'type', 'logo'],
    }),
  );
}

export function fetchPortfolio(): Promise<Portfolio[]> {
  return client.request(
    readItems('portfolio', {
      filter: {
        status: {
          _eq: 'published',
        },
      },
      fields: ['*', 'tech_stack.skill_set_id.*'],
    }),
  );
}

export function getFileUrl(fileId: string, params?: Record<string, string>) {
  const searchParams = new URLSearchParams(
    params
      ? {
          ...params,
          format: 'auto',
          quality: '75',
        }
      : undefined,
  );
  return `${directusUrl}/assets/${fileId}?${searchParams}`;
}
