import React, { useState, useEffect } from "react";
import { SettingsPageTitle } from "@strapi/helper-plugin";
import Check from "@strapi/icons/Check";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { HeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import { Main } from "@strapi/design-system/Main";
import { TextInput } from "@strapi/design-system/TextInput";
import { Typography } from "@strapi/design-system/Typography";
import { Link } from "@strapi/design-system/Link";
import CheckCircle from "@strapi/icons/CheckCircle";
import Refresh from "@strapi/icons/Refresh";
import { Alert } from "@strapi/design-system/Alert";
import {
  checkBBB,
  bigBlueButtonSetting,
  getBigBlueButtonSetting,
} from "../../utils/apiCalls";

const Settings = () => {
  const [url, setUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [iscorrectUrl, setIsCorrectUrl] = useState(false);

  const [errorUrl, setErrorUrl] = useState("");
  const [errorSecret, setErrorSecret] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(async () => {
    const response = await getBigBlueButtonSetting();

    if (response.data.ok) {
      setUrl(response.data?.url ? response.data.url : "");
      setSecret(response.data?.url ? response.data.secret : "");
    }
  }, []);

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
    setErrorUrl("");
    setIsCorrectUrl(false);
    setError("");
  };

  const handleChangeSecret = (e) => {
    setSecret(e.target.value);
    setErrorSecret("");
    setIsCorrectUrl(false);
    setError("");
  };

  const verifyUrlAndSecret = async () => {
    setIsVerifying(true);
    if (url && secret) {
      let trimUrl;
      if (url.endsWith("/api")) {
        trimUrl = url.slice(0, -4);
      } else if (url.endsWith("/")) {
        trimUrl = url.slice(0, -1);
      } else {
        trimUrl = url;
      }
      const response = await checkBBB(trimUrl, secret);

      if (response.data.returncode === "SUCCESS") {
        setIsCorrectUrl(true);
        setErrorUrl("");
        setIsVerifying(false);
      } else if (response.data.returncode === "FAILED") {
        setError("Please enter valid BigBlueButton url/secret");
        setIsCorrectUrl(false);
        setIsVerifying(false);
      }
    } else if (!url) {
      setErrorUrl("Please enter BigBlueButton url");
      setIsVerifying(false);
    } else if (!secret) {
      setErrorSecret("Please enter BigBlueButton secret");
      setIsVerifying(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!url && !secret) {
      setErrorUrl("Please enter BigBlueButton url");
      setErrorSecret("Please enter BigBlueButton secret");
      setIsSubmitting(false);
    } else if (!url) {
      setErrorUrl("Please enter BigBlueButton url");
      setIsSubmitting(false);
    } else if (!secret) {
      setErrorSecret("Please enter BigBlueButton secret");
      setIsSubmitting(false);
    } else {
      let trimUrl;
      if (url.endsWith("/api")) {
        trimUrl = url.slice(0, -4);
      } else if (url.endsWith("/")) {
        trimUrl = url.slice(0, -1);
      } else {
        trimUrl = url;
      }
      const response = await bigBlueButtonSetting(trimUrl, secret);

      if (response.data.ok) {
        setShowAlert(true);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Main>
      <SettingsPageTitle name="BigBlueButton" />
      <HeaderLayout
        title="BigBlueButton Configuration"
        primaryAction={
          <Button
            type="submit"
            loading={isSubmitting}
            onClick={handleSubmit}
            startIcon={<Check />}
            size="L"
          >
            Save
          </Button>
        }
      />
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
            ""
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
              Enter your BigBlueButton URL and Secret below to connect to it.
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
                    error={errorUrl ? errorUrl : ""}
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
                    error={errorSecret ? errorSecret : ""}
                    onChange={handleChangeSecret}
                  />
                </Box>
              </GridItem>
            </Grid>

            <Grid gap={5}>
              <GridItem col={9} s={11}>
                <Box paddingTop={5}>
                  {error ? (
                    <Typography textColor="danger500">{error}</Typography>
                  ) : (
                    ""
                  )}
                </Box>
              </GridItem>
              <GridItem col={3} s={2}>
                {iscorrectUrl ? (
                  <Box paddingTop={5} paddingLeft={9}>
                    <Button startIcon={<CheckCircle />} variant="success">
                      Verified
                    </Button>
                  </Box>
                ) : (
                  <Box paddingTop={5} paddingLeft={9}>
                    <Button
                      startIcon={<Refresh />}
                      variant="secondary"
                      loading={isVerifying}
                      onClick={verifyUrlAndSecret}
                    >
                      Verify Connection
                    </Button>
                  </Box>
                )}
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
                  Create a trial account to get a free BigBlueButton server
                </Link>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ContentLayout>
    </Main>
  );
};

export default Settings;
