import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';



export default function ScansTable() {
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
                            <Typography level="title-sm">Scan Id</Typography>
                        </th>
                        <th>
                            <Typography
                                level="title-sm"
                            >
                                File Path
                            </Typography>
                        </th>
                        <th>
                            <Typography level="title-sm">User</Typography>
                        </th>
                        <th>
                            <Typography level="title-sm">Result</Typography>
                        </th>
                        <th>
                            <Typography level="title-sm">Confidence</Typography>
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
                            <Typography level="body-sm">User1</Typography>
                        </td>
                        <td>
                            <Typography level="body-sm">Benign</Typography>
                        </td>
                        <td>
                            <Typography level="body-sm">70%</Typography>
                        </td>
                        
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}