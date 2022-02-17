import React, { useState, useEffect } from "react";
import { Box } from "@strapi/design-system/Box";
import { Loader } from '@strapi/design-system/Loader';
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
import { getClass } from "../../utils/apiCalls";
import { deleteClass } from "../../utils/apiCalls";

const ClassTable = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [classData, setClassData] = useState([])
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [classId, setClassId] = useState(false);

  useEffect(async () => {
    const res = await getClass()
    if (res.status === 200 ){
      setLoading(false)
      setClassData(res.data)
    }
    setLoading(false)
  }, [loading]);

  const handleCloseDialog = () => {
    setIsVisible(false);
  };

  const handleDeleteClass = async (id) => {
    await deleteClass(id)
    setIsVisible(false);
    window.location.replace()
  };

  return (<>
          <Box padding={8} paddingTop={5} background="neutral100">
            { loading ? <Loader> Loading Class...</Loader> : (
            <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">ID</Typography>
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
              {  classData && classData.length > 0 ? (
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
                            <Button endIcon={<Play />}>Start Class</Button>
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
                            onClick={() => {setIsVisible(true); setClassId(bbbClass.id)}}
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
                          ): ""}
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>) : ""}
            </Table>)}
          </Box>
        </>);
};

export default ClassTable;
