// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../../Header/MainCard';

// assets
import avatar from '../../../../../../public/images/avatar-group.png';
import AnimateButton from '../../AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

export default function NavCard() {
  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems="center" spacing={2.5}>
        <Stack alignItems="center">
          <Typography variant="h5"> welcome Moderator</Typography>
          <Typography variant="h6" color="secondary">
            This is the navigation
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
}
