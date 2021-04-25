const isIOS = /iPhone/.test(navigator.userAgent)
const online = /\.com/.test(location.origin)
const base = online 
  ? (
      window._ESC_APP_CONFIG
        ? window._ESC_APP_CONFIG.apiHost.replace('api', 'admin')
        : 'https://admin.jituancaiyun.com'
    ) 
  : 'http://admin.jituancaiyun.net'

const defaultOptions = {
  moduleId: 0,
  eventId: 0,
  orgId: undefined,
  userId: undefined,
  platform: isIOS ? 'iOS' : 'android',
  apiExt: 'logExt'
}

export default {
  options: {},
  init(moduleId) {
    if (typeof moduleId === 'number') {
      this.options = {
        ...defaultOptions,
        moduleId
      }
    } else if (typeof moduleId === 'object') {
      this.options = {...defaultOptions, ...moduleId}
    } else {
      throw new Error('moduleId is must')
    }
    return this.hit.bind(this)
  },
  hit(eventId, moduleId = this.options.moduleId) {
    const { orgId, userId, platform, apiExt } = this.options
    let url = `${base}/dot-log/${apiExt}.json?` +
      `platform=${platform}&mid=${moduleId}&eid=${eventId}`
    if (userId) {
      url += `&uid=${userId}`
    } else if (apiExt === 'logExt') {
      // uid必传
      url += '&uid=1'
    }

    if (orgId) {
      url += `&orgId=${orgId}`
    }

    let img = new Image()
    img.src = url
    img.onload = img.onerror = () => {
      img = null
    }
  }
}
