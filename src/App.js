import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { SnackbarProvider } from 'notistack';
import { store, history } from './configurations/redux/store';
import applyTheme from './configurations/materialUI/theme';
import ApplicationRouter from './configurations/routing/ApplicationRouter';

import Loader from './globals/components/Loader/Loader';
import NotiSnackbar from './globals/components/NotiSnackbar/NotiSnackbar';
import OfflineModeBackDrop from './globals/components/OfflineModeBackDrop';

const snackbarStyle = {
  root: {
    borderRadius: '0px',
    backgroundColor: '#193661',
  },
  containerRoot: {
    borderRadius: '0px',
    backgroundColor: '#193661',
  },
  containerAnchorOriginTopCenter: {
    borderRadius: '0px',
    backgroundColor: '#193661',
  },
};

const useSnackbarStyle = makeStyles({
  snackbarStyle,
});

const SnackbarProviderWrapper = props => {
  const { children } = props;
  const classes = useSnackbarStyle();
  return (
    <SnackbarProvider
      classes={{
        root: classes.root,
        containerRoot: classes.containerRoot,
        containerAnchorOriginTopCenter: classes.containerAnchorOriginTopCenter,
      }}
      maxSnack={1}
      preventDuplicate
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: applyTheme(),
      isOnline: true,
    };
  }

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  updateOnlineStatus = () => {
    if (navigator.onLine) {
      document.getElementsByTagName('body')[0].removeAttribute('class');
      this.setState({ isOnline: true });
    } else {
      document.getElementsByTagName('body')[0].setAttribute('class', 'offline');
      this.setState({ isOnline: false });
    }
  };

  render() {
    const { theme, isOnline } = this.state;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <Scrollbars autoHeight autoHeightMin="100vh">
              <SnackbarProviderWrapper>
                <ApplicationRouter />
                <Loader />
                <NotiSnackbar />
                <OfflineModeBackDrop isOnline={isOnline} />
              </SnackbarProviderWrapper>
            </Scrollbars>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
