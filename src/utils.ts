import ProxyConfig = chrome.proxy.ProxyConfig;

export function checkNotificationPermission(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    chrome.permissions.contains({
      permissions: ['notifications'],
    }, resolve)
  });
}

export function requestNotificationPermission(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
        chrome.permissions.request({permissions: ['notifications']}, resolve)
  });
}

export const parseProxyConfigString = (configString?: string): ProxyConfig | null => {
  if (!configString) {
    return null;
  }
  const regex = /^(http[|s]?|socks[45]):\/\/([\w.-]+)(?::(\d+))?$/;
  const matches = configString.match(regex);

  if (matches && matches.length >= 4) {
    console.log(matches);
    const scheme = matches[1];
    const host = matches[2];
    const port = parseInt(matches[3], 10);

    if (isNaN(port)) {
      return null;
    }

    return { mode: 'fixed_servers', rules: { singleProxy: { scheme, host, port } } };
  }

  return null;
};