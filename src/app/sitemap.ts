import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.tfkhdyt.my.id',
      lastModified: new Date(),
    },
    {
      url: 'https://www.tfkhdyt.my.id/about',
      lastModified: new Date(),
    },
    {
      url: 'https://www.tfkhdyt.my.id/skills',
      lastModified: new Date(),
    },
    {
      url: 'https://www.tfkhdyt.my.id/projects',
      lastModified: new Date(),
    },
    {
      url: 'https://www.tfkhdyt.my.id/contact',
      lastModified: new Date(),
    },
  ];
}
