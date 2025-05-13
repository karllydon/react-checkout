import { React } from 'react';
import { func } from 'prop-types';
import Checkbox from '../../common/Form/Checkbox';
import SaveButton from './SaveButton';

import useMarketingFormikContext from '../hooks/useMarketingFormikContext';

function MarketingForm({ marketingSubmit }) {
  const { marketing, setFieldValue } = useMarketingFormikContext();

  const toggle = (event) => {
    const newOptIn = !marketing[event.target.id];
    setFieldValue(`marketing.${event.target.id}`, newOptIn);
  };

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
      {marketing && (
        <>
          <Checkbox
            name="email"
            isChecked={marketing.email}
            label={"Customer doesn't want to receive email updates"}
            onChange={toggle}
          />
          <Checkbox
            name="post"
            isChecked={marketing.post}
            label={"Customer doesn't want to receive updates by post"}
            onChange={toggle}
          />{' '}
        </>
      )}
      <br />
      <SaveButton marketingSubmit={marketingSubmit} />
    </div>
  );
}

MarketingForm.propTypes = {
  marketingSubmit: func.isRequired,
};

export default MarketingForm;
