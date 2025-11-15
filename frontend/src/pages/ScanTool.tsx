import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import {
  CssBaseline, AspectRatio, Box, Button, Typography,
  Divider, Sheet,
  Stack, Chip, CircularProgress, Grid,
  Stepper, Step, Option,
  Select
} from '@mui/joy';

import { useFileDialog } from '@reactuses/core'

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import UploadIcon from '@mui/icons-material/Upload';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

import Layout from '../components/Layout';
import Header from '../components/Header';
import SideDrawer from '../components/Navigation';
import SmallTabBar from '../components/SmallTabBar';


import type { PageType } from '../App';

interface Job {
  id: number;
  model_name: string;
  status: "Complete" | "Pending";
  result: {
    Classification: string;
    Confidence: number;
  };
  timestamp: string;
  hash: string;
  filename: string;
}

import { DEBUG } from '../App';
import { getCurrentJob, getSessionKey, setCurrentJob, fetchJobDetails, queryScanDB } from '../context/utils';

import { LineChart, Line, XAxis, CartesianGrid, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

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
  }];

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
  const [result, setResult] = React.useState<string>('');
  const [confidence, setConfidence] = React.useState<number>(0);
  const [step, setStep] = React.useState<number>(0);
  const [fileHistory, setFileHistory] = React.useState<any[]>([]);
  const fetchedForJobId = React.useRef<number | null>(null);

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
  const fetchJob = (job: number) => {
    fetchJobDetails(job).then((data) => {
      console.log('Fetched job details:', data);

      setCurrentJob(prev => {
        // if prev is null, accept new data
        if (!prev) return data;
        const sameId = prev.id === data.id;
        const sameStatus = prev.status === data.status;
        const sameTimestamp = prev.timestamp === data.timestamp;
        const sameResultConfidence = prev.result?.Confidence === data.result?.Confidence;
        const sameResultClass = prev.result?.Classification === data.result?.Classification;
        const sameHash = prev.hash === data.hash;
        const sameFilename = prev.filename === data.filename;

        if (sameId && sameStatus && sameTimestamp && sameResultConfidence && sameResultClass && sameHash && sameFilename) {
          return prev;
        }
        return data;
      });
    }).catch((error) => {
      console.error('Error fetching job details:', error);
    });
  };
  React.useEffect(() => {
    if (!currentJob) return;

    if (currentJob.status === "Complete") {
      setStep(4);
      setResult(currentJob.result.Classification);
      setConfidence(currentJob.result.Confidence);

      // Fetch history once per job id
      if (fetchedForJobId.current !== currentJob.id) {
        fetchedForJobId.current = currentJob.id;

        const hash = currentJob.hash;
        const newdata: { date: string; confidence: number, result: string }[] = [];
        queryScanDB({ filter: 100 })
          .then((newData) => {
            // invert the data to have most recent last
            const maindata: any[] = newData.reverse();
            for (let i =0; i < maindata.length; i++) {
              const entry = maindata[i];
              if (entry.hash == hash) {
                const date = entry.timestamp;
                const cls = entry.Result.Classification;
                if (cls == "BENIGNWARE") {
                  newdata.push({ date: date, confidence: entry.Result.Confidence, result: cls });
                } else {
                  newdata.push({ date: date, confidence: -entry.Result.Confidence, result: cls });
                }
              }
            }
            setFileHistory(newdata);
          })
          .catch((error) => {
            console.error('Error fetching scan DB data:', error);
          });
      }
    } else if (currentJob.status === "Pending") {
      setStep(2);
    }
  }, [currentJob]);

  React.useEffect(() => {
    let interval = setInterval(() => {
      const job = getCurrentJob(); //returns number
      console.log('Current job number:', job);
      if (job !== null) {
        fetchJob(Number(job));
      }
    }, 2000);
    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
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
                          <CircularProgress
                            size="sm"
                            determinate={!(step > 0 && step < 2)}
                            value={step < 1 ? 0 : step === 1 ? 25 : 100}
                          >
                            <Typography level="body-xs" sx={{ color: 'white' }}>1</Typography>
                          </CircularProgress>
                        }
                      >Loading File</Step>
                      <Step
                        indicator={
                          <CircularProgress size="sm" determinate={!(step > 1 && step < 3)} value={step < 2 ? 0 : step === 2 ? 25 : 100}>
                            <Typography level="body-xs" sx={{ color: 'white' }}>2</Typography>
                          </CircularProgress>
                        }
                      >Executing Model</Step>
                      <Step
                        indicator={
                          <CircularProgress size="sm" determinate={!(step > 2 && step < 4)} value={step < 3 ? 0 : step === 3 ? 25 : 100}>
                            <Typography level="body-xs" sx={{ color: 'white' }}>3</Typography>
                          </CircularProgress>

                        }
                      >Results Processing</Step>
                    </Stepper>

                  </Stack>
                </Grid>
                {currentJob?.status == "Complete" && <>
                  <Grid xs={12} md={4}>
                    <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                      JobNumber
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography level="h4">{currentJob?.id ? currentJob.id : 'Unknown'}</Typography>
                  </Grid>
                  <Grid xs={12} md={4}>
                    <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                      Model
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography level="h4">{currentJob?.model_name ? currentJob.model_name : 'Unknown'}</Typography>
                  </Grid>
                  <Grid xs={12} md={4}>
                    <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                      Verdict
                    </Typography>
                    <Typography level="h4" color={result == "BENIGNWARE" ? "success" : "danger"}>{result == "BENIGNWARE" ? "BENIGN" : "MALWARE"}</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Chip
                      size="sm"
                      variant="soft"
                      color="primary"
                      sx={{ fontWeight: '600' }}
                    >
                      Confidence: {confidence ? `${confidence.toFixed(2)}%` : 'Unknown'}
                    </Chip>
                  </Grid>
                </>}
              </Grid>

            </Sheet>
            {currentJob?.status == "Complete" &&
              <Sheet
                variant="outlined"
                sx={{
                  borderRadius: 'sm',
                  gridColumn: '1/-1',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <Stack justifyContent="space-between" sx={{ p: 1, width: '100%', height: '100%' }}>
                  <Typography level="title-md" sx={{ mb: 1 }}>
                    File History
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                    <Box sx={{ width: '90%', height: '90%', display: 'flex', alignItems: 'center', mb: 2 }}>
                      <ResponsiveContainer width="90%" height="90%">
                        <LineChart
                          data={fileHistory}
                        >
                          <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                          <Line type="monotone" dataKey="confidence" stroke="purple" strokeWidth={2} name={currentJob?.filename} />
                          <XAxis dataKey="date" />
                          <YAxis allowDataOverflow dataKey="confidence" domain={['auto', 'auto']} />
                          <Tooltip />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </AspectRatio>
                </Stack>
              </Sheet>
            }
          </Box>
        </Layout.Main>
        <FileUploadWindow setStep={setStep} />
      </Layout.Root>
    </CssVarsProvider>
  );
}

import { uploadFile } from '../context/utils';

function FileUploadWindow({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
  const [files, open, reset] = useFileDialog();
  const [file, setFile] = React.useState<File | null>(null);
  const [modelName, setModelName] = React.useState<string>("RandomForestV1");

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
      setStep && setStep(1); //move to step 1
      console.log('Uploading file:', file, 'with model:', modelName);

      try {
        const result = await uploadFile(file, modelName); // Use selected model name
        console.log('Upload successful:', result);
        setCurrentJob(result['Job Id']);
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
            <Select size="sm" defaultValue={"RandomForestV1"} onChange={(e, value) => { if (value) setModelName(value) }} startDecorator={"Model:"} endDecorator={< DeveloperBoardIcon />}>
              <Option value={"RandomForestV1"}>Random Forest V1</Option> {/* Placeholder*/}
              <Option value={"LogisticRegressionV1"}>Logistic Regression V1</Option> {/* Placeholder*/}
            </Select>
          </Box>
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