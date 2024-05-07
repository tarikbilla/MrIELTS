import { useRouter } from "next/router";
import Head from "next/head";
import { Breadcrumb, Button, Badge, Label, Radio, Table } from "flowbite-react";
import { HiHome, HiCheck, HiClock } from "react-icons/hi";
import AudioPlayer from "../../../components/pageComponents/listeningTest/audioPlayer";

function ReadingTestPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Replace this with your actual data fetching logic
  // For demonstration purposes, I&#39;ll use a placeholder data object
  const listeningTestData = {
    title: `Listening Test - ${slug}`,
    description: "This is a sample reading test page.",
    // Add more properties as needed
  };

  return (
    <>
      <Head>
        <title>{listeningTestData.title}</title>
        <meta name="description" content={listeningTestData.description} />
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
                <Breadcrumb.Item href="/online-test/listening/">
                  Listening Test
                </Breadcrumb.Item>
                <Breadcrumb.Item>Level 1</Breadcrumb.Item>
                <Breadcrumb.Item>Test 2</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <h1 className="text-4xl font-extrabold mb-4">
              {listeningTestData.title}
            </h1>
            <p>
              You should spend about 20 minutes on Questions 27-40 which are
              based on the Reading Passage below.
            </p>

            
            <div className="flex">
                Status:{" "}
                <Badge color="failure" className="text-center">
                  Pending
                </Badge>
              </div>
          </div>

          {/*end sidebar*/}
        </section>

        <section className="block sm:flex">
          {/* Question-Answer Section */}
          <div className="sm:w-4/5 p-4 shadow my-4 sm:mr-4  bg-white dark:bg-gray-800 p-4 rounded-xl border">
            <div className="mb-4 flex justify-between w-full">
              <AudioPlayer src={'/audio/test.mp3'} />
              

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
                    <Radio id="TRUEq1" name="q1" value="TRUE" defaultChecked />
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
                    <Radio id="TRUEq2" name="q2" value="TRUE" defaultChecked />
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
                    <Radio id="TRUEq3" name="q3" value="TRUE" defaultChecked />
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
                    <Radio id="TRUEq4" name="q4" value="TRUE" defaultChecked />
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
              <Button type="submit" color="failure">
                Submit My Answers
              </Button>
            </div>
          </div>

          {/* Article Section */}
          <div className="sm:w-3/5 p-4 shadow my-4 text-lg bg-white dark:bg-gray-800 rounded-xl border">
            <div className="content-title text-center">
              <h2 className="inline-block mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Anawer Sheet
              </h2>
            </div>
            <div>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <Table striped hoverable>
                    <Table.Head>
                      <Table.HeadCell>Q.No</Table.HeadCell>
                      <Table.HeadCell>Your Answer</Table.HeadCell>
                      <Table.HeadCell>Currect Answer</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {"True"}
                        </Table.Cell>
                        <Table.Cell>True</Table.Cell>
                        <Table.Cell>
                          <Badge color="success">Currect</Badge>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          False
                        </Table.Cell>
                        <Table.Cell>True</Table.Cell>
                        <Table.Cell>
                          <Badge color="failure">Wrong</Badge>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>3</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          Accessories
                        </Table.Cell>
                        <Table.Cell>Accessories</Table.Cell>
                        <Table.Cell>
                          <Badge color="success">Currect</Badge>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>4</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          Phone
                        </Table.Cell>
                        <Table.Cell>Phone</Table.Cell>
                        <Table.Cell>
                          <Badge color="success">Currect</Badge>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>5</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          Apple
                        </Table.Cell>
                        <Table.Cell>Wearables</Table.Cell>
                        <Table.Cell>
                          <Badge color="failure">Wrong</Badge>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>

              <div className="mb-4">
                <div className="space-y-6">
                  <h2 className="text-lg font-bold mt-4">Overview</h2>
                  <Table hoverable>
                    <Table.Body className="divide-y border">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-bold">
                          Total Question
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          5
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-bold">
                          Currect Answer
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          3
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-bold">
                          Wrong Answer
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          2
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-bold">
                          Your Scores
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          6
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ReadingTestPage;
