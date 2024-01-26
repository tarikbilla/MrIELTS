"use client";
import { useRouter } from "next/router";
import Head from "next/head";
import { Breadcrumb, Button, Badge, Label, Radio, Table } from "flowbite-react";
import { HiHome, HiCheck, HiClock } from "react-icons/hi";
import ReadingAnswerSheet from "../../../components/pageComponents/readingTest/readingAnswerSheet";
import ReadingHeaderRightTimerSidebar from "../../../components/pageComponents/readingTest/readingHeaderRightTimerSidebar";

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
            <h1 className="text-4xl font-extrabold mb-4">
              {readingTestData.title}

            </h1>
            <p>
              You should spend about 20 minutes on Questions 27-40 which are
              based on the Reading Passage below.
            </p>
          </div>

          <ReadingHeaderRightTimerSidebar />{/*end sidebar*/}
        </section>

        <section className="block sm:flex">
          {/* Article Section */}
          <div className="sm:w-3/5 p-4 shadow sm:mr-4 my-4 text-lg bg-white dark:bg-gray-800 rounded-xl border">
            <div className="content-title text-center">
              <h2 className="inline-block mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Voyage of Going beyond the blue line
              </h2>
            </div>
            <ol
              type="A"
              className="space-y-4 text-gray-500 list-decimal list-inside dark:text-gray-400"
            >
              <li>
                One feels a certain sympathy for Captain James Cook on the day
                in 1778 that he “discovered” Hawaii. Then on his third
                expedition to the Pacific, the British navigator had explored
                scores of islands across the breadth of the sea, from lush New
                Zealand to the lonely wastes of Easter Island. This latest
                voyage had taken him thoTRUEnds of miles north from the Society
                Islands to an archipelago so remote that even the old
                Polynesians back on Tahiti knew nothing about it. Imagine Cook’s
                surprise, then, when the natives of Hawaii came paddling out in
                their canoes and greeted him in a familiar tongue, one he had
                heard on virtually every mote of inhabited land he had visited.
                Marvelling at the ubiquity of this Pacific language and culture,
                he later wondered in his journal: “How shall we account for this
                Nation spreading itself so far over this Vast ocean?”
              </li>

              <li>
                Answers have been slow in coming. But now a startling
                archaeological find on the island of Éfaté, in the Pacific
                nation of Vanuatu, has revealed an ancient seafaring people, the
                distant ancestors of today’s Polynesians, taking their first
                steps into the unknown. The discoveries there have also opened a
                window into the shadowy world of those early voyagers. At the
                same time, other pieces of this human puzzle are turning up in
                unlikely places. Climate data gleaned from slow-growing corals
                around the Pacific and from sediments in alpine lakes in South
                America may help explain how, more than a thoTRUEnd years later,
                the second wave of seafarers beat their way across the entire
                Pacific.
              </li>
              <li>
                “What we have is a first- or second-generation site containing
                the graves of some of the Pacific’s first explorers,” says
                Spriggs, professor of archaeology at the Australian National
                University and co-leader of an international team excavating the
                site. It came to light only by luck. A backhoe operator, digging
                up topsoil on the grounds of a derelict coconut plantation,
                scraped open a grave – the first of dozens in a burial ground
                some 3,000 years old. It is the oldest cemetery ever found in
                the Pacific islands, and it harbors the bones of an ancient
                people archaeologists call the Lapita, a label that derives from
                a beach in New Caledonia where a landmark cache of their pottery
                was found in the 1950s. They were daring blue-water adventurers
                who roved the sea not just as explorers but also as pioneers,
                bringing along everything they would need to build new lives –
                their families and livestock, taro seedlings and stone tools.
              </li>

              <li>
                Within the span of few centuries, the Lapita stretched the
                boundaries of their world from the jungle-clad volcanoes of
                Papua New Guinea to the loneliest coral outliers of Tonga, at
                least 2,000 miles eastward in the Pacific. Along the way they
                explored millions of square miles of an unknown sea, discovering
                and colonizing scores of tropical islands never before seen by
                human eyes: Vanuatu, New Caledonia, Fiji, Samoa.
              </li>

              <li>
                What little is known or surmised about them has been pieced
                together from fragments of pottery, animal bones, obsidian
                flakes, and such oblique sources as comparative linguistics and
                geochemistry. Although their voyages can be traced back to the
                northern islands of Papua New Guinea, their language – variants
                of which are still spoken across the Pacific – came from Taiwan.
                And their peculiar style of pottery decoration, created by
                pressing a carved stamp into the clay, probably had its roots in
                the northern Philippines. With the discovery of the Lapita
                cemetery on Éfaté, the volume of data available to researchers
                has expanded dramatically. The bones of at least 62 individuals
                have been uncovered so far – including old men, young women,
                even babies – and more skeletons are known to be in the ground.
                Archaeologists were also thrilled to discover six complete
                Lapita pots. It’s an important find, Spriggs says, for it
                conclusively identifies the remains as Lapita. “It would be hard
                for anyone to argue that these aren’t Lapita when you have human
                bones enshrined inside what is unmistakably a Lapita urn.”
              </li>
              <li>
                Several lines of evidence also undergird Spriggs’s conclusion
                that this was a community of pioneers making their first voyages
                into the remote reaches of Oceania. For one thing, the
                radiocarbon dating of bones and charcoal places them early in
                the Lapita expansion. For another, the chemical makeup of the
                obsidian flakes littering the site indicates that the rock
                wasn’t local; instead, it was imported from a large island in
                Papua New Guinea’s the Bismarck Archipelago, the springboard for
                the Lapita’s thrust into the Pacific. A particularly intriguing
                clue comes from chemical tests on the teeth of several
                skeletons. DNA teased from these ancient bones may also help
                answer one of the most puzzling questions in Pacific
                anthropology: Did all Pacific islanders spring from one source
                or many? Was there only one outward migration from a single
                point in Asia, or several from different points? “This
                represents the best opportunity we’ve had yet,” says Spriggs,
                “to find out who the Lapita actually were, where they came from,
                and who their closest descendants are today.”
              </li>
              <li>
                “There is one stubborn question for which archaeology has yet to
                provide any answers: How did the Lapita accomplish the ancient
                equivalent of a moon landing, many times over? No one has found
                one of their canoes or any rigging, which could reveal how the
                canoes were sailed. Nor do the oral histories and traditions of
                later Polynesians offer any insights, for they segue into myth
                long before they reach as far back in time as the Lapita.” All
                we can say for certain is that the Lapita had canoes that were
                capable of ocean voyages, and they had the ability to sail
                them,” says Geoff Irwin, a professor of archaeology at the
                University of Auckland and an avid yachtsman. Those sailing
                skills, he says, were developed and passed down over thoTRUEnds
                of years by earlier mariners who worked their way through the
                archipelagoes of the western Pacific making short crossings to
                islands within sight of each other. Reaching Fiji, as they did a
                century or so later, meant crossing more than 500 miles of
                ocean, pressing on day after day into the great blue void of the
                Pacific. What gave them the courage to lunch out on such a risky
                voyage?
              </li>
              <li>
                The Lapita’s thrust into the Pacific was eastward, against the
                prevailing trade winds, Irwin notes. Those nagging headwinds, he
                argues, may have been the key to their success. “They could sail
                out for days into the unknown and reconnoiter, secure in the
                knowledge that if they didn’t find anything, they could turn
                about and catch a swift ride home on the trade winds. It’s what
                made the whole thing work.” Once out there, skilled seafarers
                would detect abundant leads to follow to land: seabirds and
                turtles, coconuts and twigs carried out to sea by the tides and
                the afternoon pileup of clouds on the horizon that often
                betokens an island in the distance. Some islands may have
                broadcast their presence with far less subtlety than a cloud
                bank. Some of the most violent eruptions anywhere on the planet
                during the past 10,000 years occurred in Melanesia, which sits
                nervously in one of the most explosive volcanic regions on
                Earth. Even less spectacular eruptions would have sent plumes of
                smoke billowing into the stratosphere and rained ash for
                hundreds of miles. It’s possible that the Lapita saw these signs
                of distant islands and later sailed off in their direction,
                knowing they would find land. For returning explorers,
                successful or not, the geography of their own archipelagoes
                provided a safety net to keep them from overshooting their home
                ports and sailing off into eternity.
              </li>
              <li>
                However they did it, the Lapita spread themselves a third of the
                way across the Pacific, the called it quits for reasons known
                only to them. Ahead lay the vast emptiness of the central
                Pacific, and perhaps they were too thinly stretched to venture
                farther. They probably never numbered more than a few thoTRUEnd
                in total, and in their rapid migration eastward they encountered
                hundreds of islands – more than 300 in Fiji alone. Still, more
                than a millennium would pass before the Lapita’s descendants, a
                people we now call the Polynesians, struck out in search of new
                territory.
              </li>
            </ol>
          </div>

          {/* Question-Answer Section */}
          <div className="sm:w-2/5 p-4 shadow sm:ml-4 my-4  bg-white dark:bg-gray-800 p-4 rounded-xl border">
            
          <div className="mb-4 flex justify-between gap-4">
              <div><ReadingAnswerSheet readingId="2"/></div>
              <div className="flex">Status: <Badge color="failure" className="text-center">Pending</Badge></div>
            </div>
            {/* Add your question-answer content here */}
            <h2 className="text-2xl font-bold mb-4">
              Question and Answer Section
            </h2>
            <div className="instructions mb-4 border-b py-2">
              <p>
                Do the following statements agree with the information given in
                the Reading Passage?.
              </p>
              <p className="font-bold">Choose the correct answer:</p>

              <p>
                <b>TRUE</b> -if the statement is TRUE
              </p>
              <p>
                <b>FALSE</b> -if the statement is FALSE
              </p>
              <p>
                <b>NOT GIVEN</b> - if the information is not given in the
                passage
              </p>
            </div>

            <div className="questio-section-1 mb-4 border-b py-2">
              {/* Radio Item */}
              <div className="radio-item mb-4">
                <fieldset className="flex max-w-md flex-col gap-4">
                  <legend className="mb-4 font-bold">
                    1. Captain Cook once expected Hawaii might speak another
                    language of people from other pacific islands.
                  </legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="TRUEq1"
                      name="q1"
                      value="TRUE"
                      defaultChecked
                    />
                    <Label htmlFor="TRUEq1">TRUE</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="FALSEq1" name="q1" value="FALSE" />
                    <Label htmlFor="FALSEq1">FALSE</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="NOTGIVENq1" name="q1" value="NOTGIVEN" />
                    <Label htmlFor="NOTGIVENq1">NOT GIVEN</Label>
                  </div>
                </fieldset>
              </div>

              {/* Radio Item */}
              <div className="radio-item mb-4">
                <fieldset className="flex max-w-md flex-col gap-4">
                  <legend className="mb-4 font-bold">
                    2. Captain Cook once expected Hawaii might speak another
                    language of people from other pacific islands.
                  </legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="TRUEq2"
                      name="q2"
                      value="TRUE"
                      defaultChecked
                    />
                    <Label htmlFor="TRUEq2">TRUE</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="FALSEq2" name="q2" value="FALSE" />
                    <Label htmlFor="FALSEq2">FALSE</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="NOTGIVENq2" name="q2" value="NOTGIVEN" />
                    <Label htmlFor="NOTGIVENq2">NOT GIVEN</Label>
                  </div>
                </fieldset>
              </div>

              {/* Radio Item */}
              <div className="radio-item mb-4">
                <fieldset className="flex max-w-md flex-col gap-4">
                  <legend className="mb-4 font-bold">
                    3. Captain Cook once expected Hawaii might speak another
                    language of people from other pacific islands.
                  </legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="TRUEq3"
                      name="q3"
                      value="TRUE"
                      defaultChecked
                    />
                    <Label htmlFor="TRUEq3">TRUE</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="FALSEq3" name="q3" value="FALSE" />
                    <Label htmlFor="FALSEq3">FALSE</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="NOTGIVENq3" name="q3" value="NOTGIVEN" />
                    <Label htmlFor="NOTGIVENq3">NOT GIVEN</Label>
                  </div>
                </fieldset>
              </div>

              {/* Radio Item */}
              <div className="radio-item mb-4">
                <fieldset className="flex max-w-md flex-col gap-4">
                  <legend className="mb-4 font-bold">
                    4. Captain Cook once expected Hawaii might speak another
                    language of people from other pacific islands.
                  </legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="TRUEq4"
                      name="q4"
                      value="TRUE"
                      defaultChecked
                    />
                    <Label htmlFor="TRUEq4">TRUE</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="FALSEq4" name="q4" value="FALSE" />
                    <Label htmlFor="FALSEq4">FALSE</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="NOTGIVENq4" name="q4" value="NOTGIVEN" />
                    <Label htmlFor="NOTGIVENq4">NOT GIVEN</Label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="test-section-2 py-4 my-4 border-b">
              <p className="font-bold my-4">
                Complete the following summary of the paragraphs of Reading
                Passage Using ONE WORD ONLY from the Reading Passage for each
                answer. Write your answers in boxes 5-7.{" "}
              </p>
              <p>
                Tests show the human remains and the charcoal found in the
                buried urn are from the start of the Lapita period. Yet the 5{" "}
                <input
                  type="text"
                  placeholder="Your Answer here"
                  className="text-center border-b-2 border-dashed border-indigo-600 outline-none"
                />{" "}
                covering many of the Efate sites did not come from that area.
                Then examinations carried out on the 6{" "}
                <input
                  type="text"
                  placeholder="Your Answer here"
                  className="text-center border-b-2 border-dashed border-indigo-600 outline-none"
                />{" "}
                discovered at Efate site reveal that not everyone buried there
                was a native living in the area. In fact, DNA could identify the
                Lapita’s nearest 7{" "}
                <input
                  type="text"
                  placeholder="Your Answer here"
                  className="text-center border-b-2 border-dashed border-indigo-600 outline-none"
                />{" "}
                present-days.
              </p>
            </div>

            <div className="question-section-3 py-2 my-4 border-b">
              <p className="font-bold">
                Answer the questions below.
                <br /> Choose NO MORE THAN THREE WORDS AND/OR A NUMBER from the
                passage for each answer.
              </p>
              <p className="my-4">
                8.{" "}
                <input
                  type="text"
                  placeholder="Your Answer here"
                  className="text-center border-b-2 border-dashed border-indigo-600 outline-none"
                />
                What did the Lapita travel in when they crossed the oceans?
              </p>
              <p className="my-4">
                9.{" "}
                <input
                  type="text"
                  placeholder="Your Answer here"
                  className="text-center border-b-2 border-dashed border-indigo-600 outline-none"
                />
                In Irwins’s view, what would the Lapita have relied on to bring
                them fast back to the base?
              </p>
              <p className="my-4">
                10.{" "}
                <input
                  type="text"
                  placeholder="Your Answer here"
                  className="text-center border-b-2 border-dashed border-indigo-600 outline-none"
                />
                Which sea creatures would have been an indication to the Lapita
                of where to find land?
              </p>
            </div>

            <div className="question-submit-section">
              <Button type="submit" color="failure">Submit My Answers</Button>
              
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ReadingTestPage;
