import '../styles/globals.css';
import "flowbite";

import Header from "../components/globalComponents/Header";
import Footer from "../components/globalComponents/Footer";
import ButtonNavigation from '../components/globalComponents/footer/buttonNavigation';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
      <ButtonNavigation/>
      <Footer />
    </>
  );
}
