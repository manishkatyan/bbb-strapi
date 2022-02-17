import React, { useState, useEffect } from "react";
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
import { createClass } from "../../utils/apiCalls";

const Modal = ({ isVisible, handleClose, handleCreate }) => {
  const [className, setClassName] = useState('')
  const [moderatorChecked, setModeratorChecked] = useState(false);
  const [moderatorAccessCode, setModeratorAccessCode] = useState('');
  const [viewerChecked, setViewerChecked] = useState(false);
  const [viewerAccessCode, setViewerAccessCode] = useState('');
  const [moderatorApproval, setModeratorApproval] = useState(false);
  const [anyUserStart, setAnyUserStart] = useState(false);
  const [muteViewerjoin, setMuteViewerJoin] = useState(false);

  const classCreateData = {
    className,
    moderatorAccessCode,
    viewerAccessCode,
    bbbSettings: {
      moderatorApproval,
      anyUserStart,
      muteViewerjoin
    }
  }


  async function handleCreateClass(data) {
    const res = await createClass(data)
    if (res.status === 200) {
      handleClose()
    }
  }

  useEffect(() => {

    if (moderatorChecked && !moderatorAccessCode) {
      const accessCode = Math.random().toString().substring(2, 6);
      const code = parseInt(accessCode);
      setModeratorAccessCode(code);
    } else if (!moderatorChecked) {
      setModeratorAccessCode("");
    }
    if (viewerChecked && !viewerAccessCode) {
      const accessCode = Math.random().toString().substring(2, 6);
      const code = parseInt(accessCode);
      setViewerAccessCode(code);
    } else if (!viewerChecked) {
      setViewerAccessCode("");
    }
  }, [moderatorChecked, viewerChecked, isVisible]);
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
                    onChange={(e) => { setClassName(e.target.value) }}
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
                    onChange={(e) => { setModeratorAccessCode(e.target.value) }}
                    value={moderatorAccessCode}
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
                    onChange={(e) => { setViewerAccessCode(e.target.value) }}
                    value={viewerAccessCode}
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
                <Button onClick={() => { handleCreateClass(classCreateData) }}>Create</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default Modal;
