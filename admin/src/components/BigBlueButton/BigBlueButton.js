import React, { useState, useEffect, memo } from 'react';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { HeaderLayout } from '@strapi/design-system/Layout';
import Plus from '@strapi/icons/Plus';
import Modal from './Modal';
import ClassTable from './Table';
import SettingLink from './SettingLink';
import { getClass } from '../../utils/apiCalls';

const createClass = (loading, classData, deleteAction, handleClickCreate) => {
  let htmlCode;

  if (loading) {
    htmlCode = '';
  } else if (classData && classData.length > 0) {
    htmlCode = (
      <ClassTable
        classData={classData}
        deleteAction={deleteAction}
        handleClickCreate={handleClickCreate}
      />
    );
  } else {
    htmlCode = (
      <Box padding={7} background="neutral100">
        <EmptyStateLayout
          icon=""
          content=""
          action={
            <Button
              variant="secondary"
              startIcon={<Plus />}
              onClick={handleClickCreate}
              data-testid="create-class-modal"
            >
              Create a Class
            </Button>
          }
        />
      </Box>
    );
  }

  return htmlCode;
};

const BigBlueButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState(0);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCloseModal = () => {
    setIsVisible(false);
  };
  const handleClickCreate = () => setIsVisible(true);

  const deleteAction = () => {
    setAction(action + 1);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getClass();

      if (res.status === 200) {
        setClassData(res.data);
        setLoading(false);
      }
    }
    fetchData();
  }, [isVisible, action]);

  return (
    <div>
      <Box>
        <HeaderLayout
          title="Start Online Classes on BigBlueButton"
          subtitle="BigBlueButton is like-Zoom for online classes, but at a much lower cost, with better analytics, and is white-labelled."
          as="h2"
        />

        <Modal isVisible={isVisible} handleClose={handleCloseModal} />
        {createClass(loading, classData, deleteAction, handleClickCreate, handleClickCreate)}
        <Box paddingLeft={7} paddingRight={7}>
          <SettingLink />
        </Box>
      </Box>
    </div>
  );
};

export default memo(BigBlueButton);
