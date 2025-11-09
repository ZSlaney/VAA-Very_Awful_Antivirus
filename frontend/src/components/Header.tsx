import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import Navigation from './Navigation';
import { clearAuth, getUser } from '../context/utils';
import { DEBUG, type PageType } from '../App';
import UsersModal from './UsersModal';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        data-screenshot="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: 'center' }}
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}



export default function Header({setPage}: {setPage: React.Dispatch<React.SetStateAction<PageType>>}) {
  const [open, setOpen] = React.useState(false);
  const [usersOpen, setUsersOpen] = React.useState(false);

  const [perm_level, setPermLevel] = React.useState('');
  const [username, setUsername] = React.useState('');

  const OnLogout = () => {
    // Clear session key and redirect to login page
    clearAuth();
    setPage('login');
  };

  React.useEffect(() => {
    // Fetch user permission level from backend
    if (DEBUG) {
      console.log('Fetching user permission level');
      setPermLevel('Administrator');
      setUsername('Admin');
    } else {
      const user = getUser();
      if (user === null) {
        OnLogout();
      } else {
        setPermLevel(user.perm_level);
        setUsername(user.username);
      }
    }
  }, []);


  return (
    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
      <UsersModal open={usersOpen} setOpen={setUsersOpen} />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{ display: { xs: 'none', sm: 'inline-flex' }, borderRadius: '50%' }}
        >
          <LanguageRoundedIcon />
        </IconButton>
        <Button
          variant="plain"
          color="neutral"

          onClick={() => setPage('dashboard')}
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          Dashboard
        </Button>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => setPage('analytics')}
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          Analytics
        </Button>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => setPage('scantool')}
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          Scan Tool
        </Button>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => setPage('about')}
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          About Us
        </Button>
      </Stack>
      <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
        <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>Very Awful AntiVirus</DialogTitle>
          <Box sx={{ px: 1 }}>
            <Navigation />
          </Box>
        </Drawer>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <ColorSchemeToggle />
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}
          >
            <Avatar
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ maxWidth: '32px', maxHeight: '32px' }}
            />
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src="https://i.pravatar.cc/40?img=2"
                  srcSet="https://i.pravatar.cc/80?img=2"
                  sx={{ borderRadius: '50%' }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    {username}
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {perm_level}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <HelpRoundedIcon />
              Help
            </MenuItem>
            <MenuItem onClick={() => setUsersOpen(true)}>
              <SettingsRoundedIcon />
              Users
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <LogoutRoundedIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}