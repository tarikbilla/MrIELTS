import React from "react";
import ReadingTestLevel from "../../../components/pageComponents/readingTest/readingTestLevel";

export default function WritingTest() {
  const getPartLink = (partNumber) => `/online-test/writing/single`;

  return (
    <>
      <div className="container-fluid p-4 py-8 mx-auto bg-gray-50 dark:bg-gray-800">
        <section className="hero-section container mx-auto mb-8">
          <h1
            className="inline-block mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            id="content"
          >
            Writing Test
          </h1>

          <div className="container">
            <div className="writing-items py-4">
              <ul className="grid  md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                  (partNumber, index) => (
                    <li key={partNumber} className="h-auto max-w-full">
                      <a
                        href={`/online-test/writing/${partNumber}`}
                        className={`flex items-center px-2 py-4 m-0 text-lg shadow border text-gray-900 font-bold rounded-lg bg-gray-100 hover:bg-gray-50 group hover:shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white`}
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.1a5 5 0 0 0-4.7 1.4l-6.7 6.6a3 3 0 0 0-.8 1.6l-.7 3.7a3 3 0 0 0 3.5 3.5l3.7-.7a3 3 0 0 0 1.5-.9l4.2-4.2V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                            clip-rule="evenodd"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M17.4 8a1 1 0 0 1 1.2.3 1 1 0 0 1 0 1.6l-.3.3-1.6-1.5.4-.4.3-.2Zm-2.1 2.1-4.6 4.7-.4 1.9 1.9-.4 4.6-4.7-1.5-1.5ZM17.9 6a3 3 0 0 0-2.2 1L9 13.5a1 1 0 0 0-.2.5L8 17.8a1 1 0 0 0 1.2 1.1l3.7-.7c.2 0 .4-.1.5-.3l6.6-6.6A3 3 0 0 0 18 6Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Part-{partNumber}: Writing Test
                        </span>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
