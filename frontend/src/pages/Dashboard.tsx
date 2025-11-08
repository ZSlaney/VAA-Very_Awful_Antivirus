import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { CircularProgress, Grid } from '@mui/joy';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import Layout from '../components/Layout';
import Header from '../components/Header';
import SideDrawer from '../components/Navigation';


import { DEBUG, type PageType } from '../App';
import JobsList from '../components/JobsTable';
import { getSessionKey } from '../context/utils';


export default function FilesExample({setPage}: {setPage: React.Dispatch<React.SetStateAction<PageType>>}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  
  //if session key is invalid, redirect to login page
  if (DEBUG) {
    console.log('Rendering Dashboard component');
  } else {
    // Check if session key is valid
    const sessionKey = getSessionKey();
    const isValidSession = sessionKey !== null && sessionKey !== undefined && sessionKey !== '';
    if (!isValidSession) {
      
      setPage('login');
    }
  }
  
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <SideDrawer />
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'space-around',
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Dashboard
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          startDecorator={<PeopleAltRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Analytics
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Scan Tool
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          About Us
        </Button>
      </Stack>
      <Layout.Root
        sx={[
          {
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
              md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
            },
          },
          drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          },
        ]}
      >
        <Layout.Header>
          <Header setPage={setPage} />
        </Layout.Header>
        <Layout.SideNav>
          <SideDrawer />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            {' '}
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', md: 'flex' },
              }}
            >

              <Grid container spacing={2} sx={{ p: 2, flexGrow: 1 }}>
                <Grid xs={12} sm={3}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    System
                  </Typography>
                  <Typography level="title-lg" color='success'>Healthy</Typography>
                </Grid>
                <Grid xs={12} sm={3}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    AI Core System
                  </Typography>
                  <Typography level="title-lg">Idle</Typography>
                </Grid>
                <Grid xs={12} sm={3}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Alerts
                  </Typography>
                  <Typography level="title-lg" color='success'>None</Typography>
                </Grid>
              </Grid>
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                display: { xs: 'inherit', sm: 'none' },
                borderRadius: 'sm',
                overflow: 'auto',
                backgroundColor: 'background.surface',
                '& > *': {
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}
            >
              <Grid container spacing={2} sx={{ p: 2, flexGrow: 1 }}>
                <Grid xs={4} sm={4}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    System Uptime
                  </Typography>
                  <Typography level="title-lg" color='success'>Healthy</Typography>
                </Grid>
                <Grid xs={4} sm={4}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    AI Core System
                  </Typography>
                  <Typography level="title-lg">Idle</Typography>
                </Grid>
                <Grid xs={4} sm={4}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Alerts
                  </Typography>
                  <Typography level="title-lg" color='success'>None</Typography>
                </Grid>
              </Grid>
            </Sheet>
            <Card variant="outlined" size="sm">
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <TroubleshootIcon />
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">Quick Scan</Typography>

                </Box>
              </Box>

              <Typography level="body-xs">Scan Common file locations for Malware</Typography>
            </Card>
            <Card variant="outlined" size="sm">
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <FindInPageIcon />
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">File Scan</Typography>

                </Box>
              </Box>

              <Typography level="body-xs">Scan Individual File for Malware</Typography>
            </Card>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">Recent Detections</Typography>

                </Box>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <CircularProgress determinate value={75} size="lg" thickness={8} />

                </AspectRatio>

              </CardOverflow>
              <Typography level="body-xs">Scan Individual File for Malware</Typography>
            </Card>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">Alerts</Typography>

                </Box>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <CircularProgress size="lg" thickness={8} />

                </AspectRatio>

              </CardOverflow>
              <Typography level="body-xs">Scan Individual File for Malware</Typography>
            </Card>
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Stack justifyContent="space-between" sx={{ p: 2, flexGrow: 1 }}>
                <Typography level="title-lg">Active Jobs</Typography>
                <JobsList />
              </Stack>
            </Sheet>


          </Box>
        </Layout.Main>
        {/* Right drawer
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography level="title-md" sx={{ flex: 1 }}>
              torres-del-paine.png
            </Typography>
            <IconButton component="span" variant="plain" color="neutral" size="sm">
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Tabs>
            <TabList>
              <Tab sx={{ flexGrow: 1 }}>
                <Typography level="title-sm">Details</Typography>
              </Tab>
              <Tab sx={{ flexGrow: 1 }}>
                <Typography level="title-sm">Activity</Typography>
              </Tab>
            </TabList>
            <TabPanel value={0} sx={{ p: 0 }}>
              <AspectRatio ratio="21/9">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format"
                  srcSet="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format&dpr=2 2x"
                />
              </AspectRatio>
              <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography level="title-sm" sx={{ mr: 1 }}>
                  Shared with
                </Typography>
                <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
                  <Avatar
                    src="https://i.pravatar.cc/24?img=6"
                    srcSet="https://i.pravatar.cc/48?img=6 2x"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/24?img=7"
                    srcSet="https://i.pravatar.cc/48?img=7 2x"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/24?img=8"
                    srcSet="https://i.pravatar.cc/48?img=8 2x"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/24?img=9"
                    srcSet="https://i.pravatar.cc/48?img=9 2x"
                  />
                </AvatarGroup>
              </Box>
              <Divider />
              <Box
                sx={{
                  gap: 2,
                  p: 2,
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  '& > *:nth-child(odd)': { color: 'text.secondary' },
                }}
              >
                <Typography level="title-sm">Type</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  Image
                </Typography>
                <Typography level="title-sm">Size</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  3,6 MB (3,258,385 bytes)
                </Typography>
                <Typography level="title-sm">Location</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  Travel pictures
                </Typography>
                <Typography level="title-sm">Owner</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  Michael Scott
                </Typography>
                <Typography level="title-sm">Modified</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  26 October 2016
                </Typography>
                <Typography level="title-sm">Created</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  5 August 2016
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ py: 2, px: 1 }}>
                <Button variant="plain" size="sm" endDecorator={<EditRoundedIcon />}>
                  Add a description
                </Button>
              </Box>
            </TabPanel>
            <TabPanel
              value={1}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <Typography level="title-md">This week</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/24?img=2"
                  srcSet="https://i.pravatar.cc/48?img=2 2x"
                />
                <div>
                  <Box
                    sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}
                  >
                    <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level="body-sm">shared</Typography>
                    <Typography level="title-sm">torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant="outlined" startDecorator={<ShareRoundedIcon />}>
                    Shared with 3 users
                  </Chip>
                  <Typography level="body-xs" sx={{ mt: 1 }}>
                    3 Nov 2023
                  </Typography>
                </div>
              </Box>
              <Typography level="title-md">Older</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/24?img=2"
                  srcSet="https://i.pravatar.cc/48?img=2 2x"
                />
                <div>
                  <Box
                    sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}
                  >
                    <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level="body-sm">edited</Typography>
                    <Typography level="title-sm">torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant="outlined" startDecorator={<EditRoundedIcon />}>
                    Changed name
                  </Chip>
                  <Typography level="body-xs" sx={{ mt: 1 }}>
                    12 Apr 2021
                  </Typography>
                </div>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/24?img=2"
                  srcSet="https://i.pravatar.cc/48?img=2 2x"
                />
                <div>
                  <Box
                    sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}
                  >
                    <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level="body-sm">created</Typography>
                    <Typography level="title-sm">torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant="outlined" startDecorator={<EditRoundedIcon />}>
                    Added 5 Apr 2021
                  </Chip>
                  <Typography level="body-xs" sx={{ mt: 1 }}>
                    12 Apr 2021
                  </Typography>
                </div>
              </Box>
            </TabPanel>
          </Tabs>
        </Sheet>
         */}
      </Layout.Root>
    </CssVarsProvider>
  );
}