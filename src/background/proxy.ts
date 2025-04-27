import {BrowserProxyConfig} from "../types";
import ProxyConfig = chrome.proxy.ProxyConfig;


export async function fetchProxy(): Promise<BrowserProxyConfig> {
  return new Promise((resolve) => {
    chrome.proxy.settings.get({}, (rs: BrowserProxyConfig) => {
      return resolve(rs);
    });
  })
}

export async function setProxy(config: ProxyConfig) {
  await chrome.proxy.settings.set({
    scope: 'regular',
    value: config
  })
}

export async function clearProxy() {
  await chrome.proxy.settings.clear({scope: 'regular'})
}