import React, { useState } from "react";
import AceEditor from "react-ace";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from "@strapi/design-system/Button";
import { Flex } from "@strapi/design-system/Flex";
import { Box } from "@strapi/design-system/Box";
import { Divider } from "@strapi/design-system/Divider";
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
} from "@strapi/design-system/Accordion";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const ApiEndPointModal = ({ classUid, isVisibleModal, handleCloseModal }) => {
  const [expandCreate, setExpandCreate] = useState(false);
  const [expandJoin, setExpandJoin] = useState(false);
  const [expandDemo, setExpandDemo] = useState(false);

  return (
    <>
      {isVisibleModal && (
        <ModalLayout onClose={handleCloseModal} labelledBy="title">
          <ModalHeader>
            <Flex direction="column" alignItems="start">
              <Box>
                <Typography
                  fontWeight="bold"
                  variant="beta"
                  textColor="neutral800"
                  as="h2"
                  id="title"
                >
                  API End-points
                </Typography>
              </Box>
              <Box>
                <Typography variant="omega">
                  Simple API end-points that you can easily integrate in your
                  Frontend app to enable online classes.
                </Typography>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Box paddingRight={2} paddingBottom={2}>
              <Typography variant="delta">
                API End-point to Start Class
              </Typography>
              <Box paddingTop={2}>
                <Typography variant="epsilon">
                  Use the API call below to start a BigBlueButton class and join
                  as a moderator (teacher). <br />
                  You can pass the moderator name as a parameter.
                </Typography>
              </Box>
            </Box>
            <Box
              background="neutral100"
              paddingTop={3}
              paddingBottom={4}
              paddingLeft={5}
              paddingRight={5}
              marginTop={4}
              marginBottom={4}
            >
              <Typography>
                {`const response = await axios.post(
                    "${window.location.origin}/bigbluebutton/api/class/start/${classUid}",{
                     moderatorName:""
                    }
                   )`}
              </Typography>
            </Box>
            <Box paddingRight={2} paddingBottom={4}>
              <Box>
                <Typography variant="epsilon">
                  You would get joinURL in the response object, where you should
                  redirect your user to start a class and join as a moderator.
                </Typography>
              </Box>
            </Box>
            <Box padding={4} background="neutral100">
              <Accordion
                expanded={expandCreate}
                toggle={() => setExpandCreate((s) => !s)}
                id="acc-1"
                size="S"
              >
                <AccordionToggle title="Response Object" />
                <AccordionContent>
                  <Box padding={3}>
                    <Typography>
                      {`{
                        "joinURL": "https://api.asyncweb.io/abf87846/bigbluebutton/api/join?fullName=Teacher&meetingID=chemistry1&\npassword=****&checksum=8d3f92a599c9c1e3f792a4983c159b0e157bce33"
                      }`}
                    </Typography>
                  </Box>
                </AccordionContent>
              </Accordion>
            </Box>
            <Box
              background="neutral100"
              paddingTop={3}
              paddingBottom={4}
              paddingLeft={5}
              paddingRight={5}
              marginTop={4}
              marginBottom={4}
            >
              <Typography>
                {`// This block code will redirected moderator to bigbluebutton meeting`}
              </Typography>
              <Box>
                <Typography>
                  {`
                if (response.data.joinURL) {
                  window.open(response.data.joinURL, "_blank");
                }
                `}
                </Typography>
              </Box>
            </Box>
            <Box paddingRight={2} paddingBottom={3} paddingTop={7}>
              <Typography variant="delta">
                API End-point to Join Class
              </Typography>
              <Box paddingTop={2}>
                <Typography variant="epsilon">
                  Use the API call below to join a BigBlueButton class as a
                  viewer (student). <br />
                  You can pass the viewer name as a parameter.
                </Typography>
              </Box>
            </Box>
            <Box
              background="neutral100"
              padding={2}
              marginTop={4}
              marginBottom={4}
            >
              <Typography>
                {`const response = await axios.post(
                   " ${window.location.origin}/bigbluebutton/api/class/join/${classUid}",{
                     viewerName:""
                   }
                  ) `}
              </Typography>
            </Box>
            <Box paddingRight={2} paddingBottom={4}>
              <Box>
                <Typography variant="epsilon">
                  You would get joinURL in the response object, where you should
                  redirect your user to start a class and join as a viewer.
                </Typography>
              </Box>
            </Box>
            <Box padding={4} background="neutral100">
              <Accordion
                expanded={expandJoin}
                toggle={() => setExpandJoin((s) => !s)}
                id="acc-1"
                size="S"
              >
                <AccordionToggle title="Response Object" />
                <AccordionContent>
                  <Box padding={3}>
                    <Typography>
                      {`{
                        "joinURL": "https://api.asyncweb.io/abf87846/bigbluebutton/api/join?fullName=Student&meetingID=chemistry1&\npassword=****&checksum=8d3f92a599c9c1e3f792a4983c159b0e157bce33"
                      }`}
                    </Typography>
                  </Box>
                </AccordionContent>
              </Accordion>
            </Box>
            <Box
              background="neutral100"
              paddingTop={3}
              paddingBottom={4}
              paddingLeft={5}
              paddingRight={5}
              marginTop={4}
              marginBottom={4}
            >
              <Typography>
                {`// This block code will redirected viewer to bigbluebutton meeting`}
              </Typography>
              <Box>
                <Typography>
                  {`
                if (response.data.joinURL) {
                  window.open(response.data.joinURL, "_blank");
                }
                `}
                </Typography>
              </Box>
            </Box>
            <Box paddingTop={4}>
              <Divider />
            </Box>
            <Box paddingTop={6}>
              <Box padding={4} background="neutral100">
                <Accordion
                  expanded={expandDemo}
                  toggle={() => setExpandDemo((s) => !s)}
                  id="acc-1"
                  size="S"
                >
                  <AccordionToggle title="Sample API End-points implementation" />
                  <AccordionContent>
                    <Box padding={3}>
                      <AceEditor
                        placeholder="BigBlueButton Settings"
                        mode="javascript"
                        theme="github"
                        name="demoCode"
                        fontSize={18}
                        showPrintMargin={true}
                        showGutter={false}
                        highlightActiveLine={false}
                        showGutter={true}
                        readOnly={true}
                        height="800px"
                        width="680px"
                        value={`
export default function App() {
  const handleClickStart = async () => {
    const response = await axios.post(
      "${window.location.origin}/bigbluebutton/api/class/start/${classUid}",
      {
        moderatorName: "Moderator"
      }
    );
    if (response.data.joinURL) {
      window.open(response.data.joinURL, "_blank");
    }
  };

  const handleClickJoin = async () => {
    const response = await axios.post(
      "${window.location.origin}/bigbluebutton/api/class/join/${classUid}",
      { viewerName: "Viewer" }
    );
    
    if (response.data.joinURL) {
      window.open(response.data.joinURL, "_blank");
    }
  };

  return (
    <div>
      <h1 >BigBlueButton API Endpoints Demo</h1>
      <hr />
      <div >
        <div>
          <h2> Moderator (teacher)</h2>

          <button  onClick={handleClickStart}>
            start meeting
          </button>
        </div>
        <div>
          <h2 > Viewer (student)</h2>

          <button className="btn btn-primary" onClick={handleClickJoin}>
            Join meeting
          </button>
        </div>
      </div>
    </div>
  );
}
                    `}
                        setOptions={{
                          enableBasicAutocompletion: false,
                          enableLiveAutocompletion: false,
                          enableSnippets: false,
                          showLineNumbers: false,
                          tabSize: 2,
                        }}
                      />
                    </Box>
                  </AccordionContent>
                </Accordion>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseModal} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button onClick={handleCloseModal}>Close</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ApiEndPointModal;
