import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';



export default function LogsModal({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
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
    );
}