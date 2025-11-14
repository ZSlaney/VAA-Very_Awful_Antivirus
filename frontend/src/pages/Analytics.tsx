import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import {
  CssBaseline,
  AspectRatio,
  Box,
  Typography,
  Sheet,
  Stack,
} from '@mui/joy';



import Layout from '../components/Layout';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
//import JobsTable from '../components/JobsTable';
import JobsList from '../components/JobsList';




import { DEBUG, type PageType } from '../App';

import SmallTabBar from '../components/SmallTabBar';



interface malwareDetectionEntry {
  date: string;
  count: number;
}
interface scanConfidenceEntry {
  index: number;
  confidence: number;
}
interface jobsEntry {
  date: string;
  jobs: number;
}
interface modelUsageEntry {
  model: string;
  usage: number;
}
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, PieChart, BarChart, Bar, Pie, Rectangle, Tooltip } from 'recharts';
import ScansTable from '../components/ScanTable';
import { getSessionKey, queryScanDB } from '../context/utils';


export default function Analytics({ setPage }: { setPage: React.Dispatch<React.SetStateAction<PageType>> }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);
  const [malwareDetections, setMalwareDetections] = React.useState<any[]>([]);
  const [scanConfidence, setScanConfidence] = React.useState<any[]>([]);
  const [jobsData, setJobsData] = React.useState<any[]>([]);
  const [mostUsedModel, setMostUsedModel] = React.useState<any[]>([]);
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

  const updateData = () => {
    // Fetch new data and update state
    queryScanDB({ "filter": 100 }).then((newData) => {
      const maindata: any[] = newData;
      //invert the data to have most recent last


      const malwareDetectionsData: malwareDetectionEntry[] = [];
      const scanConfidenceData: scanConfidenceEntry[] = [];
      const mostUsedModelData: modelUsageEntry[] = [];
      //process newData to fill in the above arrays


      for (let i = 0; i < maindata.length; i++) {
        const entry = maindata[i];
        const date = entry.timestamp.split(',')[0]; // Extract date portion
        if (entry.Result.Classification === 'MALWARE') {
          const existingEntry = malwareDetectionsData.find((e) => e.date === date);
          if (existingEntry) {
            existingEntry.count += 1;
          } else {
            malwareDetectionsData.push({ date, count: 1 });
          }
        } else {
          const existingEntry = malwareDetectionsData.find((e) => e.date === date);
          if (!existingEntry) {
            malwareDetectionsData.push({ date, count: 0 });
          }
        }
      }
      setMalwareDetections(malwareDetectionsData.reverse());
      console.log('Analytics page - processed malware detections data:', malwareDetectionsData);
      setData(maindata);
      console.log('Analytics page - fetched scan data:', maindata);


      for (let i = 0; i < maindata.length; i++) {
        const entry = maindata[maindata.length - 1 - i];
        scanConfidenceData.push({ index: i+1, confidence: entry.Result.Confidence });
      }
      setScanConfidence(scanConfidenceData);
      console.log('Analytics page - processed scan confidence data:', scanConfidenceData);

      //process most used model data
      const modelUsageMap: { [key: string]: number } = {};
      for (let i = 0; i < maindata.length; i++) {
        const entry = maindata[i];
        const model = entry.model_name;
        if (model in modelUsageMap) {
          modelUsageMap[model] += 1;
        } else {
          modelUsageMap[model] = 1;
        }
      }
      for (const model in modelUsageMap) {
        mostUsedModelData.push({ model, usage: modelUsageMap[model] });
      }
      setMostUsedModel(mostUsedModelData);
      console.log('Analytics page - processed most used model data:', mostUsedModelData);
    });

  };
  React.useEffect(() => {
    updateData();
  }, []);


  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
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
              <Stack justifyContent="space-between" sx={{ p: 2, width: '100%' }}>
                <Typography level="title-md">
                  Malware Detections
                </Typography>
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <Box sx={{ width: '50%', height: '50%', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ResponsiveContainer width="90%" height="90%">
                      <BarChart
                        data={malwareDetections}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis width="auto" dataKey="count" />
                        <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                      </BarChart>
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
              <Stack justifyContent="space-between" sx={{ p: 2, width: '100%' }}>
                <Typography level="title-md">
                  Scan Confidence
                </Typography>
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <Box sx={{ width: '50%', height: '50%', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ResponsiveContainer width="90%" height="90%">
                      <LineChart
                        data={scanConfidence}
                      >
                        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="confidence" stroke="purple" strokeWidth={2} name="Confidence" />
                        <XAxis dataKey="index" />
                        <YAxis name="confidence" dataKey="confidence"/>
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
              <Stack justifyContent="space-between" sx={{ p: 1, width: '100%' }}>
                <Typography level="title-md" sx={{ mt: 1, ml: 1, mb: 1 }}>
                  Most Used Model
                </Typography>
                <AspectRatio ratio="16/9" color="neutral" sx={{ borderRadius: 0 }}>
                  <Box sx={{ width: '50%', height: '50%', display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ResponsiveContainer width="95%" height="95%">
                      <PieChart
                        data={mostUsedModel}
                      >
                        <Pie type='' dataKey="usage" nameKey="model" />
                        <Legend />
                        <Tooltip />
                      </PieChart>
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
              <ScansTable data={data} />
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                display: { xs: 'inherit', sm: 'none' },
                borderRadius: 'sm',
                overflow: 'auto',
                maxHeight: '40vh',
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
