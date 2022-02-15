import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Flex } from "@strapi/design-system/Flex";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Button } from "@strapi/design-system/Button";
import { IconButton } from "@strapi/design-system/IconButton";
import Code from "@strapi/icons/Code";
import Play from "@strapi/icons/Play";
import Trash from "@strapi/icons/Trash";
import Link from "@strapi/icons/Link";

const ClassTable = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const entries = [
    {
      id: 1,
      class: "Demo Class",
      moderatorAccesCode: 123456,
      viewerAccessCode: 456784,
    },
    {
      id: 2,
      class: "Maths Class",
      moderatorAccesCode: null,
      viewerAccessCode: null,
    },
    {
      id: 3,
      class: "physics Class",
      moderatorAccesCode: 123456,
      viewerAccessCode: 456784,
    },
  ];

  return (
    <Box padding={8} paddingTop={5} background="neutral100">
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
        <Tbody>
          {entries.map((entry) => (
            <Tr key={entry.id}>
              <Td>
                <Typography textColor="neutral800">{entry.id}</Typography>
              </Td>

              <Td>
                <Typography textColor="neutral800">{entry.class}</Typography>
              </Td>
              <Td>
                <Box>
                  <Typography textColor="neutral800">
                    Moderator&nbsp;:&nbsp;
                    {entry.moderatorAccesCode ? entry.moderatorAccesCode : "NA"}
                  </Typography>
                </Box>
                <Box>
                  <Typography textColor="neutral800">
                    Viewer&nbsp;:&nbsp;
                    {entry.viewerAccessCode ? entry.viewerAccessCode : "NA"}
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
                      onClick={() => console.log("delete")}
                      label="Delete"
                      noBorder
                      icon={<Trash />}
                    />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ClassTable;
