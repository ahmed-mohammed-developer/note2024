import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function MySnakBar({ open, message }) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message={message}
        ContentProps={{
          style: {
            backgroundColor: '#223b40', // تغيير لون الخلفية إلى الأخضر
            color: 'white', // تغيير لون النص إلى الأبيض
          },
        }}
      />
    </div>
  );
}
