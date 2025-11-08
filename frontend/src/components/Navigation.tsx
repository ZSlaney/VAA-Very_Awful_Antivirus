import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FindInPageIcon from '@mui/icons-material/FindInPage';

export default function SideDrawer() {
  return (
    <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
          System
        </ListSubheader>
        <List
          aria-labelledby="nav-list-system"
          sx={{ '& .JoyListItemButton-root': { p: '8px' } }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <EventNoteIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Logs</ListItemContent> 
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}