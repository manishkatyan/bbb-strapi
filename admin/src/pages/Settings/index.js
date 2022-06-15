import React, { useState, useEffect } from 'react';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import Check from '@strapi/icons/Check';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { TextInput } from '@strapi/design-system/TextInput';
import { Typography } from '@strapi/design-system/Typography';
import { Link } from '@strapi/design-system/Link';
import { Flex } from '@strapi/design-system/Flex';
import { Loader } from '@strapi/design-system/Loader';
import { Alert } from '@strapi/design-system/Alert';
import { checkBBB, bigBlueButtonSetting, getBigBlueButtonSetting } from '../../utils/apiCalls';

const Settings = () => {
  const [url, setUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [isCorrectUrl, setIsCorrectUrl] = useState(false);
  const [errorUrl, setErrorUrl] = useState('');
  const [errorSecret, setErrorSecret] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getBigBlueButtonSetting();

      if (response.data.ok) {
        setUrl(response.data?.url ? response.data.url : '');
        setSecret(response.data?.url ? response.data.secret : '');
      }
    })();
  }, []);

  const handleChangeUrl = e => {
    setUrl(e.target.value);
    setErrorUrl('');
    setIsCorrectUrl(false);
    setError('');
  };

  const handleChangeSecret = e => {
    setSecret(e.target.value);
    setErrorSecret('');
    setIsCorrectUrl(false);
    setError('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    if (!url && !secret) {
      setErrorUrl('Please enter BigBlueButton url');
      setErrorSecret('Please enter BigBlueButton secret');
      setIsSubmitting(false);
    } else if (!url) {
      setErrorUrl('Please enter BigBlueButton url');
      setIsSubmitting(false);
    } else if (!secret) {
      setErrorSecret('Please enter BigBlueButton secret');
      setIsSubmitting(false);
    } else {
      let trimUrl;

      if (url.endsWith('/api')) {
        trimUrl = url.slice(0, -4);
      } else if (url.endsWith('/')) {
        trimUrl = url.slice(0, -1);
      } else {
        trimUrl = url;
      }

      const response = await checkBBB(trimUrl, secret);

      if (response.data.returncode === 'SUCCESS') {
        setIsCorrectUrl(true);
        setErrorUrl('');

        const saveCredential = await bigBlueButtonSetting(trimUrl, secret);

        if (saveCredential.data.ok) {
          setShowAlert(true);
          setIsSubmitting(false);
        }
      } else if (response.data.returncode === 'FAILED') {
        setError('Please enter valid BigBlueButton url/secret');
        setIsCorrectUrl(false);
        setIsSubmitting(false);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <Main>
      <SettingsPageTitle name="BigBlueButton" />
      <HeaderLayout title="BigBlueButton Configuration" primaryAction="" />
      <ContentLayout>
        <Box paddingBottom={2}>
          {showAlert ? (
            <Alert
              closeLabel="Close alert"
              title="BigBlueButton"
              variant="success"
              onClose={() => {
                setShowAlert(false);
              }}
            >
              URL and Secret saved successfully.
            </Alert>
          ) : (
            ''
          )}
        </Box>
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box>
            <Typography variant="delta">Configuration</Typography>
          </Box>
          <Box paddingBottom={2} paddingTop={1}>
            <Typography variant="omega">
              You can replace the default BigBlueButton URL and Secret with your own server details.
            </Typography>
          </Box>
          <Box>
            <Grid gap={5}>
              <GridItem col={6} s={12}>
                <Box paddingTop={5} paddingBottom={2}>
                  <TextInput
                    name="url"
                    label="BigBlueButton URL"
                    value={url}
                    error={errorUrl || ''}
                    onChange={handleChangeUrl}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingTop={5} paddingBottom={2}>
                  <TextInput
                    name="secret"
                    label="BigBlueButton Secret"
                    value={secret}
                    error={errorSecret || ''}
                    onChange={handleChangeSecret}
                  />
                </Box>
              </GridItem>
            </Grid>

            <Grid gap={5}>
              <GridItem col={9} s={11}>
                <Box paddingTop={5}>
                  {error ? <Typography textColor="danger500">{error}</Typography> : ''}
                  {isCorrectUrl ? (
                    <Typography textColor="success500">Connection Verified</Typography>
                  ) : (
                    ''
                  )}
                  {isSubmitting ? (
                    <Flex>
                      <Loader small>Loading content...</Loader>&nbsp;
                      <Typography textColor="primary600">Verifying Connection</Typography>
                    </Flex>
                  ) : (
                    ''
                  )}
                </Box>
              </GridItem>
              <GridItem col={3} s={2}>
                <Flex justifyContent="end" paddingTop={4}>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                    startIcon={<Check />}
                    size="L"
                  >
                    Save
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <br />
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box paddingTop={2}>
            <Grid gap={4}>
              <GridItem col={6} s={12}>
                <Link href="https://higheredlab.com/" isExternal>
                  Start Free Trial of BigBlueButton
                </Link>
              </GridItem>
              <GridItem col={6} s={12}>
                <Typography variant="pi">
                  Need help? Contact us at : support@higheredlab.com
                </Typography>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ContentLayout>
    </Main>
  );
};

export default Settings;
