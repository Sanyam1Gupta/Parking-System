import moment from 'moment';

const setCookies = (name, value, expiry = '') => {
  const cookierArr = [];
  const cookieName = `${name}=${value}`;
  cookierArr.push(cookieName);
  if (expiry) {
    const expiryDate = `expires= ${expiry}`;
    cookierArr.push(expiryDate);
  }
  document.cookie = cookierArr.join(';');
};

const setBannerCookie = () => {
  const expiryDate = moment()
    .utc()
    .endOf('day');
  // NOTE: setting up carousel cookie
  setCookies('landingCarousel', 1, expiryDate);
};

const getCookieByName = cname => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export { setCookies, setBannerCookie, getCookieByName };
