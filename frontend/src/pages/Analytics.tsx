import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import {
  CssBaseline,
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  Typography,
  Sheet,
  Stack,
} from '@mui/joy';



import Layout from '../components/Layout';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import JobsTable from '../components/JobsTable';
import JobsList from '../components/JobsList';




import { DEBUG, type PageType } from '../App';

import SmallTabBar from '../components/SmallTabBar';
const data = [
  {
    name: 'Page A',
    uv: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 300,
    pv: 4567,
    amt: 2400,
  },
  {
    name: 'Page C',
    uv: 320,
    pv: 1398,
    amt: 2400,
  },
  {
    name: 'Page D',
    uv: 200,
    pv: 9800,
    amt: 2400,
  },
  {
    name: 'Page E',
    uv: 278,
    pv: 3908,
    amt: 2400,
  },
  {
    name: 'Page F',
    uv: 189,
    pv: 4800,
    amt: 2400,
  },
];
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import ScansTable from '../components/ScanTable';



export default function Analytics({setPage}: {setPage: React.Dispatch<React.SetStateAction<PageType>>}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <SmallTabBar/>
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
          <Navigation />
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
                display: { xs: 'none', md: 'flex' },
                width: '100%',
              }}
            >
              <Stack justifyContent="space-between" sx={{ p: 2 , width: '100%'}}>
                <Typography level="title-md">
                  Malware Detections
                </Typography>
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <Box sx={{ width: '50%', height: '50%', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ResponsiveContainer width="90%" height="90%">
                      <LineChart
                              data={data}
                              
                            >
                              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                              <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
                              <XAxis dataKey="name" />                             
                            </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </AspectRatio>
              </Stack>
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                display: { xs: 'none', md: 'flex' },
                width: '100%',
              }}
            >
              <Stack justifyContent="space-between" sx={{ p: 2 , width: '100%'}}>
                <Typography level="title-md">
                  Scan Confidence
                </Typography>
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <Box sx={{ width: '50%', height: '50%', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ResponsiveContainer width="90%" height="90%">
                      <LineChart
                              data={data}
                            >
                              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                              <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
                              <XAxis dataKey="name" />
                            </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </AspectRatio>
              </Stack>
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                display: { xs: 'none', md: 'flex' },
                width: '100%',
              }}
            >
              <Stack justifyContent="space-between" sx={{ p: 1 , width: '100%'}}>
                <Typography level="title-md" sx={{mt:1, ml:1, mb:1}}>
                  Jobs
                </Typography>
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <Box sx={{ width: '50%', height: '50%', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ResponsiveContainer width="90%" height="90%">
                      <LineChart
                              data={data}
                            >
                              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                              <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
                              <XAxis dataKey="name" />
                            </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </AspectRatio>
              </Stack>
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                display: { xs: 'none', md: 'flex' },
                width: '100%',
              }}
            >
              <Stack justifyContent="space-between" sx={{ p: 1 , width: '100%'}}>
                <Typography level="title-md" sx={{mt:1, ml:1, mb:1}}>
                  Most Used Model
                </Typography>
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <Box sx={{ width: '50%', height: '50%', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ResponsiveContainer width="95%" height="95%">
                      <LineChart
                              data={data}
                            >
                              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                              <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
                              <XAxis dataKey="name" />
                            </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </AspectRatio>
              </Stack>
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <ScansTable />
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
              <JobsList />
            </Sheet>
          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
  