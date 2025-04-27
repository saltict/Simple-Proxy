import {ProxyConfigFormInterface} from "./types";
import {clearProxy, fetchProxy, setProxy} from "./background/proxy";
// import {checkNotificationPermission} from "./utils";

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (message) => {
    switch (message.type) {
      case 'fetch-proxy': {
        const result = await fetchProxy();

        port.postMessage({type: 'current-proxy-config', value: result});

        break;
      }

      case 'set-proxy': {
        const proxyConfig = message.value as ProxyConfigFormInterface;
        if (proxyConfig.mode === 'fixed_servers') {
          await setProxy({
            mode: 'fixed_servers', rules: {
              singleProxy: {
                scheme: proxyConfig.schema,
                host: proxyConfig.host,
                port: parseInt(proxyConfig.port)
              }
            }
          });
        } else if (proxyConfig.mode === 'direct') {
          await setProxy({mode: 'direct'});
        } else {
          await clearProxy();
        }

        // timeout 300ms
        await new Promise((resolve) => {
          setTimeout(resolve, 300);
        });

        const result = await fetchProxy();

        port.postMessage({type: 'current-proxy-config', value: result});

        break;
      }
    }
  });
});

// chrome.runtime.onStartup.addListener(async () => {
//   const proxyConfig = await fetchProxy();
//   if (chrome.notifications && proxyConfig?.value?.mode === 'fixed_servers') {
//     try {
//       const proxyRule = proxyConfig.value.rules.singleProxy;
//       chrome.notifications.create({
//         type: 'basic',
//         iconUrl: './images/favicon-128x128.png',
//         title: 'Simple Proxy',
//         message: `You're using proxy: ${proxyRule.scheme}://${proxyRule.host}:${proxyRule.port}`,
//       })
//     } catch (e) {
//       console.error(e);
//     }
//   }
// });
