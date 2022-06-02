import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Switch } from '@strapi/design-system/Switch';
import { Link } from '@strapi/design-system/Link';
import { createClass } from '../../utils/apiCalls';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const Modal = ({ isVisible, handleClose }) => {
  const [className, setClassName] = useState('');
  const [moderatorChecked, setModeratorChecked] = useState(false);
  const [moderatorAccessCode, setModeratorAccessCode] = useState('');
  const [viewerChecked, setViewerChecked] = useState(false);
  const [viewerAccessCode, setViewerAccessCode] = useState('');
  const [moderatorApproval, setModeratorApproval] = useState(false);
  const [classNameError, setClassNameError] = useState('');
  const [moderatorCodeError, setModeratorCodeError] = useState('');
  const [viewerCodeError, setViewerCodeError] = useState('');
  const [bbbAdvanceSetting, setbbbAdvanceSetting] = useState({
    maxParticipants: 100,
    logoutURL: 'https://higheredlab.com/',
    allowModsToUnmuteUsers: false,
    lockSettingsDisablePrivateChat: false,
    logo: 'https://higheredlab.com/wp-content/uploads/hel.png',
    muteOnStart: false,
    'userdata-bbb_skip_check_audio': 'false',
    'userdata-bbb_listen_only_mode': 'true',
  });

  const classCreateData = {
    className,
    moderatorAccessCode,
    viewerAccessCode,
    bbbSettings: {
      moderatorApproval,
      ...bbbAdvanceSetting,
    },
  };

  async function handleCreateClass(data) {
    if (!className && !moderatorAccessCode && !viewerAccessCode) {
      setClassNameError('Class Name is required');
      setModeratorCodeError('Moderator Access code is required');
      setViewerCodeError('Viewer Access code is required');
    } else if (!className) {
      setClassNameError('Class Name is required');
    } else if (!moderatorAccessCode) {
      setModeratorCodeError('Moderator Access code is required');
    } else if (!viewerAccessCode) {
      setViewerCodeError('Viewer Access code is required');
    } else {
      const res = await createClass(data);

      if (res.status === 200) {
        handleClose();
        setClassName('');
        setModeratorAccessCode('');
        setModeratorChecked(false);
        setViewerChecked(false);
        setViewerAccessCode('');
        setModeratorApproval(false);
      }
    }
  }

  useEffect(() => {
    if (moderatorChecked && !moderatorAccessCode) {
      const accessCode = Math.random().toString().substring(2, 6);
      const code = parseInt(accessCode, 10);
      setModeratorAccessCode(code);
    } else if (!moderatorChecked) {
      setModeratorAccessCode('');
    }
    if (viewerChecked && !viewerAccessCode) {
      const accessCode = Math.random().toString().substring(2, 6);
      const code = parseInt(accessCode, 10);
      setViewerAccessCode(code);
    } else if (!viewerChecked) {
      setViewerAccessCode('');
    }
  }, [moderatorChecked, viewerChecked, isVisible, moderatorAccessCode, viewerAccessCode]);

  const onChangeJson = extraSetting => {
    setbbbAdvanceSetting(JSON.parse(extraSetting));
  };

  return (
    <div>
      {isVisible && (
        <ModalLayout onClose={handleClose} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title" variant="beta">
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
                    error={classNameError || ''}
                    onChange={e => {
                      setClassName(e.target.value);
                      setClassNameError('');
                    }}
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
                    error={moderatorCodeError || ''}
                    onChange={e => {
                      setModeratorAccessCode(e.target.value);
                      setModeratorCodeError('');
                    }}
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
                    onChange={() => {
                      setModeratorChecked(s => !s);
                      setModeratorCodeError('');
                    }}
                    data-testid="moderator-access-code"
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
                    error={viewerCodeError || ''}
                    onChange={e => {
                      setViewerAccessCode(e.target.value);
                      setViewerCodeError('');
                    }}
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
                    onChange={() => {
                      setViewerChecked(s => !s);
                      setViewerCodeError('');
                    }}
                    data-testid="viewer-access-code"
                  />
                </Box>
              </GridItem>
              <GridItem col={10}>
                <Box padding={2}>
                  <Typography variant="delta">Requires moderator approval to join</Typography>
                </Box>
              </GridItem>
              <GridItem col={2}>
                <Box padding={2}>
                  <Switch
                    label="Activate moderator approval to join"
                    selected={moderatorApproval}
                    onChange={() => setModeratorApproval(s => !s)}
                  />
                </Box>
              </GridItem>

              <GridItem col={11}>
                <Box padding={2}>
                  <Typography variant="beta">Advance Settings</Typography>
                  <Box>
                    <Typography variant="epsilon">
                      You can customize settings for your BigBlueButton class.
                    </Typography>
                  </Box>
                </Box>
              </GridItem>
              <GridItem col={11}>
                <Box padding={2}>
                  <AceEditor
                    placeholder="BigBlueButton Settings"
                    mode="json"
                    theme="monokai"
                    name="setting"
                    onChange={onChangeJson}
                    fontSize={18}
                    showPrintMargin={false}
                    showGutter
                    highlightActiveLine
                    height="300px"
                    width="700px"
                    defaultValue={`{
"maxParticipants":"100",
"logoutURL":"https://higheredlab.com/",
"allowModsToUnmuteUsers":"false",
"lockSettingsDisablePrivateChat":"false",
"logo":"https://higheredlab.com/wp-content/uploads/hel.png",
"muteOnStart":"false",
"userdata-bbb_skip_check_audio":"false",
"userdata-bbb_listen_only_mode":"true"
}`}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 4,
                    }}
                  />
                </Box>
              </GridItem>
              <GridItem col={11}>
                <Box padding={2}>
                  <Link href="https://docs.bigbluebutton.org/dev/api.html" isExternal>
                    <Typography variant="epsilon" textColor="primary600">
                      You may refer to the API doc for more information
                    </Typography>
                  </Link>
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
              <Button
                onClick={() => {
                  handleCreateClass(classCreateData);
                }}
                data-testid="create-class"
              >
                Create
              </Button>
            }
          />
        </ModalLayout>
      )}
    </div>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Modal;
