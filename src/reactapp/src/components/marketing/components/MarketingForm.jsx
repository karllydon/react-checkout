/* eslint-disable no-console */
import { React, useEffect } from 'react';
import Checkbox from '../../common/Form/Checkbox';
import useMarketingFormikContext from '../hooks/useMarketingFormikContext';

function MarketingForm() {
  const { fields, marketing } = useMarketingFormikContext();

  useEffect(() => {
    console.log('FIELDS');
    console.log(JSON.stringify(fields));
    console.log('MARKETING');
    console.log(JSON.stringify(marketing));
  });

  return (
    <div id="marketing-info">
      <br />
      <p>
        We would like to keep in touch with you about other similar products
        from Vax that you may be interested in. We would like to send you emails
        and direct mail unless you would like me to opt you out. (tick the boxes
        below on the customer response). If you change your mind at a later date
        you can let us know by contacting us. If you want to know more about how
        we will use your personal data our Privacy policy is available to read
        on our website.
      </p>
      <Checkbox
        name="marketingInfo.optIn"
        isChecked={false}
        label={"Customer doesn't want to receive email updates"}
      />
      <Checkbox
        name="marketingInfoPost.optIn"
        isChecked={false}
        label={"Customer doesn't want to receive updates by post"}
      />
    </div>
  );
}

export default MarketingForm;
