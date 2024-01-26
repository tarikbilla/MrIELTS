import React from "react";
import ReadingTestLevel from "../../../components/pageComponents/readingTest/readingTestLevel";
export default function ReadingPage() {
  return (
    <>
      <div className="container-fluid py-8 mx-auto bg-white dark:bg-gray-800">
        <section className="hero-section container mx-auto mb-8">
          <h1
            className="inline-block mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            id="content"
          >
            Reading Test
          </h1>

          <div className="container">
            <ReadingTestLevel levelId={1} />
            <ReadingTestLevel levelId={2} />
            <ReadingTestLevel levelId={3} />
            
          </div>
        </section>
      </div>
    </>
  );
}
