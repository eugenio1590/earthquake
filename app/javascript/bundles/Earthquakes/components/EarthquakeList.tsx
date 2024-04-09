import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, 
  List, ListItem, ListItemAvatar, ListItemText, 
  IconButton,
  Avatar,
  Divider,
  Pagination,
  Typography 
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import moment from "moment";

import { State } from "./store";
import Earthquake from "./models/Earthquake";
import { setEarthquake } from "./slice/earthquake";

interface Props {
  item: Earthquake,
  onShow: (item: Earthquake) => void
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
    </ListItem>
  )
}

function EarthquakeList() {
  const dispatch = useDispatch();
  const count: number = useSelector((state: State) => state.earthquakes.count);
  const page: number = useSelector((state: State) => state.earthquakes.page);
  const earthquakes: Earthquake[] = useSelector((state: State) => state.earthquakes.list);
  const onShow = (eq: Earthquake) => dispatch(setEarthquake(eq));

  return (
    <Box sx={{ height: "100%", bgcolor: '#F0F0F0', display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Typography variant="h5" paddingBottom={2}>
        USGS Earthquakes
      </Typography>
      <List sx={{bgcolor: 'background.paper', marginBottom: 'auto'}}>
        {earthquakes.map((eq, index) => (<>
          <EarthquakeItem key={eq.id} item={eq} onShow={() => onShow(eq)}/>
          {index + 1 < earthquakes.length && <Divider variant="inset" component="li" /> }
        </>))}
      </List>
      <Pagination showFirstButton showLastButton count={count} page={page} />
    </Box>
  )
}

export default EarthquakeList;