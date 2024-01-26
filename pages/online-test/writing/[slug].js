import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Breadcrumb, Badge } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import WritingHeaderRightTimerSidebar from "../../../components/pageComponents/writingTest/writingHeaderRightTimerSidebar";
import WritingRadialChart from "./writingRadiulChart";

function WritingTestPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const textarea = document.getElementById("editor");

    if (textarea) {
      const updateWordCount = () => {
        const words = textarea.value.trim().split(/\s+/);
        setWordCount(words.length);
      };

      textarea.addEventListener("input", updateWordCount);

      // Cleanup the event listener when the component is unmounted
      return () => {
        textarea.removeEventListener("input", updateWordCount);
      };
    }
  }, []);

  // Example: Fetch writing test data based on the slug
  const writingTestData = {
    title: `WRITING TASK - ${slug}`,
    description: "This is a sample writing test page.",
    // Add more properties as needed
  };

  return (
    <>
      <Head>
        <title>{writingTestData.title}</title>
        <meta name="description" content={writingTestData.description} />
        {/* Add more meta tags as needed */}
      </Head>

      <div className="container p-4 py-8 mx-auto bg-gray-50 dark:bg-gray-800">
        <section className=" bg-white dark:bg-gray-800 p-4 rounded-xl border block sm:flex">
          <div className="p-2 sm:w-4/5 ">
            <div>
              <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item href="#" icon={HiHome}>
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/online-test/">
                  Online Test
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/online-test/writing/">
                  Writing Test
                </Breadcrumb.Item>
                <Breadcrumb.Item>Level 1</Breadcrumb.Item>
                <Breadcrumb.Item>Test 2</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <h1 className="text-4xl font-extrabold mb-4">
              {writingTestData.title}
            </h1>
            <p>You should spend about 20 minutes on this task.</p>

            <div className="flex mt-2">
              Status: &nbsp;{" "}
              <Badge color="failure" className="text-center">
                Pending
              </Badge>
            </div>
          </div>

          <WritingHeaderRightTimerSidebar />
          {/*end sidebar*/}
        </section>

        <section className="block sm:flex">
          {/* Article Section */}
          <div className="sm:w-4/6 p-4 shadow sm:mr-4 my-4 text-lg bg-white dark:bg-gray-800 rounded-xl border">
            <div className="content-title text-center">
              <h2 className="inline-block mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Writing Task Details
              </h2>
            </div>
            <div className="content-question">
              <div className="">
                <p>
                  On a recent holiday you lost a valuable item. Fortunately you
                  have travel insurance to cover the cost of anything lost.
                </p>

                <p>
                  Write a letter to the manager of your insurance company. In
                  your letter
                </p>
                <ul className=" list-disc ml-4">
                  <li>describe the item you lost</li>
                  <li>explain how you lost it</li>
                  <li>
                    tell the insurance company what you would like them to do
                  </li>
                </ul>

                <p>
                  Write at least 150 words. You do NOT need to write any
                  addresses. Begin your letter as follow： Dear Sir or Madam,{" "}
                </p>
              </div>
            </div>

            <div className="content-answer mt-8">
              <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                    <div className=" font-semibold">
                      Please Write Your Answer
                    </div>
                    <button
                      type="button"
                      data-tooltip-target="tooltip-fullscreen"
                      className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 19 19"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                        />
                      </svg>
                      <span className="sr-only">Full screen</span>
                    </button>
                    <div
                      id="tooltip-fullscreen"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                      Show full screen
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <label htmlFor="editor" className="sr-only">
                      Publish post
                    </label>
                    <textarea
                      id="editor"
                      rows="12"
                      className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 outline-none"
                      placeholder="Write your essay here..."
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button
                      type="submit"
                      className="group flex h-min items-center justify-center p-2 px-4 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900 rounded-lg focus:ring-2"
                    >
                      Submit My Answer
                    </button>
                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                      <span className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer text-sm hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        {" "}
                        Words Count: {wordCount}
                      </span>
                      <button
                        type="button"
                        className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 12 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                          />
                        </svg>
                        <span className="sr-only">Attach file</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                        <span className="sr-only">Upload image</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* sidebar Section */}
          <div className="sm:w-2/6 p-4 shadow sm:ml-4 my-4  bg-white dark:bg-gray-800 p-4 rounded-xl border">
            <div className="radial-chart">
              <h2 className="inline-block mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Your Score Analysis
              </h2>
              <div className="flex justify-center max-w-xs m-auto"><WritingRadialChart score={7.5} /></div>
              <hr className="mt-4"></hr>
              <div className="score-details mt-4">
                <p className="border-b p-2 m-2">Total Characters: 720</p>
                <p className="border-b p-2 m-2">Total Words: 158</p>
                <p className="border-b p-2 m-2">Average word length: 5 </p>
                <p className="border-b p-2 m-2">Total Sentance: 18</p>
                <p className="border-b p-2 m-2">Wrong Spelling: 0</p>
                <p className="border-b p-2 m-2">Sentence Structure: <Badge color="success" className="inline">Good</Badge></p>
                <p className="border-b p-2 m-2">Grammar and Punctuation: <Badge color="red" className="inline">low</Badge></p>
                <p className="border-b p-2 m-2">Readability: <Badge color="purple" className="inline">Medium</Badge></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default WritingTestPage;
