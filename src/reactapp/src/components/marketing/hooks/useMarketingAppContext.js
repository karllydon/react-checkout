import { useContext } from 'react';

import AppContext from '../../../context/App/AppContext';

export default function useMarketingAppContext() {
  const [appData, appActions] = useContext(AppContext);
  const { marketingOptIn } = appData;
  const { changeMarketingOptIn } = appActions;

  return { marketingOptIn, changeMarketingOptIn };
}
