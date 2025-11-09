import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import { Table } from '@mui/joy';



export default function UsersModal({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog size='lg'>
                <ModalClose />
                <Typography level='title-lg'>Users</Typography>
                <Divider />
                <Table>
                    <thead>
                        <tr>
                            <th>
                                <Typography level="title-sm">Username</Typography>
                            </th>
                            <th>
                                <Typography level="title-sm">Permission Level</Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Typography level="body-sm">Admin</Typography>
                            </td>
                            <td>
                                <Typography level="body-sm">Administrator</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography level="body-sm">User1</Typography>
                            </td>
                            <td>
                                <Typography level="body-sm">User</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography level="body-sm">User2</Typography>
                            </td>
                            <td>
                                <Typography level="body-sm">User</Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </ModalDialog>
        </Modal>
    );
}