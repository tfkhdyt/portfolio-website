import Data from './data';

const MetaTags = () => {
  return (
    <>
      {/* google site verification */}
      <meta
        name='google-site-verification'
        content='JCu7ig2hkiijnjnq8doWrgNg9HPCpWwo2WrTQWko8Cs'
      />
      {/* metadata */}
      <meta name='description' content={Data.deskripsi} />
      <meta name='keywords' content={Data.keywords.join(',')} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:description' content={Data.deskripsi} />
      <meta name='twitter:image' content={Data.link + Data.thumbnail} />
      <meta name='twitter:title' content={Data.title} />
      <meta property='og:description' content={Data.deskripsi} />
      <meta property='og:image' content={Data.link + Data.thumbnail} />
      <meta property='og:title' content={Data.title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={Data.link} />
      <link rel='image_src' href={Data.link + Data.thumbnail} />
      <link rel='icon' type='image/x-icon' href={Data.link + Data.favicon} />
    </>
  );
};

export default MetaTags;
