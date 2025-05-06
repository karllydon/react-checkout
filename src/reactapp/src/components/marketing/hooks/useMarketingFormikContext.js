import { useContext } from 'react';
import MarketingFormikContext from '../context/MarketingFormikContext';

export default function useMarketingFormikContext() {
  return useContext(MarketingFormikContext);
}
