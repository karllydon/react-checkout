import { useMemo } from 'react';
import { prepareSalutationOptions } from '../utility';
import salutationList from '../../billingAddress/utility/salutationList';

export default function useSalutationState() {
  const salutations = salutationList;

  const salutationOptions = useMemo(
    () => prepareSalutationOptions(salutations),
    [salutations]
  );

  return {
    salutationOptions,
  };
}
