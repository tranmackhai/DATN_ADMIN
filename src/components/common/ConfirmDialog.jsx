import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message,
  title,
  cancelText,
  okText,
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title || "Xác nhận"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message || "Bạn chắc chắn muốn xoá không?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          {cancelText || "Không"}
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          autoFocus
        >
          {okText || "Có"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
