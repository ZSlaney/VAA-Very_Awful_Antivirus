import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PolicyIcon from '@mui/icons-material/Policy';
import InfoIcon from '@mui/icons-material/Info';
import type { PageType } from '../App';

export default function SmallTabBar({setPage}: {setPage: React.Dispatch<React.SetStateAction<PageType>>}) {
    return (
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
          onClick={() => setPage('dashboard')}
          size="sm"
          startDecorator={<DashboardIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Dashboard
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          onClick={() => setPage('analytics')}
          size="sm"
          startDecorator={<AnalyticsIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Analytics
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          onClick={() => setPage('scantool')}
          size="sm"
          startDecorator={<PolicyIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Scan Tool
        </Button>
         <Button
          variant="plain"
          color="neutral"
          
          component="a"
          onClick={() => setPage('about')}
          size="sm"
          startDecorator={<InfoIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          About Us
        </Button>
      </Stack>
    )
}