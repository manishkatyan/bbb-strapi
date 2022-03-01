import React, { useState, useEffect, memo } from "react";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Button } from "@strapi/design-system/Button";
import { Divider } from "@strapi/design-system/Divider";
import Modal from "./Modal";
import ClassTable from "./Table";
import { getClass } from "../../utils/apiCalls";

const BigBlueButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState(0);
  const [classData, setClassData] = useState([]);
  const handleCloseModal = () => {
    setIsVisible(false);
  };
  const handleCreateClass = () => setIsVisible(true);
  const deleteAction = () => {
    setAction(action + 1);
  };

  useEffect(async () => {
    const res = await getClass();
    if (res.status === 200) {
      setClassData(res.data);
    }
  }, [isVisible, action]);
  return (
    <>
      <Box>
        <Box paddingTop={8} paddingLeft={8}>
          <Typography variant="alpha">
            Manage BigBlueButton Online Classes
          </Typography>
          <Box>
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
              .
            </Typography>
          </Box>
        </Box>
        <Box padding={3}>
          <Divider />
        </Box>
        <Grid>
          <GridItem padding={1} col={7} xs={12}></GridItem>
          <GridItem padding={1} col={3} xs={12}></GridItem>
          <GridItem padding={1} col={2} xs={12}>
            <Button onClick={() => setIsVisible((prev) => !prev)}>
              Create Class
            </Button>
            <Modal
              isVisible={isVisible}
              handleClose={handleCloseModal}
              handleCreate={handleCreateClass}
            />
          </GridItem>
        </Grid>

        {classData && classData.length > 0 ? (
          <ClassTable classData={classData} deleteAction={deleteAction} />
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default memo(BigBlueButton);
