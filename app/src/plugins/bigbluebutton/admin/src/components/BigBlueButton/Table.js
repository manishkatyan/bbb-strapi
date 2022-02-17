import React, { useState, useEffect } from "react";
import { Box } from "@strapi/design-system/Box";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Flex } from "@strapi/design-system/Flex";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Button } from "@strapi/design-system/Button";
import { IconButton } from "@strapi/design-system/IconButton";
import Play from "@strapi/icons/Play";
import Trash from "@strapi/icons/Trash";
import Link from "@strapi/icons/Link";
import ConfirmDialog from "./ConfirmDialog";
import { startBBB, deleteClass } from "../../utils/apiCalls";

const ClassTable = ({ classData, deleteAction }) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [isVisible, setIsVisible] = useState(false);
  const [classId, setClassId] = useState(false);

  useEffect(async () => {
  }, [isVisible, classData]);

  const handleCloseDialog = () => {
    setIsVisible(false);
  };

  const handleStartClass = async (classParams) => {
    const data = {
      name: classParams.className,
      meetingID: classParams.bbbId,
      moderatorPW: classParams.moderatorAccessCode ? classParams.moderatorAccessCode : "mp",
      attendeePW: classParams.viewerAccessCode ? classParams.viewerAccessCode : "ap",
      duration: 0,
      record: false,
      meetingKeepEvents: true,
      'meta_bbb-origin': 'bbb-strapi'
    }
    if (classParams.bbbSettings?.moderatorApproval) {
      data.guest = true
      data.guestPolicy = 'ASK_MODERATOR'
    }

    if (classParams.bbbSettings?.muteViewerjoin) {
      data.muteOnStart = true
    }

    const res = await startBBB(classParams.uid, data, "Admin")
    if (res.status === 200) {
      window.location.replace(res.data.joinURL)
    }
  }

  const handleDeleteClass = async (id) => {
    await deleteClass(id)
    setIsVisible(false);
    deleteAction()
  };

  return (<>
    <Box padding={8} paddingTop={5} background="neutral100">
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
                  <Typography textColor="neutral800">{parseInt(index) + 1}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{bbbClass.className}</Typography>
                </Td>
                <Td>
                  <Box>
                    <Typography textColor="neutral800">
                      Moderator&nbsp;:&nbsp;
                      {bbbClass.moderatorAccesCode ? bbbClass.moderatorAccesCode : "NA"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography textColor="neutral800">
                      Viewer&nbsp;:&nbsp;
                      {bbbClass.viewerAccessCode ? bbbClass.viewerAccessCode : "NA"}
                    </Typography>
                  </Box>
                </Td>
                <Td>
                  <Flex>
                    <Box>
                      <Typography textColor="neutral800">
                        <Button
                          endIcon={<Play />}
                          onClick={() => handleStartClass(bbbClass)}>
                          Start Class
                        </Button>
                      </Typography>
                    </Box>

                    <Box paddingLeft={2}>
                      <Typography textColor="neutral800">
                        <Button variant="secondary" endIcon={<Link />}>
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
                        onClick={() => { setIsVisible(true); setClassId(bbbClass.id) }}
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
                      ) : ""}
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>) : ""}
      </Table>
    </Box>
  </>);
};

export default ClassTable;
