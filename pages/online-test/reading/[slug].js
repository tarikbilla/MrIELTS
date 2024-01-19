"use client";
import { useRouter } from "next/router";
import Head from "next/head";
import { Breadcrumb, Badge } from "flowbite-react";
import { HiHome, HiCheck, HiClock } from "react-icons/hi";

function ReadingTestPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Example: Fetch reading test data based on the slug

  // Replace this with your actual data fetching logic
  // For demonstration purposes, I&#39;ll use a placeholder data object
  const readingTestData = {
    title: `Reading Test - ${slug}`,
    description: "This is a sample reading test page.",
    // Add more properties as needed
  };

  return (
    <>
      <Head>
        <title>{readingTestData.title}</title>
        <meta name="description" content={readingTestData.description} />
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
                <Breadcrumb.Item href="/online-test/reading/">
                  Reading Test
                </Breadcrumb.Item>
                <Breadcrumb.Item>Level 1</Breadcrumb.Item>
                <Breadcrumb.Item>Test 2</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <h1 className="text-4xl font-extrabold mb-6">
              {readingTestData.title}
            </h1>
            <p>
              You should spend about 20 minutes on Questions 27-40 which are
              based on the Reading Passage below.
            </p>
          </div>

          <div className="sm:w-80">
            <div>
              <Badge size="sm" icon={HiClock} className="px-4 text-center">
                Duration：00:00:00
              </Badge>
            </div>

            <div className="flex items-center w-full">
              <div className="w-full">
                <div className="flex items-center justify-between mx-auto m-4 mb-1">
                  <button
                    data-tooltip-target="tooltip-microphone"
                    type="button"
                    class="p-2.5 group bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
                  >
                    <svg
                      className="w-4 h-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Pause Time</span>
                  </button>
                  <div
                    id="tooltip-microphone"
                    role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                  >
                    Pause Time
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>

                  <button
                    data-tooltip-target="tooltip-start"
                    type="button"
                    className="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-3 h-3 text-white dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 14 16"
                    >
                      <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                    </svg>
                    <span className="sr-only">Start Time</span>
                  </button>
                  <div
                    id="tooltip-start"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                  >
                    Start Time
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>

                  <button
                    data-tooltip-target="tooltip-restart"
                    type="button"
                    className="p-2.5 group bg-gray-100 rounded-full hover:bg-gray-200 me-4 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
                      />
                    </svg>
                    <span className="sr-only">Restart</span>
                  </button>
                  <div
                    id="tooltip-restart"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                  >
                    Restart
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>

                <div class="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    14:45
                  </span>
                  <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-800">
                    <div
                      class="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    20:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="block sm:flex">
          {/* Article Section */}
          <div className="sm:w-3/5 p-4 shadow sm:mr-4 my-4 text-lg bg-white dark:bg-gray-800 rounded-xl border">
            Musical Maladies Norman M. Weinberger reviews the latest work of
            Oliver Sacks on music. A Music and the brain are both endlessly
            fascinating subjects, and as a neuroscientist specialising in
            auditory learning and memory, I find them especially intriguing. So
            I had high expectations of Musicophilia, the latest offering from
            neurologist and prolific author Oliver Sacks. And I confess to
            feeling a little guilty reporting that my reactions to the book are
            mixed. B Sacks himself is the best part of Musicophilia. He richly
            documents his own life in the book and reveals highly personal
            experiences. The photograph of him on the cover of the book - which
            shows him wearing headphones, eyes closed, clearly enchanted as he
            listens to Alfred Brendel perform Beethoven&#39;s Pathetique Sonata -
            makes a positive impression that is borne out by the contents of the
            book. Sack&#39;s voice throughout is steady and erudite but never
            pontifical. He is neither self-conscious nor self-promoting. C The
            preface gives a good idea of what the book will deliver. In it Sacks
            explains that he wants to convey the insights gleaned from the
            "enormous and rapidly growing body of work on the neural
            underpinnings of musical perception and images, and the complex and
            often bizarre disorders to which these are prone.” He also stresses
            the importance of "the simple art of observation" and "the richness
            of the human context.” He wants to combine "observation and
            description with the latest in technology,” he says, and to
            imaginatively enter into the experience of his patients and
            subjects. The readers can see that Sacks, who has been practicing
            neurology for 40 years, is torn between the "old-fashioned" path of
            observation and the newfangled, high-tech approach: He knows that he
            needs to take heed of the latter, but his heart lies with the
            former. D The book consists mainly of detailed descriptions of
            cases, most of them involving patients whom Sacks has seen in his
            practice. Brief discussions of contemporary neuroscientific reports
            are sprinkled liberally throughout the text. Part Ⅰ"Haunted by
            Music," begins with the strange case of Tony Cicoria, a nonmusical,
            middle-aged surgeon who was consumed by a love of music after being
            hit by lightning. He suddenly began to crave listening to piano
            music, which he had never cared for in the past. He started to play
            the piano and then to compose music, which arose spontaneously in
            his mind in a "torrent" of notes. How could this happen? Was the
            cause psychological? (He had had a near-death experience when the
            lightning struck him.) Or was it the direct result of a change in
            the auditory regions of his cerebral cortex? Electroencephalography
            (EEG) showed his brain waves to be normal in the mid-1990s, just
            after his trauma and subsequent "conversion" to music. There are now
            more sensitive tests, but Cicoria has declined to undergo them; he
            does not want to delve into the cause of his musicality. What a
            shame! E Part II, “A Range of Musicality,” covers a wider variety of
            topics, but unfortunately, some of the chapters offer little or
            nothing that is new. For example, chapter 13, which is five pages
            long, merely notes that the blinds often have better hearing than
            the sighted. The most interesting chapters are those that present
            the strangest cases. Chapter 8 is about “amusia”，an inability to
            hear sounds as music, and “dysharmonia”，a highly specific
            impairment of the ability to hear harmony, with the ability to
            understand melody left intact. Such specific “dissociations” are
            found throughout the cases Sacks recounts. F To Sacks&#39; credit, Part
            III, “Memory, Movement and Music,” brings us into the
            underappreciated realm of music therapy. Chapter 16 explains how
            “melodic intonation therapy” is being used to help expressive
            aphasic patients (those unable to express their thoughts verbally
            following a stroke or cerebral incident) once again become capable
            of fluent speech. In chapter 20, Sacks demonstrates the
            near-miraculous power of music to animate Parkinson&#39;s patients and
            other people with sever movement disorders, even those who are
            frozen into odd postures. Scientists cannot yet explain how music
            achieves this effect. G To reader who are unfamiliar with
            neuroscience and music behavior, Musicophilia maybe something of a
            revelation. But the book will not satisfy those seeking the causes
            and implications of the phenomena Sacks describes. For one thing,
            Sacks appears to be more at ease discussing patients than discussing
            experiments. And he tends to be rather uncritical in accepting
            scientific findings and theories. H It&#39;s true that the causes of
            music-brain oddities remain poorly understood. However, Sacks could
            have done more to draw out some of the implications of the careful
            observations that he and other neurologists have made and of the
            treatments that have been successful. For example, he might have
            noted that the many specific dissociations among comprehension, such
            as loss of the ability to perceive harmony but not melody, indicate
            that there no music centre in the brain. Because many people who
            read the book are likely to believe in the brain localisation of all
            mental functions, this was a missed educational opportunity. I
            Another conclusion on: cold draw is that there seem to be no "cures"
            for neurological problems involving music. A drug can alleviate a
            symptom in one patient and aggravate it in another, or can have both
            positive and negative effects in the same patient. Treatments
            mentioned seem to be almost exclusively antiepileptic medications,
            which "damp down" the excitability of the brain in general; their
            effectiveness varies widely. J Finally, in many of the cases
            described here the patient with music-brain symptoms is reported to
            have ‘normal&#39; EEG results. Although Sacks recognises the existence
            of new technologies, among them far more sensitive ways to analyse
            brain waves than the standard neurological EEG test, he does not
            call for their use. In fact, although he exhibits the greatest
            compassion for patients, he conveys no sense of urgency about the
            pursuit of new avenues in the diagnosis and treatment of music-brain
            disorders. This absence echoes the book&#39;s preface, in which Sacks
            expresses fear that “the simple art of observation may be lost” if
            we rely too much on technologies. He does call for both approaches,
            though, and we can only hope that the neurological community will
            respond.
            {/* Add your article content here */}
          </div>

          {/* Question-Answer Section */}
          <div className="sm:w-2/5 p-4 shadow sm:ml-4 my-4  bg-white dark:bg-gray-800 p-4 rounded-xl border">
            {/* Add your question-answer content here */}
            <h2 className="text-2xl font-bold mb-4">
              Question and Answer Section
            </h2>
            <p>Choose the correct answer.</p>
            {/* Add your question-answer components or content */}
          </div>
        </section>
      </div>
    </>
  );
}

export default ReadingTestPage;
