import { store } from '../configurations/redux/store';

const isDesktop = () => {
  const state = store.getState();
  const { appStateStore } = state;
  const { deviceInfo = {} } = appStateStore;
  const { deviceWidth } = deviceInfo;
  return deviceWidth && Number(deviceWidth) >= 900;
};

const getSnackbarPosition = () => {
  const snackbarPosition = {
    horizontal: 'center',
    vertical: 'top',
  };

  if (isDesktop()) {
    snackbarPosition.horizontal = 'center';
    snackbarPosition.vertical = 'top';
  }
  return snackbarPosition;
};

export { isDesktop, getSnackbarPosition };
