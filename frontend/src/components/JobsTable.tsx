import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import type { PageType } from '../App';
import { setCurrentJob } from '../context/utils';
const TEST = false;

export default function JobsTable({ setPage }: { setPage: React.Dispatch<React.SetStateAction<PageType>> }) {

  if (TEST) {
    // Test mode logic here
    const MovePage = (jobnumber: string) => {
    // Logic to move to job details page

    setCurrentJob(jobnumber);
    setPage('scantool');
    };
    MovePage('1');
  }

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
              <Typography level="title-sm">Status</Typography>
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
              <Typography level="body-sm">Pending</Typography>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}