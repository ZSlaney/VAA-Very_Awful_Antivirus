import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import Tooltip from '@mui/joy/Tooltip';


export default function ScansTable({ data, mode }: { data: any[], mode?: "sm" | "lg" }) {
    if (mode === "sm") {
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
                            <th style={{ width: '4%' }}>
                                <Typography level="title-sm">Id</Typography>
                            </th>
                            <th style={{ width: '13%' }}>
                                <Typography level="title-sm">User</Typography>
                            </th>
                            <th style={{ width: '20%' }}>
                                <Typography
                                    level="title-sm"
                                >
                                    File Path
                                </Typography>
                            </th>
                            <th style={{ width: '10%' }}>
                                <Typography level="title-sm">Result</Typography>
                            </th>
                            <th style={{ width: '9%' }}>
                                <Typography level="title-sm">Cnfdnce</Typography>
                            </th>
                            <th style={{ width: '10%' }}>
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
                                            {scan.Filename.length > 10 ? scan.Filename.substring(0, 10) + "..." : scan.Filename}
                                        </Typography>
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
    } else {
        return (
            <div style={{ width: '100%', overflowX: 'auto' }}>
                <Table
                    hoverRow
                    size="sm"
                    borderAxis="none"
                    variant="soft"
                    sx={{
                        '--TableCell-paddingX': '1rem',
                        '--TableCell-paddingY': '1rem',
                        width: '100%',
                        tableLayout: 'fixed', // enforce widths from colgroup and allow ellipsis
                        whiteSpace: 'nowrap', // avoid auto-wrapping for header & most cells
                    }}
                >
                    <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '40%' }} /> {/* big column for filename */}
                        <col style={{ width: '16%' }} />
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '9%' }} />
                        <col style={{ width: '10%' }} />
                    </colgroup>

                    <thead>
                        <tr>
                            <th><Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>Id</Typography></th>
                            <th><Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>User</Typography></th>
                            <th><Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>File Path</Typography></th>
                            <th><Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>ModelName</Typography></th>
                            <th><Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>Result</Typography></th>
                            <th><Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>Confidence</Typography></th>
                            <th><Typography level="title-sm" sx={{ whiteSpace: 'nowrap' }}>Timestamp</Typography></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((scan, index) => (
                            <tr key={index}>
                                <td><Typography level="body-sm">{data.length - index}</Typography></td>
                                <td><Typography level="body-sm">{scan.User}</Typography></td>

                                {/* File path cell: single line ellipsis + tooltip to show full path */}
                                <td>
                                    <Tooltip title={scan.Filename} placement="top">
                                        <Typography
                                            level="title-sm"
                                            startDecorator={<FolderRoundedIcon color="primary" />}
                                            sx={{
                                                display: 'inline-block',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                maxWidth: '100%',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            {scan.Filename}
                                        </Typography>
                                    </Tooltip>
                                </td>

                                <td><Typography level="body-sm">{scan.model_name}</Typography></td>
                                <td><Typography level="body-sm">{scan.Result.Classification == "BENIGNWARE" ? "Benign" : "Malware"}</Typography></td>
                                <td><Typography level="body-sm">{scan.Result.Confidence.toFixed(2)}%</Typography></td>
                                <td><Typography level="body-sm">{scan.timestamp}</Typography></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }




}