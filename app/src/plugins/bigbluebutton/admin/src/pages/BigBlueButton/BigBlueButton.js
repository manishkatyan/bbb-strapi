import React, { useState, memo } from "react";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Button } from "@strapi/design-system/Button";
import { Divider } from "@strapi/design-system/Divider";
import Modal from "./Modal";
import ClassTable from "./Table";

const BigBlueButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleCloseModal = () => setIsVisible((prev) => !prev);

  const handleCreateClass = () => setIsVisible((prev) => !prev);

  return (
    <>
      <Box>
        <Box paddingTop={8} paddingLeft={8}>
          <Typography variant="alpha">
            Manage BigBlueButton Online Classes
          </Typography>
        </Box>
        <Box padding={3}>
          <Divider />
        </Box>
        <Grid
          gap={{
            desktop: 5,
            tablet: 2,
            mobile: 1,
          }}
        >
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

        <ClassTable />
      </Box>
    </>
  );
};

export default memo(BigBlueButton);
