import React from "react";
import ReadingTestLevel from "../../../components/pageComponents/readingTest/readingTestLevel";
import ListeningTestItem from "../../../components/pageComponents/listeningTest/listeningTestItems";
import ListeningTestLevel from "../../../components/pageComponents/listeningTest/listeningTestLevel";
export default function ListeningPage() {
  return (
    <>
      <div className="container-fluid py-8 mx-auto bg-white dark:bg-gray-800">
        <section className="hero-section container mx-auto mb-8">
          <h1
            className="inline-block mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            id="content"
          >
            Listening Test
          </h1>

          <div className="container">
            <ListeningTestLevel levelId={1} />
            <ListeningTestLevel levelId={2} />
            <ListeningTestLevel levelId={3} />
            
          </div>
        </section>
      </div>
    </>
  );
}
