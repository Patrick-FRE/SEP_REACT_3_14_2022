import React from 'react';

export const useForceUpdate = () => {
  const [_, update] = React.useState(false);
  return () => update((pre) => !pre);
};
