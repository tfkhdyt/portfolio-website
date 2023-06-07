import { Project } from '.';

export const apiProjects: Project[] = [
  {
    name: 'Shopping Store',
    desc: 'Shopping Store API - Hacktiv8 Golang Final Project 4',
    category: 'API',
    techStack: ['Golang', 'Gin Gonic', 'PostgreSQL'],
    url: {
      repo: 'https://github.com/tfkhdyt/hacktiv8-msib-final-project-4',
    },
    photoUrl: 'shopping-store.png',
  },
  {
    name: 'Kanban Board',
    category: 'API',
    desc: 'Kanban Board API - Hacktiv8 Golang Final Project 3',
    url: {
      repo: 'https://github.com/tfkhdyt/hacktiv8-msib-final-project-3',
    },
    techStack: ['Golang', 'Gin Gonic', 'PostgreSQL'],
    photoUrl: 'kanban-board.png',
  },
  {
    name: 'MyGram',
    category: 'API',
    desc: 'MyGram API - Hacktiv8 Golang Final Project 2',
    url: {
      demo: null,
      repo: 'https://github.com/tfkhdyt/hacktiv8-msib-final-project-2',
    },
    techStack: ['Golang', 'Gin Gonic', 'PostgreSQL'],
    photoUrl: 'mygram.png',
  },
  {
    name: 'Todo List',
    category: 'API',
    desc: 'Todo List API - Hacktiv8 Golang Final Project 1',
    url: {
      demo: 'https://todolist-final-project.up.railway.app/swagger/index.html',
      repo: 'https://github.com/tfkhdyt/hacktiv8-msib-final-project-1',
    },
    techStack: ['Golang', 'Gin Gonic', 'PostgreSQL'],
    photoUrl: 'todolist-api.png',
  },
  {
    name: 'Pondokeun API',
    category: 'API',
    desc: 'Pondokeun Link Shortener as a REST API',
    url: {
      demo: null,
      repo: 'https://github.com/tfkhdyt/pondokeun-api',
    },
    techStack: ['TypeScript', 'Node.js', 'NestJS'],
  },
  {
    name: 'Forum API',
    category: 'API',
    desc: 'Dicoding Expert Back-end Submission',
    url: {
      demo: null,
      repo: 'https://github.com/tfkhdyt/forum-api',
    },
    techStack: ['JavaScript', 'Node.js', 'Hapi.js', 'PostgreSQL'],
  },
  {
    name: 'openmusic-go',
    category: 'API',
    desc: 'Dicoding Intermediate Back-end Submission rewritten in Go',
    url: {
      repo: 'https://github.com/tfkhdyt/openmusic-go',
      demo: null,
    },
    techStack: ['Golang', 'Gin Gonic', 'PostgreSQL'],
  },
  {
    name: 'Message Form to Telegram API',
    category: 'API',
    desc: 'REST API to send message from HTML form into Telegram Messages',
    url: {
      repo: 'https://github.com/tfkhdyt/message-form-to-telegram-api',
      demo: null,
    },
    techStack: ['TypeScript', 'Node.js', 'NestJS', 'Telegraf'],
  },
  {
    name: '21Cineplex API',
    category: 'API',
    desc: 'Cinema XXI REST API using Web Scraping Method with NestJS, TypeScript, and Cheerio',
    url: {
      repo: 'https://github.com/tfkhdyt/21cineplex-api',
      demo: 'https://tfkhdyt-21cineplex-api.herokuapp.com/docs/',
    },
    techStack: ['TypeScript', 'Node.js', 'NestJS'],
  },
];
