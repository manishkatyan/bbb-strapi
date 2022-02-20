import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Box } from "@strapi/design-system/Box";
import copy from "copy-to-clipboard";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Flex } from "@strapi/design-system/Flex";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Button } from "@strapi/design-system/Button";
import { IconButton } from "@strapi/design-system/IconButton";
import { Alert } from '@strapi/design-system/Alert';
import Play from "@strapi/icons/Play";
import Trash from "@strapi/icons/Trash";
import LinkIcon from "./LinkIcon";
import ConfirmDialog from "./ConfirmDialog";

import {
  startBBB,
  joinBBB,
  deleteClass,
  isClassRunning,
} from "../../utils/apiCalls";

const runningClass = (bbbId) => {
  // const running = await isClassRunning(bbbId)
  return false;
  // return running
};

const ClassTable = ({ classData, deleteAction }) => {
  let { url } = useRouteMatch();
  const [showAlert, setShowAlert] = useState(false)
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [isVisible, setIsVisible] = useState(false);
  const [classId, setClassId] = useState(false);

  useEffect(async () => { }, [isVisible, classData]);

  const handleCloseDialog = () => {
    setIsVisible(false);
  };

  const handleInvite = (bbbClassdata) => {
    const url = `${window.location.origin}/bigbluebutton/class/join/invite/${bbbClassdata.uid}`
    const inviteText = `Join BigBlueButton.\n${url} \nModerator Code: ${bbbClassdata.moderatorAccessCode}\nViewer Code: ${bbbClassdata.viewerAccessCode}`
    copy(inviteText)
    setShowAlert(true)
  }

  const handleJoinClass = async (uid, fullName, classParams) => {
    const data = {
      fullName,
      meetingID: classParams.bbbId,
      password: classParams.moderatorAccessCode
        ? classParams.moderatorAccessCode
        : "mp",
    };
    const res = await joinBBB(uid, fullName, data);
    if (res.status === 200) {
      window.location.replace(res.data.joinURL);
    }
  };

  const handleDeleteClass = async (id) => {
    await deleteClass(id);
    setIsVisible(false);
    deleteAction();
  };

  return (
    <>
      <Box padding={8} paddingTop={5} background="neutral100">
        {showAlert ? <Alert closeLabel="Close alert" variant="success" title="" onClose={() => { setShowAlert(false) }}>Invite link has been copied to Clipboard.</Alert> : ''}
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">S.No</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Class</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Access Code</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Action</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          {classData && classData.length > 0 ? (
            <Tbody>
              {classData.map((bbbClass, index) => (
                <Tr key={bbbClass.id}>
                  <Td>
                    <Typography textColor="neutral800">
                      {parseInt(index) + 1}
                    </Typography>
                  </Td>

                  <Td>
                    <Typography textColor="neutral800">
                      {bbbClass.className}
                    </Typography>
                  </Td>
                  <Td>
                    <Box>
                      <Typography textColor="neutral800">
                        Moderator&nbsp;:&nbsp;
                        {bbbClass.moderatorAccessCode
                          ? bbbClass.moderatorAccessCode
                          : "NA"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography textColor="neutral800">
                        Viewer&nbsp;:&nbsp;
                        {bbbClass.viewerAccessCode
                          ? bbbClass.viewerAccessCode
                          : "NA"}
                      </Typography>
                    </Box>
                  </Td>
                  <Td>
                    <Flex>
                      <Box>
                        <Typography textColor="neutral800">
                          {runningClass(bbbClass.bbbId) ? (
                            <Button
                              endIcon={<Play />}
                              onClick={() => handleJoinClass(bbbClass.uid, "Admin", bbbClass)}
                            >
                              Join Class
                            </Button>
                          ) : (
                            <Link
                              to={`${url}/join/moderator/${bbbClass.uid}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button endIcon={<Play />}>Start Class</Button>
                            </Link>
                          )}
                        </Typography>
                      </Box>

                      <Box paddingLeft={2}>
                        <Typography textColor="neutral800">
                          <Button variant="secondary" onClick={() => { handleInvite(bbbClass) }} endIcon={<LinkIcon />}>
                            Invite
                          </Button>
                        </Typography>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex>
                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => {
                            setIsVisible(true);
                            setClassId(bbbClass.id);
                          }}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                          data-toggle="dialog"
                          data-target={`#delete_${bbbClass.id}`}
                        />
                        {classId ? (
                          <ConfirmDialog
                            dialogId={`delete_${classId}`}
                            isVisible={isVisible}
                            handleClose={handleCloseDialog}
                            handleDelete={() => handleDeleteClass(classId)}
                          />
                        ) : (
                          ""
                        )}
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            ""
          )}
        </Table>
      </Box>
    </>
  );
};

export default ClassTable;
