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
                        <th style={{width: '5%'}}>
                            <Typography level="title-sm">Id</Typography>
                        </th>
                        <th style={{width: '10%'}}>
                            <Typography level="title-sm">User</Typography>
                        </th>
                        <th style={{width: '35%'}}>
                            <Typography
                                level="title-sm"
                            >
                                File Path
                            </Typography>
                        </th>
                        <th style={{width: '16%'}}>
                            <Typography level="title-sm">ModelName</Typography>
                        </th>
                        <th style={{width: '5%'}}>
                            <Typography level="title-sm">Result</Typography>
                        </th>
                        <th style={{width: '9%'}}>
                            <Typography level="title-sm">Confidence</Typography>
                        </th>
                        <th style={{width: '10%'}}>
                            <Typography level="title-sm">Timestamp</Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((scan, index) => {

                        return (
                            <tr key={data.length - index}>
                                <td>
                                    <Typography level="body-sm">{data.length - index}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-sm">{scan.User}</Typography>
                                </td>
                                <td>
                                    <Typography
                                        level="title-sm"
                                        startDecorator={<FolderRoundedIcon color="primary" />}
                                        sx={{ alignItems: 'flex-start' }}
                                    >
                                        {scan.Filename.length > 40 ? scan.Filename.substring(0, 40) + "..." : scan.Filename}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography level="body-sm">{scan.model_name}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-sm">{scan.Result.Classification == "BENIGNWARE" ? "Benign" : "Malware"}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-sm">{scan.Result.Confidence.toFixed(2)}%</Typography>
                                </td>
                                <td>
                                    <Typography level="body-sm">{scan.timestamp}</Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}