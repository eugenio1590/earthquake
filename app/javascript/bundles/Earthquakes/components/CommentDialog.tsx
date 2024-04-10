import React, { FunctionComponent, FormEvent } from "react";
import { useSelector } from "react-redux";
import { 
  Dialog, DialogTitle, 
  DialogContent, DialogContentText,
  DialogActions, 
  TextField, 
  Button 
} from "@mui/material";

import Earthquake from "./models/Earthquake";
import { useAppDispatch, State } from "./store";
import { addComment } from "./api/addComment";
import { reset } from "./slice/comment";


interface Props {
  open: boolean
  earthquake: Earthquake
  onClose: () => void
}

const CommentDialog: FunctionComponent<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const isLoading: boolean = useSelector((state: State) => state.comment.isLoading);
  const isSuccess: boolean | null = useSelector((state: State) => state.comment.isSuccess);
  const error: string | null = useSelector((state: State) => state.comment.error);

  const onClose = () => {
    dispatch(reset());
    props.onClose();
  }

  if (isSuccess) {
    onClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          dispatch(addComment(props.earthquake, formData));
        },
      }}
    >
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>Earthquake:</b> {props.earthquake.title}<br/>
          Please enter your comment for this earthquake. Comments cannot be edited or removed.
        </DialogContentText>
        <TextField
          error={error !== null}
          autoFocus
          required
          margin="dense"
          id="body"
          name="body"
          label="Comment"
          type="text"
          fullWidth
          variant="standard"
          disabled={isLoading}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CommentDialog;