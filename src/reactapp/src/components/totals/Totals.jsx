import React from 'react';

import Card from '../common/Card';
import ToggleBox from '../common/ToggleBox';
import { __ } from '../../i18n';
import useTotalsCartContext from './hooks/useTotalsCartContext';

function Totals() {
  const {
    discounts,
    grandTotal,
    hasSubTotal,
    subTotalIncl,
    hasDiscounts,
    hasShippingRate,
    shippingMethodRate,
  } = useTotalsCartContext();

  return (
    <Card>
      <ToggleBox show title={__('Summary')}>
        <div className="py-4 mt-4 ">
          <div className="pb-2 flex-column justify-between">
            {hasSubTotal && (
              <div className="flex justify-between border-b border-t py-4">
                <div>{__('Cart Subtotal')}</div>
                <div className="font-bold">{subTotalIncl}</div>
              </div>
            )}
            {hasShippingRate && (
              <div className="flex justify-between border-b py-4">
                <div>{__('Delivery')}</div>
                <div className="font-bold">{shippingMethodRate}</div>
              </div>
            )}
            {hasDiscounts &&
              discounts.map((discount) => (
                <div
                  key={discount.label}
                  className="flex justify-between border-b py-4"
                >
                  <div>{__(discount.label)}</div>
                  <div>{discount.price}</div>
                </div>
              ))}
            <div className="flex justify-between border-b py-4">
              <div>{__('ORDER TOTAL')}</div>
              <div className="font-bold">{grandTotal || '0'}</div>
            </div>
          </div>
        </div>
      </ToggleBox>
    </Card>
  );
}

export default Totals;
