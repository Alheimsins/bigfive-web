import getConfig from 'next/config'
const { publicRuntimeConfig: { URL } } = getConfig()

export default id => /^((http|https):\/\/)/.test(id) ? id.replace(URL + '/result/', '').replace(' ', '').toLowerCase() : id ? id.replace(' ', '') : id
