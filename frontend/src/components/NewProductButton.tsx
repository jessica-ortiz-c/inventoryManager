import React from 'react';
import { Button } from '@mui/material';

function NewProductButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outlined" sx={{ p: '10px', width: '25%' }} onClick={onClick}>
      New product
    </Button>
  );
}

export default NewProductButton;
