import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { CircularProgress, Grid } from '@mui/joy';

import FindInPageIcon from '@mui/icons-material/FindInPage';

import Layout from '../components/Layout';
import Header from '../components/Header';


import { DEBUG, type PageType } from '../App';
import JobsList from '../components/JobsTable';
import { fetchJobs, getSessionKey } from '../context/utils';
import SmallTabBar from '../components/SmallTabBar';
import { get_version_uptime } from '../context/utils';

export default function Dashboard({ setPage }: { setPage: React.Dispatch<React.SetStateAction<PageType>> }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [systemStats, setSystemStats] = React.useState({
    systemUptime: '00:00:00',
    version: 'None',
    build: 'None',
  });

  //if session key is invalid, redirect to login page
  if (DEBUG) {
    console.log('Rendering Dashboard component');
  } else {
    // Check if session key is valid
    const sessionKey = getSessionKey();
    const isValidSession = sessionKey !== null && sessionKey !== undefined && sessionKey !== '';
    if (!isValidSession) {
      console.log('Invalid session key, redirecting to login page');
      setPage('login');
    }
  }
  const update = () => {
    get_version_uptime()
        .then((data) => {
          setSystemStats({
            systemUptime: data.uptime,
            version: data.Version,
            build: data["VAA Build"],
          });
        }).then(() => {
          fetchJobs().then((data) => {
            //set jobs state
            console.log('Fetched jobs data:', data);
          });
        }); 
  }
  React.useEffect(() => {
    update();
    const int = setInterval(() => {
      //refreh dash data every 10 seconds
      update();
    }, 10000);
    return () => {
      clearInterval(int);
    };
  }, []);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      { drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          
        </Layout.SideDrawer>
      )}
      <SmallTabBar />
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
                    System Uptime
                  </Typography>
                  <Typography level="title-lg">{systemStats.systemUptime}</Typography>
                </Grid>
                <Grid xs={12} sm={3}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    AI Core System
                  </Typography>
                  <Typography level="title-lg" >Idle</Typography>
                </Grid>
                <Grid xs={12} sm={3}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Web Version
                  </Typography>
                  <Typography level="title-lg">{systemStats.version}</Typography>
                </Grid>
                <Grid xs={12} sm={3}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    VAA Build
                  </Typography>
                  <Typography level="title-lg">{systemStats.build}</Typography>
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
                  <Typography level="title-lg" color='success'>{systemStats.systemUptime}</Typography>
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
            <Card variant="outlined" size="sm" onClick={() => setPage('scantool')} sx={{ cursor: 'pointer' }}>
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
                <JobsList setPage={setPage} />
              </Stack>
            </Sheet>


          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}