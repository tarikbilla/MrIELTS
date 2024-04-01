import React from "react";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "flowbite";

// Import your components with accurate paths
import Header from "../components/globalComponents/Header";
import Footer from "../components/globalComponents/Footer";
import ButtonNavigation from "../components/globalComponents/footer/buttonNavigation";
import SidebarDrawer from "../components/globalComponents/sidebar/SidebarDrawer";
import AdminHeaderComponent from "../components/dashboard/global/header";
import AdminFooterComponent from "../components/dashboard/global/footer";
import AdminSidebarComponent from "../components/dashboard/global/sidebar";
import { AdminContextProvider } from "../contexts/AdminContextProvider";
import { UserContextProvider } from "../contexts/UserContext";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname.startsWith("/ielts-admin")) {
    return (
      <>
        <div
          className={`${roboto.className} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen`}
        >
          <AdminHeaderComponent></AdminHeaderComponent>
          <AdminSidebarComponent></AdminSidebarComponent>
          <main className="p-4 md:ml-64 h-auto pt-20">
            <AdminContextProvider>
              <UserContextProvider>
                {" "}
                {/* Wrap with UserContextProvider */}
                <Component {...pageProps} />
              </UserContextProvider>
            </AdminContextProvider>
          </main>
          <AdminFooterComponent></AdminFooterComponent>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <SidebarDrawer />
        <main
          lassName={`${roboto.className} mt-14 h-auto main-content bg-slate-50 dark:bg-gray-800 dark:border-gray-700`}
        >
          <Component {...pageProps} />
        </main>
        <ButtonNavigation />
        <Footer />
      </>
    );
  }
}

export default MyApp;
