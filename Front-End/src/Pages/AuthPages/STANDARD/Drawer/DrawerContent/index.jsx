// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from './SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <Navigation />
        <NavCard />
      </SimpleBar>
    </>
  );
}
