export const gameDefaultInclude = {
  prefecture: {
    include: {
      region: true,
    },
  },
  user: true,
  logs: {
    include: {
      opponent: {
        include: {
          region: true,
        },
      },
    },
  },
};
