import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import Trash from '@strapi/icons/Trash';

const ConfirmDialog = ({ dialogId, isVisible, handleClose, handleDelete }) => {
  return (
    <div>
      <Dialog id={dialogId} onClose={handleClose} title="Confirmation" isOpen={isVisible}>
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Stack size={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">
                Are you sure you want to delete this?
              </Typography>
            </Flex>
          </Stack>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={handleClose} variant="tertiary">
              Cancel
            </Button>
          }
          endAction={
            <Button variant="danger-light" startIcon={<Trash />} onClick={handleDelete}>
              Confirm
            </Button>
          }
        />
      </Dialog>
    </div>
  );
};

ConfirmDialog.propTypes = {
  dialogId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ConfirmDialog;
