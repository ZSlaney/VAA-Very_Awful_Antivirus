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
import { Modal, ModalDialog,ModalClose, Typography, Divider } from '@mui/joy';

export default function SideDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog size='lg'>
          <ModalClose />
          <Typography level='title-lg'>Logs</Typography>
          <Divider sx={{ my: 2 }} />
          <code>
            {`[2024-06-01 12:00:00] Scan ID: 1, File Path: /path/to/file1.exe, User: User1, Result: Benign, Confidence: 70%`}
            <br />
            {`[2024-06-01 12:05:00] Scan ID: 2, File Path: /path/to/file2.exe, User: User2, Result: Malicious, Confidence: 95%`}
            <br />
            {`[2024-06-01 12:10:00] Scan ID: 3, File Path: /path/to/file3.exe, User: User3, Result: Benign, Confidence: 80%`}
          </code>
        </ModalDialog>
      </Modal>
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