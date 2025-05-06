import React from 'react';
import { bool, shape, string, number } from 'prop-types';
import { __ } from '../../../i18n';

function CartItem({ item, isLastItem }) {
  return (
    <tr className={`border-2 md:border-0 ${isLastItem ? '' : 'md:border-b-2'}`}>
      {/** DESKTOP TD ELEMENTS */}
      <td className="hidden md:table-cell border-t border-b py-4">
        <div className="py-2 pl-2">
          <img
            className="w-12 h-auto"
            alt={item.productSku}
            src={item.productSmallImgUrl}
          />
          <div className="text-xs">
            <div>{item.productName}</div>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell ml-auto">
        <span className="text-xs">Qty: {item.quantity}</span>
      </td>

      {/** MOBILE TD ELEMENTS */}
      <td className="px-2 py-2 md:hidden">
        <table className="w-full">
          <tbody>
            <tr className="">
              <td>
                <table className="text-xs">
                  <tbody>
                    <tr className="border-b">
                      <th className="px-2 py-2">{__('Name')}</th>
                      <td className="pl-1 text-sm">
                        <div className="flex items-center py-1">
                          <img
                            className="w-8 h-8"
                            alt={item.productSku}
                            src={item.productSmallImgUrl}
                          />
                          <div className="pl-2 space-y-2">
                            <div>{item.productName}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="px-2 py-2">{__('Qty')}</th>
                      <td className="px-1 pb-2">
                        <div className="flex">
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  item: shape({
    id: string,
  }).isRequired,
  quantity: number.isRequired,
  isLastItem: bool,
};

CartItem.defaultProps = {
  isLastItem: false,
};

export default CartItem;
