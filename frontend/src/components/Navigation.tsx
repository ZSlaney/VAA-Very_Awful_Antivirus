import * as React from 'react';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import EventNoteIcon from '@mui/icons-material/EventNote';

import LogsModal from './LogsModal';

export default function SideDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <LogsModal open={open} setOpen={setOpen} />
      <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
        <ListItem nested>
          <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
            Systems
          </ListSubheader>
          <List
            aria-labelledby="nav-list-system"
            sx={{ '& .JoyListItemButton-root': { p: '8px' } }}
          >
            <ListItem>
              <ListItemButton onClick={() =>setOpen(true)}>
                <ListItemDecorator>
                  <EventNoteIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Logs</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </>
  );
}