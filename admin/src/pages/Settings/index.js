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
import Information from "@strapi/icons/Information";
import CheckCircle from "@strapi/icons/CheckCircle";
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
              url and secret saved successfully
            </Alert>
          ) : (
            ""
          )}
        </Box>
        <Box shadow="tableShadow" background="neutral0" padding={3}>
          <Box>
            <Typography variant="delta">Configuration</Typography>
          </Box>
          <Box paddingBottom={2}>
            <Typography variant="omega">
              Enter your BigBlueButton URL and Secret below to connect to it. In
              case you don&apos;t have one, create a free trial account &nbsp;
              <a
                href="https://higheredlab.com/"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
              &nbsp;.
            </Typography>
          </Box>
          <Box padding={2}>
            <Grid gap={5}>
              <GridItem col={6} s={12}>
                <Box paddingTop={5} paddingBottom={2}>
                  <TextInput
                    name="url"
                    label="BigBlueButton Url"
                    placeholder="BigBlueButton Url"
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
                    placeholder="BigBlueButton Secret"
                    label="BigBlueButton Secret"
                    value={secret}
                    error={errorSecret ? errorSecret : ""}
                    onChange={handleChangeSecret}
                  />
                </Box>
              </GridItem>
            </Grid>

            <Grid gap={5}>
              <GridItem col={11} s={11}>
                <Box paddingTop={5}>
                  {error ? (
                    <Typography textColor="danger500">{error}</Typography>
                  ) : (
                    ""
                  )}
                </Box>
              </GridItem>
              <GridItem col={1} s={1}>
                {iscorrectUrl ? (
                  <Box paddingTop={5}>
                    <Button startIcon={<CheckCircle />} variant="success">
                      Verified
                    </Button>
                  </Box>
                ) : (
                  <Box paddingTop={5}>
                    <Button
                      startIcon={<Information />}
                      variant="secondary"
                      loading={isVerifying}
                      onClick={verifyUrlAndSecret}
                    >
                      Verify
                    </Button>
                  </Box>
                )}
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ContentLayout>
    </Main>
  );
};

export default Settings;
