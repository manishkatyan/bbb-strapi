import React, { useState } from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from "@strapi/design-system/Button";
import { Box } from "@strapi/design-system/Box";
import { TextInput } from "@strapi/design-system/TextInput";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Switch } from "@strapi/design-system/Switch";

const Modal = ({ isVisible, handleClose, handleCreate }) => {
  const [moderatorChecked, setModeratorChecked] = useState(false);
  const [viewerChecked, setViewerChecked] = useState(false);
  const [moderatorApproval, setModeratorApproval] = useState(false);
  const [anyUserStart, setAnyUserStart] = useState(false);
  const [muteViewerjoin, setMuteViewerJoin] = useState(false);

  return (
    <>
      {isVisible && (
        <ModalLayout onClose={handleClose} labelledBy="title">
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
              variant="beta"
            >
              Create Class
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Grid gap={5}>
              <GridItem col={11}>
                <Box padding={2}>
                  <TextInput
                    placeholder="Enter a class Name"
                    aria-label="Class"
                    name="className"
                    onChange={() => {}}
                  />
                </Box>
              </GridItem>

              <GridItem col={5}>
                <Box padding={2}>
                  <Typography variant="delta">Moderator Access Code</Typography>
                </Box>
              </GridItem>
              <GridItem col={5}>
                <Box padding={2}>
                  <TextInput
                    placeholder="Click on switch for Access Code"
                    type="number"
                    aria-label="moderatorAccessCode"
                    name="moderatorAccessCode"
                    onChange={() => {}}
                    size="S"
                  />
                </Box>
              </GridItem>
              <GridItem col={2}>
                <Box padding={2}>
                  <Switch
                    label="Activate moderator access code"
                    selected={moderatorChecked}
                    onChange={() => setModeratorChecked((s) => !s)}
                  />
                </Box>
              </GridItem>
              <GridItem col={5}>
                <Box padding={2}>
                  <Typography variant="delta">Viewer Access Code</Typography>
                </Box>
              </GridItem>
              <GridItem col={5}>
                <Box padding={2}>
                  <TextInput
                    placeholder="Click on switch for Access Code"
                    type="number"
                    aria-label="viewerAccessCode"
                    name="viewerAccessCode"
                    onChange={() => {}}
                    size="S"
                  />
                </Box>
              </GridItem>
              <GridItem col={2}>
                <Box padding={2}>
                  <Switch
                    label="Activate viewer access code"
                    selected={viewerChecked}
                    onChange={() => setViewerChecked((s) => !s)}
                  />
                </Box>
              </GridItem>
              <GridItem col={10}>
                <Box padding={2}>
                  <Typography variant="delta">
                    Requires moderator approval to join
                  </Typography>
                </Box>
              </GridItem>
              <GridItem col={2}>
                <Box padding={2}>
                  <Switch
                    label="Activate moderator approval to join"
                    selected={moderatorApproval}
                    onChange={() => setModeratorApproval((s) => !s)}
                  />
                </Box>
              </GridItem>
              <GridItem col={10}>
                <Box padding={2}>
                  <Typography variant="delta">
                    Allow any user to start session
                  </Typography>
                </Box>
              </GridItem>
              <GridItem col={2}>
                <Box padding={2}>
                  <Switch
                    label="Activate any user start session"
                    selected={anyUserStart}
                    onChange={() => setAnyUserStart((s) => !s)}
                  />
                </Box>
              </GridItem>
              <GridItem col={10}>
                <Box padding={2}>
                  <Typography variant="delta">Mute viewers on join</Typography>
                </Box>
              </GridItem>
              <GridItem col={2}>
                <Box padding={2}>
                  <Switch
                    label="Activate mute Viewers on join"
                    selected={muteViewerjoin}
                    onChange={() => setMuteViewerJoin((s) => !s)}
                  />
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleClose} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button onClick={handleCreate}>Create</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default Modal;
