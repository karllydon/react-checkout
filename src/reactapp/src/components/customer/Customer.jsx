/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Card from '../common/Card';
import CloseButton from './CloseButton';
import useAppContext from '../../hook/useAppContext';

function Customer() {
  const { fetchCaseDetails } = useAppContext();
  const [caseDetails, setCaseDetails] = useState(null);

  useEffect(() => {
    if (!caseDetails) {
      (async () => {
        const caseId = Cookies.get('params_call');
        setCaseDetails(await fetchCaseDetails(caseId));
      })();
    }
  }, [caseDetails, fetchCaseDetails]);

  return (
    <Card>
      <div className="py-4 mt-4 flex" style={{ display: 'block' }}>
        <div className="flex-col">
          <div>
            {caseDetails && (
              <>
                <span className="font-bold">Customer: </span> {caseDetails.name}
              </>
            )}
          </div>
          <div>
            {caseDetails && (
              <>
                <span className="font-bold">Email:</span> {caseDetails.email}
              </>
            )}
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
