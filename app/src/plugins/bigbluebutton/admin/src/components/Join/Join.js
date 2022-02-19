import React, { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { TextInput } from "@strapi/design-system/TextInput";
import { Button } from "@strapi/design-system/Button";
import { Divider } from "@strapi/design-system/Divider";
import { getClassById } from "../../utils/apiCalls";
import { startBBB } from "../../utils/apiCalls";

const Join = () => {
  const { userRole, classUid } = useParams();

  useEffect(async () => {
    const response = await getClassById(classUid);

    if (response.status === 200) {
      setClassDetail(response.data);
      userRole === "moderator"
        ? setAccessCode(response.data.moderatorAccessCode)
        : "";
    }
  }, []);

  const [name, setName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [classDetail, setClassDetail] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const handleAccessCodeChange = (e) => {
    setAccessCode(e.target.value);
    setCodeError("");
  };

  const handleJoinClass = async (classParams) => {
    if (!name && !accessCode) {
      setNameError("Name is required");
      setCodeError("Access code is required");
    } else if (!name) {
      setNameError("Name is required");
    } else if (!accessCode) {
      setCodeError("Access code is required");
    } else if (
      accessCode !== classParams.moderatorAccessCode &&
      accessCode !== classParams.viewerAccessCode
    ) {
      setCodeError("Please enter valid access code");
    } else {
      const data = {
        name: classParams.className,
        meetingID: classParams.bbbId,
        moderatorPW: classParams.moderatorAccessCode
          ? classParams.moderatorAccessCode
          : "mp",
        attendeePW: classParams.viewerAccessCode
          ? classParams.viewerAccessCode
          : "ap",
        duration: 0,
        record: false,
        meetingKeepEvents: true,
        "meta_bbb-origin": "bbb-strapi",
      };
      if (classParams.bbbSettings?.moderatorApproval) {
        data.guest = true;
        data.guestPolicy = "ASK_MODERATOR";
      }

      if (classParams.bbbSettings?.muteViewerjoin) {
        data.muteOnStart = true;
      }

      const res = await startBBB(classParams.uid, data, name);
      if (res.status === 200) {
        window.location.replace(res.data.joinURL);
      }
    }
  };

  return (
    <Box>
      <Box paddingTop={8} paddingLeft={8}>
        <Typography variant="alpha">Join BigBlueButton Class</Typography>
      </Box>
      <Box padding={3}>
        <Divider />
      </Box>
      <Grid paddingTop={5}>
        <GridItem col={1}></GridItem>
        <GridItem col={10}>
          <Box
            shadow="tableShadow"
            background="neutral0"
            paddingTop={3}
            paddingBottom={3}
          >
            <Grid gap={5} justifyContent="center" alignItems="center">
              <GridItem col={5}>
                <Box padding={4}>
                  <TextInput
                    placeholder="Enter your name"
                    aria-label="name"
                    name="name"
                    value={name}
                    error={nameError ? nameError : ""}
                    onChange={handleNameChange}
                  />
                </Box>
              </GridItem>

              <GridItem col={5}>
                <Box padding={4}>
                  <TextInput
                    placeholder="Enter access Code"
                    type="number"
                    aria-label="accessCode"
                    name="accessCode"
                    value={accessCode}
                    error={codeError ? codeError : ""}
                    onChange={handleAccessCodeChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={2}>
                <Box padding={4}>
                  <Button
                    variant="default"
                    onClick={() => handleJoinClass(classDetail)}
                  >
                    Join Class
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
        <GridItem col={1}></GridItem>
      </Grid>
    </Box>
  );
};

export default Join;
