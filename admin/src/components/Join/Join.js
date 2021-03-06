/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Link } from '@strapi/design-system/Link';
import ExternalLink from '@strapi/icons/ExternalLink';
import ArrowLeft from '@strapi/icons/ArrowLeft';
import { getClassByMeetingId, startBBB } from '../../utils/apiCalls';

const Join = () => {
  const { userRole, meetingId } = useParams();
  const [name, setName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [nameError, setNameError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [classDetail, setClassDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getClassByMeetingId(meetingId);

      if (response.status === 200) {
        setClassDetail(response.data);

        userRole === 'moderator' ? setAccessCode(response.data.moderatorAccessCode) : '';
      }
    })();
  }, [meetingId, userRole]);

  const handleNameChange = e => {
    setName(e.target.value);
    setNameError('');
  };

  const handleAccessCodeChange = e => {
    setAccessCode(e.target.value);
    setCodeError('');
  };

  const handleJoinClass = async classParams => {
    setIsLoading(true);

    if (!name && !accessCode) {
      setNameError('Name is required');
      setCodeError('Access code is required');
      setIsLoading(false);
    } else if (!name) {
      setNameError('Name is required');
      setIsLoading(false);
    } else if (!accessCode) {
      setCodeError('Access code is required');
      setIsLoading(false);
    } else if (
      accessCode !== classParams.moderatorAccessCode &&
      accessCode !== classParams.viewerAccessCode
    ) {
      setCodeError('Please enter valid access code');
      setIsLoading(false);
    } else {
      const res = await startBBB(classParams.meetingId, name);

      if (res.status === 200) {
        window.open(res.data.joinURL, '_blank');
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Box paddingLeft={7} paddingTop={6}>
        <Link to="/plugins/bigbluebutton-strapi" startIcon={<ArrowLeft />}>
          Back
        </Link>
      </Box>
      <Box paddingTop={4} paddingLeft={7}>
        <Typography variant="alpha">Join {classDetail.className} Class</Typography>
      </Box>
      <Box padding={3}>
        <Divider />
      </Box>
      <Box paddingTop={6} paddingLeft={7} paddingRight={7}>
        <Grid>
          <GridItem col={12}>
            <Box
              shadow="tableShadow"
              background="neutral0"
              paddingTop={6}
              paddingBottom={6}
              paddingLeft={7}
              paddingRight={7}
            >
              <Grid gap={5} justifyContent="center" alignItems="center">
                <GridItem col={5}>
                  <Box>
                    <TextInput
                      placeholder="Enter your name"
                      aria-label="name"
                      name="name"
                      value={name}
                      error={nameError || ''}
                      onChange={handleNameChange}
                      data-testid="moderator-name"
                    />
                  </Box>
                </GridItem>
                <GridItem col={5}>
                  <Box>
                    <TextInput
                      placeholder="Enter access Code"
                      type="number"
                      aria-label="accessCode"
                      name="accessCode"
                      value={accessCode}
                      error={codeError || ''}
                      onChange={handleAccessCodeChange}
                    />
                  </Box>
                </GridItem>
                <GridItem col={2}>
                  <Box>
                    <Button
                      variant="default"
                      loading={isLoading}
                      startIcon={<ExternalLink />}
                      onClick={() => handleJoinClass(classDetail)}
                      data-testid="join-class"
                    >
                      Join Class
                    </Button>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Join;
