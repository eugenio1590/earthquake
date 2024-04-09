import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, 
  List, ListItem, ListItemAvatar, ListItemText,
  IconButton,
  Avatar,
  Divider,
  Pagination,
  Tooltip,
  Typography 
} from "@mui/material";
import { ChevronRight, Comment } from "@mui/icons-material";
import moment from "moment";

import CommentDialog from "./CommentDialog";

import { State } from "./store";
import Earthquake from "./models/Earthquake";
import { setEarthquake } from "./slice/earthquake";

interface Props {
  item: Earthquake
  onShow: (item: Earthquake) => void
  onAddComment: (item: Earthquake) => void
}

const EarthquakeItem: FunctionComponent<Props> = (props: Props) => {
  const item = props.item;
  const date = moment(item.time);
  return (
    <ListItem 
      alignItems="flex-start"
      secondaryAction={
        <IconButton edge="end" aria-label="show" onClick={() => props.onShow(item)}>
          <ChevronRight />
        </IconButton>
      }>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'white', color: 'black' }} aria-label="magnitude">
          {item.magnitude.value}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={item.place}
        secondary={`${date.format('YYYY-MM-DD HH:mm:ss')} (UTC ${date.format('Z')})`}
      />
      <Tooltip title="Add a Comment">
        <IconButton onClick={() => props.onAddComment(item)}>
          <Comment />
        </IconButton>
      </Tooltip>
    </ListItem>
  )
}

function EarthquakeList() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const count: number = useSelector((state: State) => state.earthquakes.count);
  const page: number = useSelector((state: State) => state.earthquakes.page);
  const earthquakes: Earthquake[] = useSelector((state: State) => state.earthquakes.list);
  const selected: Earthquake | null = useSelector((state: State) => state.earthquake.selected);
  const onShow = (eq: Earthquake) => dispatch(setEarthquake(eq));
  const onAddComment = (eq: Earthquake) => {
    dispatch(setEarthquake(eq));
    setOpen(true);
  }
  const onSubmit = (eq: Earthquake, data: any) => {
    /*TODO*/
    console.log(eq, data);
    onClose();
  }
  const onClose = () => setOpen(false);

  return (
    <Box sx={{ height: "100%", bgcolor: '#F0F0F0', display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Typography variant="h5" paddingBottom={2}>
        USGS Earthquakes
      </Typography>
      <List sx={{bgcolor: 'background.paper', marginBottom: 'auto'}}>
        {earthquakes.map((eq, index) => (<>
          <EarthquakeItem key={eq.id} item={eq} onShow={onShow} onAddComment={onAddComment}/>
          {index + 1 < earthquakes.length && <Divider variant="inset" component="li" /> }
        </>))}
      </List>
      <Pagination showFirstButton showLastButton count={count} page={page} />
      {selected && (
        <CommentDialog 
          open={open} 
          earthquake={selected}
          onSubmit={onSubmit}
          onCancel={onClose}
          onClose={onClose}/>
      )}
      
    </Box>
  )
}

export default EarthquakeList;