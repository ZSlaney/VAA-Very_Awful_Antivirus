import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListDivider from '@mui/joy/ListDivider';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';


export default function JobsList() {
  return (
    <div>
      <List size="sm" aria-labelledby="table-in-list">
        <ListItem>
          <ListItemButton variant="soft" sx={{ bgcolor: 'transparent' }}>
            <ListItemContent sx={{ p: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  level="title-sm"
                  startDecorator={<FolderRoundedIcon color="primary" />}
                  sx={{ alignItems: 'flex-start' }}
                >
                  Filepath
                </Typography>
                <Typography level="body-sm" textColor="text.tertiary">
                  Job ID: 1
                </Typography>
              </Box>
             
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                }}
              >
                <Typography level="body-sm">Model</Typography>

                <Typography level="body-sm">Status</Typography>
                <Typography level="body-sm">Result</Typography>
              </Box>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListDivider />

      </List>
    </div>
  );
}