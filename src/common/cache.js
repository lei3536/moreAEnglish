/**
 * 管理本地存储
 */
import Cache from 'web-storage-cache'

const lsCache = new Cache() // localStorage
const ssCache = new Cache({storage: 'sessionStorage'}) // sessionStorage

// 这里改为自己的nameSpace，比如项目名称，避免同域名下的不同项目冲突
const nameSpace = 'projectName'

const generateKey = (key)=> {
    return `${nameSpace}:${key}`.toUpperCase()
}

class CommonStorage {
    /**
     * 
     * @param {*} key 
     * @param {*} value
     * @param {*} exp 有效期，单位s，0为不限
     * @param {*} type 
     */
    save (key, value, exp = 0, type = 'localStorage') {
        let storage = (type === 'localStorage') ? lsCache : ssCache
        const options = exp ? { exp: exp } : null
        storage.set(generateKey(key), value, options)
    }

    load (key, defaultValue = null, type = 'localStorage') {
        let storage = (type === 'localStorage') ? lsCache : ssCache
        return storage.get(generateKey(key)) || defaultValue
    }

    delete (key, type = 'localStorage') {
        let storage = (type === 'localStorage') ? lsCache : ssCache
        storage.delete(generateKey(key))
    }
}

export default {
    install: function install(Vue) {
        const cache = new CommonStorage()
        Vue.prototype.$cache = window.cache = cache
    }
}