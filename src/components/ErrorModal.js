import { DialogActions } from '@material-ui/core';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ErrorModal = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.desc}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ErrorModal.defaultProps = {
  open: false,
  title: '',
  desc: '',
  onClose: () => {},
};

ErrorModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  desc: PropTypes.any,
  onClose: PropTypes.func,
};

export default ErrorModal;
