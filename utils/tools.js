// import DeviceInfo from 'react-native-device-info';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';

export const formatMoney = (num, digits = 3) => {
  if (!num) return '0';
  if (Number.isNaN(num)) return '0';
  const re = `\\B(?=(\\d{${digits}})+(?!\\d))`;
  return String(num).replace(new RegExp(re, 'g'), ',');
};

const getValidDataOfObj = (obj, isFilter) => {
  const validData = reduce(
    obj,
    (result, value, key) => {
      if (Array.isArray(value)) {
        return value.length > 0 ? { ...result, [key]: value } : result;
      }
      if (typeof value === 'object' && !isEmpty(value)) {
        const formatChildValue = getValidDataOfObj(value);
        return !isEmpty(formatChildValue)
          ? { ...result, [key]: formatChildValue }
          : result;
      }

      if (value || value === false || value === 0) {
        // eslint-disable-next-line
        result[key] = value;
        return { ...result, [key]: value };
      }

      if (value === '' && !isFilter) {
        // eslint-disable-next-line
        result[key] = ' ';
      }
      return result;
    },
    {},
  );
  return validData;
};

export const convertObjToSearchStr = (params) =>
  Object.keys(params)
    .map((key) =>
      (params[key] !== undefined && params[key] !== null)
        ? `${encodeURIComponent(key)}=${params[key]}`
        : '',
    )
    .filter((data) => data !== '')
    .join('&');

export const getValidData = (filter, isFilter) =>
  getValidDataOfObj(filter, isFilter) || {};

export const getCurrentTab = (str, key) => {
  const paths = str && str.split('/');
  return paths && paths[key];
};