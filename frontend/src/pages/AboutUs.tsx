import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import Typography from '@mui/joy/Typography';


import Layout from '../components/Layout';
import Header from '../components/Header';
import {  Grid } from '@mui/joy';
import SideDrawer from '../components/Navigation';
import type { PageType } from '../App';
import SmallTabBar from '../components/SmallTabBar';
const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 300, pv: 4567, amt: 2400 }, { name: 'Page C', uv: 200, pv: 1398, amt: 2400 }, { name: 'Page D', uv: 278, pv: 3908, amt: 2400 }, { name: 'Page E', uv: 189, pv: 4800, amt: 2400 }, { name: 'Page F', uv: 239, pv: 3800, amt: 2400 }, { name: 'Page G', uv: 349, pv: 4300, amt: 2400 }];




export default function AboutUs({setPage}: {setPage: React.Dispatch<React.SetStateAction<PageType>>}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <SideDrawer />
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
      </Layout.Root>
    </CssVarsProvider>
  );
}