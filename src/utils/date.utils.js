/* eslint-disable import/prefer-default-export */
import moment from 'moment';

export function formatDate(value) {
  const date = moment(new Date(+value));

  if (!date.isValid()) {
    return value;
  }

  return date.format('MMM DD, YYYY');
}
