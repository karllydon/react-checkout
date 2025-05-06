import { useContext } from 'react';

import { StageContext } from '../context/Stage';

export default function useStageContext() {
  return useContext(StageContext);
}
