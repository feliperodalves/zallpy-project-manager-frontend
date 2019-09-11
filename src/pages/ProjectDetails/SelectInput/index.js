import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '~/components/DefaultStyle';

export default function SelectInput({ name, data }) {
  const options = data.map(d => ({
    id: d.id,
    title: d.email ? `${d.name} - ${d.email}` : d.name,
  }));

  return <Select name={name} options={options} />;
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
