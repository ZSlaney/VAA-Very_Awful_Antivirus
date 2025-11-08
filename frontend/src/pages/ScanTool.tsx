import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import {
  CssBaseline, AspectRatio, Avatar, AvatarGroup, Box, Button, Card, CardOverflow, Typography,
  IconButton, Divider, Sheet, List, ListItem, ListDivider, ListItemButton,
  ListItemContent, Stack, Chip, Dropdown, Menu, MenuButton, MenuItem, CircularProgress, Grid, LinearProgress,
  Stepper, Step, StepIndicator
} from '@mui/joy';

import { useFileDialog } from '@reactuses/core'

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UploadIcon from '@mui/icons-material/Upload';

import Layout from '../components/Layout';
import Header from '../components/Header';
import SideDrawer from '../components/Navigation';
import SmallTabBar from '../components/SmallTabBar';


import type { PageType } from '../App';

interface Job {
  id: number;
  filepath: string;
  model: string;
  status: 'Pending' | 'FileLoad' | 'Model' | 'Completed' | 'Error';
  result: string;
}

import { DEBUG } from '../App';
import { getCurrentJob, getSessionKey } from '../context/utils';



function formatFileSize(sizeInBytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}


export default function ScanTool({ setPage }: { setPage: React.Dispatch<React.SetStateAction<PageType>> }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [currentJob, setCurrentJob] = React.useState<Job | null>(null);
  const [currentjobNumber, setCurrentJobNumber] = React.useState<number | null>(null);


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
  React.useEffect(() => {
    const job = getCurrentJob(); //returns number
    if (job) {
      setCurrentJob(job);
      setCurrentJobNumber(job);
    }
  }, []);


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
              <Grid container spacing={2} sx={{ p: 2, width: '100%' }}>
                <Grid xs={12} md={9}>
                  <Stack>
                    <Stepper size="lg" sx={{ mb: 1 }}>
                      <Step
                        indicator={
                          <CircularProgress size="sm" determinate={true}>
                              <Typography level="body-xs" sx={{ color: 'white' }}>1</Typography>
                            </CircularProgress>
                        }
                      >Loading File</Step>
                      <Step
                        indicator={
                           <CircularProgress size="sm" determinate={true}>
                              <Typography level="body-xs" sx={{ color: 'white' }}>2</Typography>
                            </CircularProgress>
                        }
                      >Executing Model</Step>
                      <Step
                        indicator={
                            <CircularProgress size="sm" determinate={true}>
                              <Typography level="body-xs" sx={{ color: 'white' }}>3</Typography>
                            </CircularProgress>
                         
                        }
                      >Results Processing</Step>
                    </Stepper>

                    <LinearProgress determinate value={25} />
                  </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Model
                  </Typography>
                  <Typography level="h4">RandomForest</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{ fontWeight: '600' }}
                  >
                    +24 since last week
                  </Chip>
                </Grid>
                <Grid xs={12} md={4}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    JobNumber
                  </Typography>
                  <Typography level="h4">34</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{ fontWeight: '600' }}
                  >
                    +2 since last week
                  </Chip>
                </Grid>
                <Grid xs={12} md={4}>
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Verdict
                  </Typography>
                  <Typography level="h4">Benign</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{ fontWeight: '600' }}
                  >
                    Confidence: 85%
                  </Chip>
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
              <List size="sm" aria-labelledby="table-in-list">
                <ListItem>
                  <ListItemButton variant="soft" sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          level="title-sm"
                          startDecorator={<FolderRoundedIcon color="primary" />}
                          sx={{ alignItems: 'flex-start' }}
                        >
                          Travel pictures
                        </Typography>
                        <AvatarGroup
                          size="sm"
                          sx={{
                            '--AvatarGroup-gap': '-8px',
                            '--Avatar-size': '24px',
                          }}
                        >
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
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}
                      >
                        <Typography level="body-sm">987.5MB</Typography>

                        <Typography level="body-sm">21 Oct 2023, 3PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListDivider />
              </List>
            </Sheet>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">lotr-two-towers.pdf</Typography>
                  <Typography level="body-sm">132.2MB</Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{
                      maxWidth: '32px',
                      maxHeight: '32px',
                      borderRadius: '9999999px',
                    }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon color="danger" />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=400&auto=format"
                    srcSet="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=400&auto=format&dpr=2 2x"
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 27 Jun 2023</Typography>
            </Card>

          </Box>
        </Layout.Main>
        <FileUploadWindow />
      </Layout.Root>
    </CssVarsProvider>
  );
}

import { uploadFile } from '../context/utils';
import { getPermLevel } from '../context/utils';

function FileUploadWindow() {
  const [files, open, reset] = useFileDialog();
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (files && files.length > 0) {
      console.log('Selected files:', files);
      setFile(files[0]);
      // Here you can add code to handle the selected files, e.g., upload them to the server
      // After handling the files, you might want to reset the file dialog
      reset();
    }
  }, [files]);

  const handleFileUpload = async () => {
    if (file) {
      // Here you can add code to handle the file upload, e.g., send it to the server
      console.log('Uploading file:', file);

      try {
        const result = await uploadFile(file, getPermLevel());
        console.log('Upload successful:', result);
        //on successful upload, reset the file state and set the current job number
        setFile(null);
        //setCurrentJobNumber(newJobNumber); //you need to implement getting the new job number after upload
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };
      //


  return (
    <Sheet
      sx={{
        display: { xs: 'none', sm: 'initial' },
        borderLeft: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Typography level="title-md" sx={{ flex: 1 }}>
          File Upload
        </Typography>
        <Typography level="title-md" sx={{ flex: 1 }}>
          {file ? file.name : 'No file selected'}
        </Typography>

      </Box>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-sm" sx={{ mr: 1 }}>
          Upload File
        </Typography>
        <Button variant="outlined" size="sm" startDecorator={<UploadIcon />}
          onClick={() => open({ multiple: false, accept: '.exe' })}
        >
          Upload
        </Button>
      </Box>
      {file &&
        <>
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
              {file ? file.type || 'Unknown' : 'No file selected'}
            </Typography>
            <Typography level="title-sm">Size</Typography>
            <Typography level="body-sm" textColor="text.primary">
              {file ? formatFileSize(file.size) : 'No file selected'}
            </Typography>
            <Typography level="title-sm">Last Modified</Typography>
            <Typography level="body-sm" textColor="text.primary">
              {file ? new Date(file.lastModified).toLocaleDateString() : 'No file selected'}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ py: 2, px: 1 }}>
            <Button size="sm" endDecorator={<EditRoundedIcon />} onClick={() => handleFileUpload()}>
              Add Job
            </Button>
          </Box>
        </>
      }
    </Sheet>
  )
}