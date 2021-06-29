import requestUtils from 'utils/request';

async function customFetch(path, headerOptions) {
  const res = await requestUtils(path, headerOptions);
  if (!res.status) {
    const error = {
      code: 404,
      message: 'Fail to fetch',
    };
    throw error;
  }

  if (res.status < 300) {
    try {
      const response = res.data;
      return response;
    } catch (err) {
      //
    }
  }
  try {
    const response = await res.data;
    const error = {
      code: res.code,
      ...response,
    };
    throw error;
  } catch (e) {
    if (res.status === 426) {
      const error = {
        code: res.status,
        message:
          'We have had some significant upgrades for the app. Please click below to upgrade your app!',
      };
      throw error;
    } else {
      const error = {
        code: res.status,
        message:
          e.error || e.message
            ? e.message || e.error
            : 'Something wrong. Please try again.',
      };
      throw error;
    }
  }
}

export const timeoutPromise = (ms, promise) =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request time out! Please try again.'));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });

export default customFetch;

function requestWrapper(method) {
  // if (process.browser) {
  //   setInitHeader();
  // }
  const request = async (
    url,
    data = null,
    params = {},
    // prefixHost = '/client',
    prefixHost = '',
  ) => {
    let convertUrl = `${prefixHost}${url}`;
    let convertParams = params;
    let convertData = data;

    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      convertParams = convertData;
      if (convertParams !== null) {
        convertUrl = `${convertUrl}?${getQueryString(convertParams)}`;
      }
      convertData = null;
    } else if (convertData === Object(convertData)) {
      convertData = JSON.stringify(convertData);
    }

    // default params for fetch = method + (Content-Type)
    const defaults = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        // ...(businessId && { businessId }),
      },
    };
    // check that req url is relative and request was sent to our domain

    if (method === 'POST' || method === 'PUT') {
      defaults.headers.Accept = 'application/json';
      defaults.headers['Content-Type'] = 'application/json';
    }

    if (convertData) {
      defaults.data = convertData;
    }

    const paramsObj = {
      ...defaults,
      headers: { ...params, ...defaults.headers },
    };
    return customFetch(convertUrl, paramsObj);
  };
  return request;
}

export function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .filter((k) => params[k] || params[k] === 0)
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join('&');
}

export const get = requestWrapper('GET');
export const post = requestWrapper('POST');
export const put = requestWrapper('PUT');
export const patch = requestWrapper('PATCH');
export const del = requestWrapper('DELETE');
