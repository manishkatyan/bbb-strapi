import React, { useState } from 'react';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Accordion, AccordionToggle, AccordionContent } from '@strapi/design-system/Accordion';
import AceEditorSnippet from './AceEditorSnippet';

const ApiCreateEndPoint = () => {
  const [expandCreateClass, setExpandCreateClass] = useState(false);
  const [expandCreateClassApi, setExpandCreateClassApi] = useState(false);
  const [expandCreate, setExpandCreate] = useState(false);
  const [expandJoin, setExpandJoin] = useState(false);
  const [expandDemo, setExpandDemo] = useState(false);

  return (
    <div>
      <Flex direction="column" alignItems="start" paddingTop={2} paddingBottom={4}>
        <Box>
          <Typography variant="delta" textColor="neutral800" as="h2" id="title">
            API End-points
          </Typography>
        </Box>
        <Box>
          <Typography variant="omega">
            Simple API end-points that you can easily integrate in your Frontend app to enable
            online classes.
          </Typography>
        </Box>
      </Flex>

      {/* Api endpoint to create class */}
      <Box paddingRight={2} paddingBottom={2}>
        <Typography variant="delta">API End-point to Create Class</Typography>
        <Box paddingTop={2}>
          <Typography variant="epsilon">
            Use the API call below to create classes in bigbluebutton. <br />
            You can just pass the class name and meetingId api will create a class for you.
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
                    "${window.location.origin}/bigbluebutton/class",{
                      className: 'demo',
                      meetingId: 'democlass123'
                    }
                   )
                   `}
        </Typography>
      </Box>
      <Box paddingRight={2} paddingBottom={4}>
        <Box>
          <Typography variant="epsilon">
            You would get the similar response object as below.
          </Typography>
        </Box>
      </Box>
      <Box padding={4} background="neutral100">
        <Accordion
          expanded={expandCreateClass}
          toggle={() => setExpandCreateClass(s => !s)}
          id="acc-1"
          size="S"
        >
          <AccordionToggle title="Response Object" />
          <AccordionContent>
            <Box padding={3}>
              <Typography>
                <AceEditorSnippet
                  height="400px"
                  value={`
        {
          id: 1
          className: "demo"
          meetingId: "democlass123"
          moderatorAccessCode: "mp"
          viewerAccessCode: "ap"
          bbbSettings: {
          moderatorApproval: false
          maxParticipants: 100
          logoutURL: "https://higheredlab.com/"
          allowModsToUnmuteUsers: false
          lockSettingsDisablePrivateChat: false
          logo: "https://higheredlab.com/wp-content/uploads/hel.png"
          muteOnStart: false
          userdata-bbb_skip_check_audio: "false"
          userdata-bbb_listen_only_mode: "true"
          }
        }
                      `}
                />
              </Typography>
            </Box>
          </AccordionContent>
        </Accordion>
      </Box>

      <Box paddingRight={2} paddingBottom={4}>
        <Box>
          <br />
          <Typography variant="epsilon">
            You can also pass custom parameters while creating class .
          </Typography>
        </Box>
      </Box>
      <Box padding={4} background="neutral100">
        <Accordion
          expanded={expandCreateClassApi}
          toggle={() => setExpandCreateClassApi(s => !s)}
          id="acc-1"
          size="S"
        >
          <AccordionToggle title="Response Object" />
          <AccordionContent>
            <Box padding={3}>
              <Typography>
                <AceEditorSnippet
                  height="400px"
                  value={`
    const response = await axios.post(
      "${window.location.origin}/bigbluebutton/class",
        {
          className: "demo"
          meetingId: "democlass123"
          moderatorAccessCode: "mp"
          viewerAccessCode: "ap"
          bbbSettings: {
          moderatorApproval: false
          maxParticipants: 100
          logoutURL: "https://higheredlab.com/"
          allowModsToUnmuteUsers: false
          lockSettingsDisablePrivateChat: false
          logo: "https://higheredlab.com/wp-content/uploads/hel.png"
          muteOnStart: false
          userdata-bbb_skip_check_audio: "false"
          userdata-bbb_listen_only_mode: "true"
          }
        }
        )
                      `}
                />
              </Typography>
            </Box>
          </AccordionContent>
        </Accordion>
      </Box>

      {/* Api endpoint start class */}
      <Box paddingRight={2} paddingBottom={2} paddingTop={7}>
        <Typography variant="delta">API End-point to Start Class</Typography>
        <Box paddingTop={2}>
          <Typography variant="epsilon">
            Use the API call below to start a BigBlueButton class and join as a moderator (teacher).{' '}
            <br />
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
                    "${window.location.origin}/bigbluebutton/class/start/democlass123",{
                     moderatorName:""
                    }
                   )`}
        </Typography>
      </Box>
      <Box paddingRight={2} paddingBottom={4}>
        <Box>
          <Typography variant="epsilon">
            You would get joinURL in the response object, where you should redirect your user to
            start a class and join as a moderator.
          </Typography>
        </Box>
      </Box>
      <Box padding={4} background="neutral100">
        <Accordion
          expanded={expandCreate}
          toggle={() => setExpandCreate(s => !s)}
          id="acc-1"
          size="S"
        >
          <AccordionToggle title="Response Object" />
          <AccordionContent>
            <Box padding={3}>
              <Typography>
                {`{
                        "joinURL": "https://api.asyncweb.io/abf87846/bigbluebutton/api/join?fullName=Teacher&meetingID=democlass123&\npassword=****&checksum=8d3f92a599c9c1e3f792a4983c159b0e157bce33"
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
          {/* This block code will redirected moderator to bigbluebutton meeting */}
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
      {/* Api endpoint join class */}
      <Box paddingRight={2} paddingBottom={3} paddingTop={7}>
        <Typography variant="delta">API End-point to Join Class</Typography>
        <Box paddingTop={2}>
          <Typography variant="epsilon">
            Use the API call below to join a BigBlueButton class as a viewer (student). <br />
            You can pass the viewer name as a parameter.
          </Typography>
        </Box>
      </Box>
      <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
        <Typography>
          {`const response = await axios.post(
                   " ${window.location.origin}/bigbluebutton/class/join/democlass123",{
                     viewerName:""
                   }
                  ) `}
        </Typography>
      </Box>
      <Box paddingRight={2} paddingBottom={4}>
        <Box>
          <Typography variant="epsilon">
            You would get joinURL in the response object, where you should redirect your user to
            start a class and join as a viewer.
          </Typography>
        </Box>
      </Box>
      <Box padding={4} background="neutral100">
        <Accordion expanded={expandJoin} toggle={() => setExpandJoin(s => !s)} id="acc-1" size="S">
          <AccordionToggle title="Response Object" />
          <AccordionContent>
            <Box padding={3}>
              <Typography>
                {`{
                        "joinURL": "https://api.asyncweb.io/abf87846/bigbluebutton/api/join?fullName=Student&meetingID=democlass123&\npassword=****&checksum=8d3f92a599c9c1e3f792a4983c159b0e157bce33"
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
          {/* This block code will redirected viewer to bigbluebutton meeting */}
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
            toggle={() => setExpandDemo(s => !s)}
            id="acc-1"
            size="S"
          >
            <AccordionToggle title="Sample API End-points implementation" />
            <AccordionContent>
              <Box padding={3}>
                <AceEditorSnippet
                  height="800px"
                  value={`
export default function App() {
  const handleClickCreate = async () => {
    const response = await axios.post(
      "${window.location.origin}/bigbluebutton/class",
      {
        className: "demo",
        meetingId: 'democlass123'
      }
    );

    console.log(response);
  };
  const handleClickStart = async () => {
    const response = await axios.post(
      "${window.location.origin}/bigbluebutton/class/start/democlass123",
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
      "${window.location.origin}/bigbluebutton/class/join/democlass123",
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
        <h2>Create Class</h2>

          <button className="btn btn-primary" onClick={handleClickCreate}>
            Create Class
          </button>

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
                />
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
      </Box>
    </div>
  );
};

export default ApiCreateEndPoint;
