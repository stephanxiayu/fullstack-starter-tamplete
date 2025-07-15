export const oneYearFromNow = (): Date => {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
};

export const thirtyDaysFromNow = (): Date => {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
};

export const fifteenMinutesFromNow = (): Date => {
  return new Date(Date.now() + 15 * 60 * 60 * 1000);
};

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const fiveMinutesAgo = (): Date => {
  return new Date(Date.now() - 5 * 60 * 1000);
};
export const oneHourFromNow = (): Date => {
  return new Date(Date.now() + 60 * 60 * 60 * 1000);
};
