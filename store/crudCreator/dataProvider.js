import { keyBy, omit } from 'lodash';
import { getValidData } from 'utils/tools';

export const PRIMARY_KEY = '_id';

export const convertRequestParams = (
  type,
  params,
  // resource
  options = { primaryKey: PRIMARY_KEY },
) => {
  const { q, ...rest } = params.filter || { q: undefined };
  const formatedParams = {
    // ...params,
    ...omit(params, ['offset', 'limit']),
    filter: rest,
    // pageSize: params.limit,
    page: params.offset / params.limit + 1,
    perPage: params.limit,
    q,
    count: undefined,
  };

  const filter = getValidData(formatedParams.filter, true);
  switch (type) {
    case 'GET_ALL':
      return {
        ...formatedParams,
        filter:
          Object.keys(filter).length > 0 ? JSON.stringify(filter) : undefined,
      };
    case 'GET_BY_ID':
      return {
        ...params,
        [PRIMARY_KEY]: Number(params[options.primaryKey]),
      };
    case 'EDIT':
      delete formatedParams.id;
      delete formatedParams.filter;
      delete formatedParams.q;
      delete formatedParams.count;

      return getValidData(formatedParams);
    case 'CREATE':
      return getValidData(formatedParams);
    case 'DELETE':
    default:
      return {};
  }
};

export const convertResponseData = (
  type,
  response,
  options = { primaryKey: PRIMARY_KEY },
) => {
  switch (type) {
    case 'GET_ALL':
      return {
        data: keyBy(
          response?.data.map((data) => ({
            ...data,
            id: data[options.primaryKey || PRIMARY_KEY],
            backupId: data[PRIMARY_KEY],
          })),
          options.primaryKey || PRIMARY_KEY,
        ),
        ids: response?.data.map(
          (data) => data[options.primaryKey || PRIMARY_KEY],
        ),
        total: response?.total,
        numberOfPages: (response?.total / response?.perPage) + 1,
      };
    case 'GET_BY_ID':
    case 'CREATE':
      return response
        ? {
            ...response,
            id: response[options.primaryKey || PRIMARY_KEY],
            backupId: response[PRIMARY_KEY],
          }
        : null;
    case 'EDIT':
      return response && response
        ? {
            ...response,
            id: response[options.primaryKey || PRIMARY_KEY],
            backupId: response[PRIMARY_KEY],
          }
        : null;
    case 'DELETE':
    default:
      return response;
  }
};
