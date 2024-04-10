import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  List, ListItem, ListItemAvatar, ListItemText,
  IconButton,
  Avatar,
  Divider,
  Pagination,
  Tooltip,
  Typography
} from "@mui/material";
import { ChevronRight, Comment, FilterList } from "@mui/icons-material";
import moment from "moment";

import CommentDialog from "./CommentDialog";
import MagnitudeTypeSelect from "./MagnitudeTypeSelect";

import { State, useAppDispatch } from "./store";
import Earthquake from "./models/Earthquake";
import { setEarthquake } from "./slice/earthquake";
import { setFilters, Filters } from "./slice/earthquakes";
import { fetchEarthquakes } from "./api/fetchEarthquakes";

interface Props {
  item: Earthquake
  onShow: (item: Earthquake) => void
  onAddComment: (item: Earthquake) => void
}

const EmptyState = () => {
  return (
    <Box sx={{margin: 'auto', textAlign: 'center'}}>
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="h6">There are no Earthquakes</Typography>
    </Box>
  )
}

const EarthquakeItem: FunctionComponent<Props> = (props: Props) => {
  const item = props.item;
  const date = moment(item.time);
  return (
    <ListItem 
      alignItems="center"
      secondaryAction={
        <IconButton edge="end" aria-label="show" onClick={() => props.onShow(item)}>
          <ChevronRight />
        </IconButton>
      }>
      <ListItemAvatar sx={{margin: 0}}>
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
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const filters: Filters = useSelector((state: State) => state.earthquakes.filters);
  const isLoading: boolean = useSelector((state: State) => state.earthquakes.isLoading);
  const count: number = useSelector((state: State) => state.earthquakes.count);
  const page: number = useSelector((state: State) => state.earthquakes.page);
  const earthquakes: Earthquake[] = useSelector((state: State) => state.earthquakes.list);
  const selected: Earthquake | null = useSelector((state: State) => state.earthquake.selected);
  const onShow = (eq: Earthquake) => dispatch(setEarthquake(eq));
  const onAddComment = (eq: Earthquake) => {
    dispatch(setEarthquake(eq));
    setOpen(true);
  }
  const onClose = () => setOpen(false);
  const onPaginated = (nextPage: number, filters: Filters, force: boolean = true) => {
    if (force || page !== nextPage) {
      dispatch(fetchEarthquakes(nextPage, filters));
    }
  }
  
  const onMagnitudeTypeChange = (values: string[]) => {
    const newFilters: Filters = {...filters, magnitudeTypes: values };
    dispatch(setFilters(newFilters));
    onPaginated(0, newFilters);
  }

  useEffect(() => onPaginated(page, filters), [dispatch]); // Load the first page

  return (
    <Box sx={{ height: "100%", bgcolor: '#F0F0F0', display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Typography variant="h5" paddingBottom={2}>
        USGS Earthquakes
      </Typography>
      <Box sx={{display: 'flex', alignItems: 'center', paddingX: 2, paddingY: 1, marginBottom: 2, bgcolor: 'background.paper' }}>
        <FilterList sx={{ marginRight: 1 }}/>
        <MagnitudeTypeSelect 
          value={filters.magnitudeTypes} 
          onChange={onMagnitudeTypeChange}/>
      </Box>

      {isLoading && <CircularProgress sx={{margin: 'auto'}} />}

      {!isLoading && earthquakes.length > 0 && (
        <>
          <List sx={{ bgcolor: 'background.paper', marginBottom: 'auto' }}>
            {earthquakes.map((eq, index) => (<>
              <EarthquakeItem key={eq.id} item={eq} onShow={onShow} onAddComment={onAddComment} />
              {index + 1 < earthquakes.length && <Divider variant="inset" component="li" />}
            </>))}
          </List>
          <Pagination
            showFirstButton
            showLastButton
            count={count}
            page={page}
            onChange={(_, page) => onPaginated(page, filters, false)} />
        </>
      )}

      {!isLoading && earthquakes.length === 0 && <EmptyState />}

      {selected && (
        <CommentDialog
          open={open}
          earthquake={selected}
          onClose={onClose} />
      )}
      
    </Box>
  )
}

export default EarthquakeList;