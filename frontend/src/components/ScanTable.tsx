import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';



export default function ScansTable({ data }: { data: any[] }) {
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
                    {data.map((scan, index) => {

                        return (
                            <tr key={index}>
                                <td>
                                    <Typography level="body-sm">{index}</Typography>
                                </td>
                                <td>
                                    <Typography
                                        level="title-sm"
                                        startDecorator={<FolderRoundedIcon color="primary" />}
                                        sx={{ alignItems: 'flex-start' }}
                                    >
                                        {scan.Filename}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography level="body-sm">{scan.User}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-sm">{scan.Result.Classification == "BENIGNWARE" ? "Benign" : "Malware"}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-sm">{scan.Result.Confidence}%</Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}