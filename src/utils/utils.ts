export const isDemoRoute = (route: string = location.pathname): Boolean => {
  return /^\/demo\d$/.test(route);
};
