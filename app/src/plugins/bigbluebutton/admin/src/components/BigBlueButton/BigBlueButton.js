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
  const [action, setAction] = useState('');
  const [classData, setClassData] = useState([]);
  const handleCloseModal = () => { setIsVisible(false); console.log("Close") };
  const handleCreateClass = () => setIsVisible(true);
  const deleteAction = () => { setAction('delete') }

  useEffect(async () => {
    const res = await getClass()
    if (res.status === 200) {
      setClassData(res.data)
    }
  }, [isVisible, action]);
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
        <Grid >
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

        {classData && classData.length > 0 ? <ClassTable classData={classData} deleteAction={deleteAction} /> : ""}
      </Box>
    </>
  );
};

export default memo(BigBlueButton);
