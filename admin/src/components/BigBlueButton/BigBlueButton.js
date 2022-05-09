import React, { useState, useEffect, memo } from "react";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Button } from "@strapi/design-system/Button";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import Plus from "@strapi/icons/Plus";
import Modal from "./Modal";
import ClassTable from "./Table";
import SettingLink from "./SettingLink";
import { getClass } from "../../utils/apiCalls";

const BigBlueButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState(0);
  const [classData, setClassData] = useState([]);
  const handleCloseModal = () => {
    setIsVisible(false);
  };
  const handleClickCreate = () => setIsVisible(true);

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
        <Box paddingTop={6} paddingLeft={7}>
          <Typography variant="alpha">
            Manage BigBlueButton Online Classes
          </Typography>
        </Box>
        <Box padding={3}>
          <Divider />
        </Box>

        <Modal isVisible={isVisible} handleClose={handleCloseModal} />

        {classData && classData.length > 0 ? (
          <ClassTable
            classData={classData}
            deleteAction={deleteAction}
            handleClickCreate={handleClickCreate}
          />
        ) : (
          <Box padding={7} background="neutral100">
            <EmptyStateLayout
              icon={<ExclamationMarkCircle />}
              content="You don't have any content yet..."
              action={
                <Button
                  variant="secondary"
                  startIcon={<Plus />}
                  onClick={handleClickCreate}
                >
                  Create your first class
                </Button>
              }
            />
          </Box>
        )}

        <Box paddingLeft={7} paddingRight={7}>
          <SettingLink />
        </Box>
      </Box>
    </>
  );
};

export default memo(BigBlueButton);
