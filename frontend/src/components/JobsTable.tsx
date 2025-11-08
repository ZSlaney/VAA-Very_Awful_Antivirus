import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

export default function JobsTable() {
  return (
    <div>
      <Table
        hoverRow
        size="sm"
        borderAxis="none"
        variant="soft"
        sx={{ '--TableCell-paddingX': '1rem', '--TableCell-paddingY': '1rem' }}
      >
        <thead>
          <tr>
            <th>
              <Typography level="title-sm">Job Number</Typography>
            </th>
            <th>
              <Typography
                level="title-sm"
              >
                File Path
              </Typography>
            </th>
            <th>
              <Typography level="title-sm">Model</Typography>
            </th>
            <th>
              <Typography level="title-sm">Status</Typography>
            </th>
            <th>
              <Typography level="title-sm">Result</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography level="body-sm">1</Typography>
             
            </td>
            <td>
               <Typography
                level="title-sm"
                startDecorator={<FolderRoundedIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                aFilePath
              </Typography>
            </td>
            <td>
              <Typography level="body-sm">Randomforest</Typography>
            </td>
            <td>
              <Typography level="body-sm">Pending</Typography>
            </td>
             <td>
              <Typography level="body-sm">Pending</Typography>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}