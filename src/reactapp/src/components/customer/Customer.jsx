import React from 'react';
import Card from '../common/Card';
import CloseButton from './CloseButton';

function Customer() {
  return (
    <Card>
      <div className="py-4 mt-4 flex" style={{ display: 'block' }}>
        <div className="flex-col">
          <div>
            <span className="font-bold">Customer: </span> Name Placeholder
          </div>
          <div>
            <span className="font-bold">Email: </span> Email Placeholder
          </div>
        </div>
        <div className="ml-auto">
          <CloseButton />
        </div>
      </div>
    </Card>
  );
}

export default Customer;
