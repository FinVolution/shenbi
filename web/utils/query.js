import { stringify } from "qs";

export const addQueryToUrl = (url, queryObject) => {
  if (!url) return;

  const isEmpty = Object.keys(queryObject).length === 0;
  if (isEmpty) return url;

  const queryString = stringify(queryObject);
  const sign = url.split("?")[1] ? "&" : "?";
  return `${url}${sign}${queryString}`;
};
export const getQueryParam = key => {
  const objUrlParams = new URLSearchParams(window.location.search)
  if (objUrlParams.has(key)) {
      return objUrlParams.get(key)
  } else {
      return 'null'
  }
}
export const getQueryString = function (name) {
  const after = decodeURIComponent(
      window.location.hash.split('?')[1] || window.location.search.split('?')[1]
  )
  if (after) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
      const r = after.match(reg)
      if (r != null) {
          return decodeURIComponent(r[2])
      } else {
          return null
      }
  }
}