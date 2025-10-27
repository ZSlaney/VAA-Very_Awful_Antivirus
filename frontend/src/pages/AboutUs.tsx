import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';


import Layout from '../components/Layout';
import Header from '../components/Header';
import {  Grid } from '@mui/joy';
import SideDrawer from '../components/Navigation';
const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 300, pv: 4567, amt: 2400 }, { name: 'Page C', uv: 200, pv: 1398, amt: 2400 }, { name: 'Page D', uv: 278, pv: 3908, amt: 2400 }, { name: 'Page E', uv: 189, pv: 4800, amt: 2400 }, { name: 'Page F', uv: 239, pv: 3800, amt: 2400 }, { name: 'Page G', uv: 349, pv: 4300, amt: 2400 }];




export default function AboutUs() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
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
          <Header />
        </Layout.Header>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: 2,
              margin: 20,
            }}
          >
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={12} sm={10}>
                        <Typography
                            color="neutral"
                            level="h1"
                            noWrap={false}
                            variant="plain"
                            >
                            About Us
                        </Typography>
                        <Typography
                            color="neutral"
                            level="body-lg"
                            noWrap={false}
                            variant="plain"
                        >
                            Placeholder about us text
                        </Typography>
                </Grid>
                <Grid xs={12} sm={1}>

                </Grid>
                <Grid xs={12} sm={1}>
                    <img src="src/assets/VA-AV.png"/>
                </Grid>
            </Grid>
        
            <Typography
                color="neutral"
                level="h2"
                noWrap={false}
                variant="plain"
                >
                Privacy Policy
            </Typography>

            <Typography
                color="neutral"
                level="body-lg"
                noWrap={false}
                variant="plain"
            >
                Something something APPs.
            </Typography>
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