import React from "react";
export default function ReadingPage() {
  return (
    <>
      <div className="container mx-auto">
        <section className="mb-8">
          <h1
            className="inline-block mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            id="content"
          >
            Reading Test
          </h1>

          <div className="container">
            {/* Item card */}
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div
                className="flex flex-wrap justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-2 px-4"
                role="tablist"
              >
                <div className="font-semibold text-xl text-white dark:text-white">
                  Level-1
                </div>
                <div className="text-sm text-white dark:text-white">
                  You completed: 4
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 test-card-body px-2 py-4">

                {/* test item */}
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                  <h4 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Test-01
                  </h4>
                 
                  <ul className="my-4 space-y-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-1: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-700 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-2: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-3: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-4: Short Answer
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div>
                    <a
                      href="#"
                      className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                    >
                      <svg
                        className="w-3 h-3 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      How to complete this task?
                    </a>
                  </div>
                </div>

                {/* test item */}
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                  <h4 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Test-02
                  </h4>
                 
                  <ul className="my-4 space-y-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-1: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-2: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-3: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-4: Short Answer
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div>
                    <a
                      href="#"
                      className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                    >
                      <svg
                        className="w-3 h-3 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      How to complete this task?
                    </a>
                  </div>
                </div>

                {/* test item */}
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                  <h4 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Test-03
                  </h4>
                 
                  <ul className="my-4 space-y-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-1: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-2: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-3: Short Answer
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-base shadow text-gray-900 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-4: Short Answer
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div>
                    <a
                      href="#"
                      className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                    >
                      <svg
                        className="w-3 h-3 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      How to complete this task?
                    </a>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
