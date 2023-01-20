import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'BIZ UDPGothic', sans-serif`,
    body: `'BIZ UDPGothic', sans-serif`,
  },
  styles: {
    global: {
      body: {
        color: '#0e0e0e',
        backgroundColor: '#dcd0c0',
      },
      mark: {
        backgroundColor: '#ff6',
      },
    },
  },
});

export default theme;
