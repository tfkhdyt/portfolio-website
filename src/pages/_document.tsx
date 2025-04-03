import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
// import Script from 'next/script'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html className='scroll-smooth' lang='en'>
        <Head>
          <link
            href='https://fontbit.io/css2?family=Be+Vietnam+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fontbit.io/css2?family=Fira+Code:wght@400;700&display=swap'
            rel='stylesheet'
          />
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon-512x512.png' />
          <meta name='theme-color' content='#3B82F6' />
          <script
            async
            defer
            data-website-id='285223d1-eb6c-4b6e-a2a2-c0ca69ce122c'
            src='https://umami.tfkhdyt.my.id/umami.js'
          />
        </Head>
        <body className='font-body'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
