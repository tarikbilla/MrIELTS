import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add your custom head content here */}
          <link rel="icon" href={'/images/fav.png'} />
          <title>Mr IELTS - Your Expert Companion for Success</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
