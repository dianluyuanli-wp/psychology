const domain = 'http://tangshisanbaishou.xyz/api/';

class Axios {
    instance: Axios | null;
    config: object;
    static instance: Axios | null;
    constructor() {
     this.instance = null // 类的实例
     this.config = {};
    }
    
    create(instanceConfig: object) {
     const { config } = this
     // 创建实例的时候添加基本配置
     this.config = {
      ...config,
      ...instanceConfig
     }
     return this
    }
    
    // 单例
    static getInstance() {
     if (!this.instance) {
       this.instance = new Axios()
     }
     return this.instance
    }

     request = (options: dispatchReqObj) => {
        const { config } = this;
        // 实例请求的时候添加基本配置
        const requsetOptions = {
         ...config,
         ...options
        }
        return dispatchRequest(requsetOptions);
    }
}

const axios = Axios.getInstance();

interface dispatchReqObj {
    base?: object,
    url: string,
    [propName: string]: any;
}
const dispatchRequest = function(config: dispatchReqObj) {
    return new Promise<WechatMiniprogram.RequestSuccessCallbackResult>((resolve, reject) => {
     wx.request({
      ...config,
      url: config.base + config.url,
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult) => {
       resolve(res)
      },
      fail: res => {
       reject(res)
      }
     })
    })
}

const instance = (config = {}) => {
    return axios.create({
        base: domain,
        ...config
    })
}

interface reqOptionObj {
    baseConfig?: Object,
    url: string,
    method: string,
    data?: Object,
    isLogin?: boolean,
    success?: Function,
    error?: Function
}

export async function reqGet(url: string, data?: Object, options?: Object) {
    const res = await request({ url, data, ...options, method: 'GET'});
    return res;
}

export async function reqPost(url: string, data?: Object, options?: Object) {
    const res = await request({ url, data, ...options, method: 'POST'});
    return res;
}

export async function request(options: reqOptionObj) {
    const { baseConfig, url, method, data } = options
    let result: WechatMiniprogram.RequestSuccessCallbackResult;
    try {
        result = await instance(baseConfig)
            .request({
                url,
                method: method || 'GET',
                data
            })
        options.success && options.success(result);
        return result.data;
    } catch(err) {
        if (options.error) {
            options.error(err)
        } else {
            //errAlert()
        }
        return err;
    }
    
}