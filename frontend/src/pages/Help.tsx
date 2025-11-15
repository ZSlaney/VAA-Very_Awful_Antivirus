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

export default function Help({setPage}: {setPage: React.Dispatch<React.SetStateAction<PageType>>}) {
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
            {/* Make Changes to the stuff here */}
 <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: 2,
              margin: 4,
            }}
          >
            {/* Intro + logo */}
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={12} sm={8}>
                <Typography
                  color="neutral"
                  level="h1"
                  noWrap={false}
                  variant="plain"
                  sx={{ mb: 1 }}
                >
                  Help & Getting Started
                </Typography>
                <Typography
                  color="neutral"
                  level="body-lg"
                  noWrap={false}
                  variant="plain"
                >
                  Very Awful Antivirus (VA-AV) is designed to give home users a simple way
                  to check suspicious Windows Portable Executable files (<code>.exe</code>)
                  using AI models. VA-AV analyses files and provides a classification
                  (e.g. <b>MALWARE</b> or <b>BENIGN</b>) along with a confidence value
                  when available. The web interface lets you upload files from anywhere
                  with an internet connection.
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Vite serves files from /public at the root path */}
                <img src="/VA-AV.png" width={260} alt="VA-AV Logo" />
              </Grid>
            </Grid>

            {/* How to use */}
            <Box sx={{ mt: 4 }}>
              <Typography level="h2" color="neutral" variant="plain" sx={{ mb: 1 }}>
                How to Use VA-AV
              </Typography>
              <Typography level="body-lg" color="neutral" noWrap={false} variant="plain">
                1. Go to the <b>Scan Tool</b> tab from the navigation.<br />
                2. Click the file upload area and select a Windows <code>.exe</code> file
                from your computer.<br />
                3. Choose the desired AI model if there are multiple options.<br />
                4. Start the scan and wait for the result to appear in the jobs list.<br />
                5. Click on a job to view detailed results, including classification,
                confidence (if available), and other metadata.
                <br />
                <br />
                <b>Important:</b> If you plan to test with real malware samples, always use
                a virtual machine (VM) or isolated environment. Do not run or store real
                malware on your main everyday system.
              </Typography>
            </Box>

            {/* FAQ */}
            <Box sx={{ mt: 4 }}>
              <Typography level="h2" color="neutral" variant="plain" sx={{ mb: 1 }}>
                Frequently Asked Questions (FAQ)
              </Typography>

              <Typography level="body-lg" color="neutral" noWrap={false} variant="plain" sx={{ mb: 1, mt: 2 }}>
                <b>Q: I&apos;m seeing a &quot;Your connection is not private&quot; warning in my browser.</b>
                <br />
                <b>A:</b> VA-AV is currently in early development and may use a self-signed
                certificate in some deployments. This means the connection is still
                encrypted, but the browser cannot verify the certificate with a
                recognised Certificate Authority. If you trust the deployment environment,
                you can click <b>&quot;Advanced&quot;</b> and then <b>&quot;Proceed to
                website&quot;</b> to continue. Do not do this on random or untrusted sites.
              </Typography>

              <Typography level="body-lg" color="neutral" noWrap={false} variant="plain" sx={{ mb: 1, mt: 2 }}>
                <b>Q: What file types can I upload?</b>
                <br />
                <b>A:</b> VA-AV currently focuses on Windows Portable Executable files
                (<code>.exe</code>). Other file types may be rejected or may not be
                analysed correctly.
              </Typography>

              <Typography level="body-lg" color="neutral" noWrap={false} variant="plain" sx={{ mb: 1, mt: 2 }}>
                <b>Q: What do the scan results mean?</b>
                <br />
                <b>MALWARE</b> – The model believes the file is malicious.<br />
                <b>BENIGN</b> – The model did not detect malicious behaviour.<br />
                <b>Unknown / Confidence: Unknown</b> – The model could not produce a
                meaningful confidence score or was not sure.
                <br />
                <br />
                No automated scanner is perfect. Always combine VA-AV results with your
                own judgement and good security practices.
              </Typography>

              <Typography level="body-lg" color="neutral" noWrap={false} variant="plain" sx={{ mb: 1, mt: 2 }}>
                <b>Q: My login isn&apos;t working.</b>
                <br />
                <b>A:</b> Make sure your username and password are typed exactly as they
                were created (they are case-sensitive). If the issue persists, the backend
                server may be offline or the account may not exist on this deployment.
                Contact the system maintainer for assistance.
              </Typography>
            </Box>

            {/* Privacy Policy */}
            <Box sx={{ mt: 4, mb: 6 }}>
              <Typography
                color="neutral"
                level="h2"
                noWrap={false}
                variant="plain"
                sx={{ mb: 1 }}
              >
                Privacy Policy
              </Typography>

              <Typography
                color="neutral"
                level="body-lg"
                noWrap={false}
                variant="plain"
              >
                Very Awful Antivirus (VA-AV) does not store your name, email, or other
                directly personally identifiable information by default. However, we may
                store file paths for uploaded files, which can sometimes contain your
                username or other identifiers (for example,
                <code>C:\Users\YourName\Downloads\file.exe</code>).
                <br />
                <br />
                These file paths are not shared with other users and are only used to
                provide scan history and debugging information. We do not sell or share
                data uploaded to VA-AV with third parties.
                <br />
                <br />
                Questions, concerns, or requests for clarification can be directed to:
                <br />
                <b>Zach Slaney</b> – 103612275@student.swin.edu.au
              </Typography>
            </Box>
          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}