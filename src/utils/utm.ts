export const setUtmTrackingUrl = (url: string) => {
  localStorage.setItem('utm_tracking_url', url);
};

export const getUtmTrackingUrl = () => {
  return localStorage.getItem('utm_tracking_url');
};
