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
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';



import { issueAuth } from '../context/utils';
import { DEBUG, type PageType } from '../App';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}

function AboutUsModal({
  open,
  setOpen,
}: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog size="lg" aria-labelledby="about-us"
      sx={{
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        <ModalClose  aria-label="Click about us" />
        <Stack spacing={1}>
          <Typography id="about-us" level="title-lg">
            About Us
          </Typography>
          <Divider />

          <Typography level="body-sm">
            <strong>Very Awful Antivirus (VA-AV)</strong> wants to revolutionise 
            how people interact with anti-virus software, large commertial solutions 
            are too expensive and invasive for typical home uses, but home users still 
            need something to help when they are not sure about a file! We have developed 
            AI models to help determine if a Windows Portable Executable (.exe file) is 
            malware and give a confidence score. We have integrated our AI with a slick 
            web-based user interface that allows our customers to upload files from anywhere.
          </Typography>

          <Divider />

          <Typography level="title-sm">Privacy Policy</Typography>
          <Typography level="body-sm">
          Very Awful Antivirus (VA-AV) does not keep record of your name, email or any other personal identifiable information,
          we do however store file paths to the files uploaded to our solution, which may include your name if the username
          includes your name. The file paths uploaded are not associated with any other identifiable information and cannot be
          accessed by other users. We will not sell any of the information and/or data uploaded to VA-AV or otherwise collected by VA-AV.
          </Typography>


          <Typography level="body-sm">
          Questions, concerns or clarifications can be addressed to: <strong>Zach Slaney</strong> -{' '}
          <Link underline="always" href="mailto:103612275@student.swin.edu.au">103612275@student.swin.edu.au</Link>
          </Typography>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}


const customTheme = extendTheme({});

export default function Login({ setPage }: { setPage: React.Dispatch<React.SetStateAction<PageType>> }) {
  const [loading, setLoading] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const WALLPAPER_URL = '/steve-johnson-hokONTrHIAQ-unsplash.jpg';

  ///scott-rodgerson-PSpf_XgOM5w-unsplash
  ///steve-johnson-hokONTrHIAQ-unsplash.jpg
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
      sx={{
        position: 'relative',
        minHeight: '100dvh',
        backgroundImage: `url(${WALLPAPER_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 2, sm: 4 }, // padding scales for phone/desktop
      }}
    >
      <img
        src={WALLPAPER_URL}
        alt="photo published by Steve Johnson
        published on Feb 10, 2018
        Free to use under the Unsplash License"
        style={{ display: 'none' }}
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
              <Box
                sx={{
                  width: { xs: 80, sm: 100, md: 130 },
                  height: { xs: 80, sm: 100, md: 130 },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: 'rgba(254, 254, 254, 0.77)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
                  p: { xs: 1, sm: 1.5, md: 2 },
                }}
              >
                <img
                  src={Logo}
                  alt="Very Awful AntiVirus Logo"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Box>
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

                  <Button size="sm" variant="plain" onClick={() => setAboutOpen(true)}>
                    About us & Privacy
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
    </Box>

      <AboutUsModal open={aboutOpen} setOpen={setAboutOpen} />
    </CssVarsProvider >
  );
}