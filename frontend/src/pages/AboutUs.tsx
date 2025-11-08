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

import Logo from '../../public/VA-AV.png';




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
                            Very Awful Antivirus (VA-AV) wants to revolutionise how people interact with anti-virus software, large commertial solutions are too
                            expensive and invasive for typical home uses, but home users still need something to help when they are not sure about a file! 
                            We have developed AI models to help determine if a Windows Portable Executable (.exe file) is malware and give a confidence score. 
                            We have integrated our AI with a slick web-based user interface that allows our customers to upload files from anywhere.
                        </Typography>
                </Grid>
                <Grid xs={12} sm={1}>

                </Grid>
                <Grid xs={12} sm={1}>
                    <img src={Logo} width={520} />
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
                Very Awful Antivirus (VA-AV) does not keep record of your name, email or any other personal identifiable information, we do however store file paths to the files uploaded
                to our solution, which may include your name if the username includes your name. The file paths uploaded are not associated with any other identifiable 
                information and cannot be accessed by other users. We will not sell any of the information and/or data uploaded to VA-AV or otherwise collected by VA-AV.
                <br/>
                <br/>
                Questions, concerns or clarifications can be addressed to:
                Zach Slaney - 103612275@student.swin.edu.au
            </Typography>
          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}