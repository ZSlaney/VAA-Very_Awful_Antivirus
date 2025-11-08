import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Logo from '../../public/VA-AV.png';

import { issueAuth } from '../context/utils';
import { DEBUG, type PageType } from '../App';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}



const customTheme = extendTheme({});

export default function Login({ setPage }: { setPage: React.Dispatch<React.SetStateAction<PageType>> }) {
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      if (DEBUG) {
        console.log(`Attempting login with username: ${username} and password: ${password}`);
        setPage('dashboard');
      } else {
        const sessionKey = await issueAuth(username, password);
        if (sessionKey) {
          setPage('dashboard');
        }
      }

    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CssVarsProvider theme={customTheme} disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <img src={Logo} width={120} />
              </IconButton>
              <Typography level="title-lg">Very Awful AntiVirus</Typography>
            </Box>

          </Box>

          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
                <Divider />
              </Stack>

            </Stack>

            <Stack sx={{ gap: 4, mt: 2 }}>
              <form onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                console.log("Form submitted with data:", formJson);
                const username = formJson.username as string;
                const password = formJson.password as string;
                handleLogin(username, password);
              }} >
                <FormLabel>Username</FormLabel>
                <Input type="username" name="username" />
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
                <Stack sx={{ gap: 4, mt: 2 }}>
                  <Button type="submit" fullWidth loading={loading}>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>
              © Very Awful Antivirus {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>

    </CssVarsProvider >
  );
}