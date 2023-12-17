import React from "react";
import "../styles/globals.css";
import "flowbite";

// Import your components with accurate paths
import Header from "../components/globalComponents/Header";
import Footer from "../components/globalComponents/Footer";
import ButtonNavigation from "../components/globalComponents/footer/buttonNavigation";
import SidebarDrawer from "../components/globalComponents/sidebar/SidebarDrawer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <SidebarDrawer />
      <main className="p-4 mt-14 h-auto py-8 main-content dark:bg-gray-800 dark:border-gray-700">
        <Component {...pageProps} />
      </main>
      <ButtonNavigation />
      <Footer />
    </>
  );
}

export default MyApp;
