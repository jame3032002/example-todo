import getConfig from 'next/config'
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()
const { BACKEND_SERVICE } = serverRuntimeConfig
const { BACKEND_URL: backendURL } = publicRuntimeConfig

const BACKEND_URL = process.browser ? backendURL : BACKEND_SERVICE

export {
  BACKEND_URL
}
