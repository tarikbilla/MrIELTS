import '../styles/globals.css';
import "flowbite";

import Header from "../components/globalComponents/Header";
import Footer from "../components/globalComponents/Footer";
import ButtonNavigation from '../components/globalComponents/footer/buttonNavigation';
import SidebarDrawer from '../components/globalComponents/sidebar/SidebarDrawer';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <SidebarDrawer/>
      <Component {...pageProps} />
      <ButtonNavigation/>
      <Footer />
    </>
  );
}
