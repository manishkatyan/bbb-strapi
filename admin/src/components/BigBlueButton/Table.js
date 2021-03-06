import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { Box } from '@strapi/design-system/Box';
import copy from 'copy-to-clipboard';
import { Table, Thead, Tbody, Tr, Td, Th, TFooter } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Button } from '@strapi/design-system/Button';
import { Alert } from '@strapi/design-system/Alert';
import Play from '@strapi/icons/Play';
import Trash from '@strapi/icons/Trash';
import Plus from '@strapi/icons/Plus';
import Cog from '@strapi/icons/Cog';
import LinkIcon from './LinkIcon';
import ConfirmDialog from './ConfirmDialog';
import ApiEndPointModal from './ApiEndPointModal';

import { deleteClass } from '../../utils/apiCalls';

const ClassTable = ({ classData, deleteAction, handleClickCreate }) => {
  let { url } = useRouteMatch();
  const [showAlert, setShowAlert] = useState(false);
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [isVisible, setIsVisible] = useState(false);
  const [classId, setClassId] = useState(false);
  const [isApiModalVisible, setApiModalVisible] = useState(false);
  const [meetingId, setMeetingId] = useState('');

  useEffect(() => {}, [isVisible, classData]);

  const handleCloseDialog = () => {
    setIsVisible(false);
  };

  const handleInvite = bbbClassdata => {
    const url = `${window.location.origin}/bigbluebutton/class/join/${bbbClassdata.meetingId}`;
    const inviteText = `Join ${bbbClassdata.className}.\n${url} \nAccess Code: ${bbbClassdata.viewerAccessCode}`;
    copy(inviteText);
    setShowAlert(true);
  };

  const handleDeleteClass = async id => {
    await deleteClass(id);
    setIsVisible(false);
    deleteAction();
  };

  const handleCloseApiModal = () => setApiModalVisible(false);

  return (
    <>
      <ApiEndPointModal
        meetingId={meetingId}
        isVisibleModal={isApiModalVisible}
        handleCloseModal={handleCloseApiModal}
      />
      <Box
        paddingTop={6}
        paddingBottom={6}
        paddingLeft={7}
        paddingRight={7}
        background="neutral100"
      >
        <Box paddingBottom={2}>
          {showAlert ? (
            <Alert
              closeLabel="Close alert"
              variant="success"
              title=""
              onClose={() => {
                setShowAlert(false);
              }}
            >
              Invite link has been copied to Clipboard.
            </Alert>
          ) : (
            ''
          )}
        </Box>
        <Table
          colCount={COL_COUNT}
          rowCount={ROW_COUNT}
          footer={
            <TFooter icon={<Plus />} onClick={handleClickCreate} data-testid="create-class-modal">
              Create New Class
            </TFooter>
          }
        >
          <Thead>
            <Tr>
              <Th>
                <Box paddingLeft={2}>
                  <Typography variant="sigma">Class</Typography>
                </Box>
              </Th>

              <Th>
                <Box paddingLeft={2}>
                  <Typography variant="sigma">Access Code</Typography>
                </Box>
              </Th>
              <Th>
                <Box paddingLeft={2}>
                  <Typography variant="sigma">Action</Typography>
                </Box>
              </Th>
            </Tr>
          </Thead>
          {classData && classData.length > 0 ? (
            <Tbody>
              {classData.map((bbbClass, index) => (
                <Tr key={bbbClass.id}>
                  <Td>
                    <Typography textColor="neutral800" textTransform="capitalize">
                      {bbbClass.className}
                    </Typography>
                  </Td>
                  <Td>
                    <Box>
                      <Typography textColor="neutral800">
                        Moderator&nbsp;:&nbsp;
                        {bbbClass.moderatorAccessCode ? bbbClass.moderatorAccessCode : 'NA'}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography textColor="neutral800">
                        Viewer&nbsp;:&nbsp;
                        {bbbClass.viewerAccessCode ? bbbClass.viewerAccessCode : 'NA'}
                      </Typography>
                    </Box>
                  </Td>
                  <Td>
                    <Flex>
                      <Box>
                        <Typography textColor="neutral800">
                          <Link
                            to={`${url}/join/moderator/${bbbClass.meetingId}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Button startIcon={<Play />} data-testid={`start-class-${index + 1}`}>
                              Start Class
                            </Button>
                          </Link>
                        </Typography>
                      </Box>

                      <Box paddingLeft={2}>
                        <Typography textColor="neutral800">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              handleInvite(bbbClass);
                            }}
                            startIcon={<LinkIcon />}
                          >
                            Invite
                          </Button>
                        </Typography>
                      </Box>
                      <Box paddingLeft={2}>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setApiModalVisible(true);
                            setMeetingId(bbbClass.meetingId);
                          }}
                          startIcon={<Cog />}
                        >
                          API End-points
                        </Button>
                      </Box>

                      <Box paddingLeft={2}>
                        <Button
                          variant="danger-light"
                          onClick={() => {
                            setIsVisible(true);
                            setClassId(bbbClass.id);
                          }}
                          startIcon={<Trash />}
                          data-toggle="dialog"
                          data-target={`#delete_${bbbClass.id}`}
                        >
                          Delete
                        </Button>
                        {classId ? (
                          <ConfirmDialog
                            dialogId={`delete_${classId}`}
                            isVisible={isVisible}
                            handleClose={handleCloseDialog}
                            handleDelete={() => handleDeleteClass(classId)}
                          />
                        ) : (
                          ''
                        )}
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            ''
          )}
        </Table>
      </Box>
    </>
  );
};

ClassTable.propTypes = {
  classData: PropTypes.any.isRequired,
  deleteAction: PropTypes.any.isRequired,
  handleClickCreate: PropTypes.any.isRequired,
};

export default ClassTable;
