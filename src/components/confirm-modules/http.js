import axios from 'axios'
import qs from 'qs'

const search = (() => {
  let search = location.search
  let searchObj = {}
  let key = ''
  if (search) {
    let paramArr = search.split('&')
    for (let i = 0; i < paramArr.length; i++) {
      key = paramArr[i].split('=')[0]
      key = key.replace(/\?/g, '')
      searchObj[key] = paramArr[i].split('=')[1]
    }
    return searchObj
  } else return ''
})()

const toast = window.JSBridge ? window.JSBridge.toast : console.log

const instance = axios.create({
  baseURL: /s/.test(location.protocol) ? '' : 'http://app.e.uban360.net',
  timeout: 20000,
  withCredentials: true,
  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

instance.interceptors.response.use(
  response => {
    const data = response.data
    if (data.success) {
      return data.data || data.value
    }

    toast(data.error ? data.error.name : data.msg)
    return Promise.reject(data)
  },
  error => {
    toast(error.msg || '服务异常，请稍后再试')
    return Promise.reject(error)
  }
)

export const get = (uri, data = {}) => {
  if (search.token) {
    /* eslint-disable-next-line */
    data.token = search.token
  }
  return instance.get(`${uri}`, {
    params: data
  })
}

export const post = (uri, data = {}) => (
  instance.post(uri, qs.stringify(data, { arrayFormat: 'brackets' }))
)
