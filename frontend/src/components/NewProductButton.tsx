import { Button } from '@mui/material';
import styles from './styles/NewProductButton.module.css'

function NewProductButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="contained" className={styles.btn} onClick={onClick}>  {/* sx={{ p: '10px', width: '25%' }} */}
      New product
    </Button>
  );
}

export default NewProductButton;
