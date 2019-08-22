const online = /s/.test(location.protocol)
const domain = `http${online ? 's' : ''}://app.e.uban360.${online ? 'com' : 'net'}`
let escUrl = `${domain}/esc/app-entry-dist/index.html` +
  '?token={{token}}&bizType={{bizType}}&appId={{appId}}'

export default {
  online,
  domain,
  bizType: 0,
  token: '',

  init(bizType, token) {
    if (typeof bizType === 'string') {
      Object.keys(this.app).forEach(key => {
        if (this.app[key].projectName === bizType) {
          bizType = Number(key)
        }
      })
    }
    if (typeof bizType !== 'number') {
      throw new Error('bizType must be a number or projectName')
    }

    this.bizType = bizType
    escUrl = escUrl.replace('{{bizType}}', bizType)

    if (token) {
      this.token = token
      escUrl = escUrl.replace('{{token}}', token)
    } else {
      escUrl = escUrl.replace('token={{token}}&', '')
    }

    escUrl = escUrl.replace('{{appId}}', this.app[bizType].appId[online ? 1 : 0])
  },

  quotaUrl(cbName, selected) {
    return `${escUrl}#/select-quota?callback=${cbName}&selected=${selected}`
  },

  userUrl(cbName, color = '2277EE', travelType = 0, selected = '', num = '', scenes) {
    return `${escUrl}#/occupant-choose?callback=${cbName}` +
      `&color=${color}&travelType=${travelType}&selected=${selected}&num=${num}&scene=${scenes}`
  },

  userEditUrl(cbName, color = '2277EE', travelType = 0, externalId, scenes = 1) {
    return `${escUrl}#/occupant-add?color=${color}&` +
    `&travelType=${travelType}&` +
    `externalId=${externalId}&callback=${cbName}&scenes=${scenes}`
  },

  cityUrl(cbName, cityName, bizType = this.bizType) {
    return `${escUrl}#/city-choose?locateCityName=${encodeURIComponent(cityName)}&callback=${cbName}&bizType=${bizType}`
  },

  orderListUrl(type = 1) {
    return `${escUrl}#/order-list-travel?type=${type}`
  },

  travelStandardUrl(showType = 3) {
    return `${escUrl.replace('/app-entry-dist/index.html?', `/app-entry/static-pages/travelStandard.html?showType=${showType}&`)}`
  },

  purchaseUrl(type = 0) {
    const app = ['jd', 'woyemai', 'malls']
    return `${escUrl.replace('/esc/app-entry-dist', `/${app[type]}`)}`
  },

  redirect(url, navibar) {
    const prefix = `${domain}/gateway/common/toRedirect?url=`
    // 将链接参数encode
    url = encodeParams(url)
    // 再encode整个url，作为参数传给redirect
    url = encodeURIComponent(url)

    // 得到完整地址
    let res = prefix + url
    if (navibar) {
      res += '&navibar=h5&a=1'
    }

    function encodeParams(url) {
      const arr = url.split('?')
      return `${arr[0]}${arr[1] ? `?${encodeURIComponent(arr[1])}` : ''}${arr[2] ? `%3F${encodeURIComponent(arr[2])}` : ''}`
    }
    return res
  },

  app: {
    3: {
      name: '滴滴出行',
      // dev, online
      appId: [6563143, 33537318],
      projectName: 'dd'
    },
    18: {
      name: '同程商旅',
      appId: [94250101, 31326169],
      projectName: 'tc'
    },
    22: {
      name: '京东商城',
      appId: [47233229, 66611037],
      projectName: 'jd'
    },
    129: {
      name: '中粮我买',
      appId: [32285687, 93586565],
      projectName: 'zl'
    },
    130: {
      name: '华住酒店',
      appId: [90105639, 51755657],
      projectName: 'hz'
    },
    132: {
      name: '美团点评',
      appId: [40644953, 70454425],
      projectName: 'mt'
    },
    139: {
      name: '优办商城',
      appId: [14814845, 36269069],
      projectName: 'yb'
    },
    144: {
      name: '火车票预定',
      appId: [20988501, 55838831],
      projectName: 'hcp'
    },
    145: {
      name: '机票预定',
      appId: [81972047, 21441835],
      projectName: 'jp'
    },
    146: {
      name: '携程酒店',
      appId: [36954139, 85927671],
      projectName: 'xc'
    },
    156: {
      name: '福利商城',
      appId: [32694445, 71553559],
      projectName: 'fl'
    }
  }
}
