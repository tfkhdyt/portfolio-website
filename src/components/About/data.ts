const getAge = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const about = {
  picture: '/avatar.jpg',
  description: [
    `I live in Bandung, Indonesia. I was born in Majalengka, 1 April 2002. I'm ${getAge(
      '2002-04-01'
    )} years old. I'm an Computer Science Student from Universitas Bale Bandung. `,
    'My main tech stack is MN3 Stack (MongoDB, NestJS, Next.js, Node.js).',
    'Coding has been my passion and hobby since I was 15 years old, and I love computer since I was a kid.',
    'Besides coding, I love listening to music. My favorite genres are Pop Punk, Post-hardcore, Metalcore, Nu-metal, and Electronicore, | I like playing games too. My favorite genre is First Person Shooter',
    'Sometimes I watch anime, but I prefer watching western movies and series, especially MCU (Marvel Cinematic Universe).',
    'I spend a lot of time on Facebook sharing memes and shitposts.',
  ],
};
