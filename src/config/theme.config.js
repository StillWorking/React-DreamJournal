import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Commissioner',
  },
  palette: {
      primary: {
        main: '#5d6d7e'
      },
      secondary: {
        main: '#ec7063',
      }
  },
});

export default theme;