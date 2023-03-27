import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Segoe UI Emoji', 'BIZ UDPGothic', sans-serif`,
    body: `'Segoe UI Emoji', 'BIZ UDPGothic', sans-serif`,
  },
  styles: {
    global: {
      body: {
        color: '#0e0e0e',
        backgroundColor: '#dcd0c0',
      },
      mark: {
        background: 'linear-gradient(transparent 15%, #ff6 60%)'
      },
    },
  },
});

export default theme;
