import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import {
    Stack, FormLabel, Input, Button,
    Snackbar
} from '@mui/joy';

import { newUser } from '../context/utils';
import { DEBUG } from '../App';


export default function UsersModal({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [error, setError] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const handleNewUser = async (username: string, password: string) => {
        try {
            setLoading(true);
            if (DEBUG) {
                console.log(`Attempting login with username: ${username} and password: ${password}`);
                if (username == null || password == null) {
                    console.error('Username or password is null');
                    return;
                }
            } else {
                const result = await newUser(username, password);
                if (result) {
                    if (result.response != "Success") {
                        setError(true);
                    }
                    setError(false);
                    setSuccess(true);
                } else {
                    setError(true);
                }
            }
            setLoading(false);

        } catch (error) {
            console.error('New User failed:', error);
        }
    };
    return (
        <>
            <Snackbar sx={{zIndex:99999}} open={error} autoHideDuration={6000} onClose={() => setError(false)} color="danger">
                <Typography>Error creating new user. Please try again.</Typography>
            </Snackbar>
            <Modal open={open} onClose={() => setOpen(false)}>

                <ModalDialog size="lg" aria-labelledby="sign-up"
                    sx={{
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}>
                    <ModalClose aria-label="Sign Up" />
                    <Stack spacing={1}>
                        <Typography id="sign-up" level="title-lg">
                            Create New User
                        </Typography>
                        <Divider />
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            console.log("Form submitted with data:", formJson);
                            const username = formJson.username as string;
                            const password = formJson.password as string;
                            handleNewUser(username, password);
                        }} >
                            <FormLabel>Username</FormLabel>
                            <Input required type="username" name="username" />
                            <FormLabel>Password</FormLabel>
                            <Input required type="password" name="password" />
                            <Stack sx={{ gap: 4, mt: 2 }}>
                                <Button type="submit" color={error ? 'danger' : "primary"} loading={loading}>
                                    Submit
                                </Button>
                                {success &&
                                    <Typography endDecorator="✔" color="success">User created successfully!</Typography>
                                }
                            </Stack>
                        </form>
                    </Stack>
                </ModalDialog>
            </Modal>
        </>

    );
}