import React, { FunctionComponent, FormEvent } from "react";
import { 
  Dialog, DialogTitle, 
  DialogContent, DialogContentText,
  DialogActions, 
  TextField, 
  Button 
} from "@mui/material";

import Earthquake from "./models/Earthquake";

interface Props {
  open: boolean
  earthquake: Earthquake
  onSubmit: (eq: Earthquake, data: any) => void
  onCancel: () => void
  onClose: () => void
}

const CommentDialog: FunctionComponent<Props> = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          props.onSubmit(props.earthquake, formJson);
        },
      }}
    >
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>Earthquake:</b> {props.earthquake.title}<br/>
          Please enter your comment for this earthquake. Comments cannot be eddited or removed.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="body"
          name="body"
          label="Comment"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CommentDialog;