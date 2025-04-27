import ProxyConfig = chrome.proxy.ProxyConfig;

export interface BrowserProxyConfig extends chrome.types.ChromeSettingGetResult<any> {
  value: ProxyConfig;
}

export interface ProxyConfigFormInterface {
  mode: string;
  preset: string;
  presetName: string;
  schema: string;
  host: string;
  port: string;
}

export interface OptionConfigInterface {
  theme: 'dark' | 'light';
  notification: boolean;
}
