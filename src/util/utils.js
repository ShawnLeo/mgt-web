export const domain = () => {
  return encodeURIComponent(window.location.href.split('#')[0]);
};
