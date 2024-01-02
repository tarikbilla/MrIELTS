import React from "react";
import Image from "next/image";
import HeaderApps from "./header/headerApps";
import HeaderNotifications from "./header/headerNotifications";
import HeaderSearchForm from "./header/headerSearch";
import Usermenu from "./header/usermenu";

export default function DefaultNavbar() {
  return (
    <>
    <header>
      <nav className="bg-white border-gray-200 px-4 fixed w-full z-20 top-0 start-0 border-b lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center">
              <div className="flex justify-start items-center">
                  <button id="toggleSidebar" aria-expanded="true" className="hidden p-2 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"  data-drawer-target="drawer-sidebar" data-drawer-toggle="drawer-sidebar" data-drawer-sidebar="true" data-drawer-backdrop="true" aria-controls="drawer-sidebar">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  </button>

                  <button aria-expanded="true"  className="p-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" data-drawer-target="drawer-sidebar" data-drawer-toggle="drawer-sidebar" data-drawer-sidebar="true" data-drawer-backdrop="true" aria-controls="drawer-sidebar">
                    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg aria-hidden="true" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Toggle sidebar</span>
                  </button>

                  {/* logo */}
                  <a href={'/'} className="flex mr-1">
                    <img src={'/images/logo.svg'} className="mr-1 h-6" alt="FlowBite Logo" />
                  </a>
                  {/* search form here if need*/}
                </div>
              <div className="flex items-center lg:order-2">

                {/* Call Button */}
                  <button id="randomCallBtn" type="button" className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Call</span>
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z"/>
                      </svg>
                  </button>

                  {/* Notifications */}
                  <HeaderNotifications/>

                  {/* Apps */}
                  <HeaderApps/>

                  {/* usermenu */}
                  <Usermenu/>
              </div>
          </div>
      </nav>
    </header>
    </>
  )
}


