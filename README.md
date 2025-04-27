# Simple Proxy

A Chrome extension that provides an easy way to manage and switch between proxy configurations in Chrome/Chromium browsers using Manifest V3.

![Simple Proxy Extension](docs/screenshot.png)

## Features

- Quick toggle between proxy modes (Fixed Server, Direct, System)
- Save and manage proxy configuration presets
- Easy-to-use interface for configuring proxy settings
- Support for HTTP, HTTPS, SOCKS4, and SOCKS5 proxies
- Side panel integration for quick access
- Lightweight and fast

## Installation

### From Chrome Web Store

1. Visit the [Simple Proxy on Chrome Web Store](https://chromewebstore.google.com/detail/simple-proxy/ikniooeibndpefdadbipfjfmofeeeelk)
2. Click "Add to Chrome"

## Usage

### Basic Usage

1. Click the Simple Proxy icon in your browser toolbar to open the popup
2. Select a proxy mode:
   - **Fixed Server**: Use a specific proxy server
   - **Direct**: Connect directly without a proxy
   - **System**: Use system proxy settings
3. If you select "Fixed Server", fill in the server details:
   - Schema (HTTP, HTTPS, SOCKS4, SOCKS5)
   - Host (e.g., proxy.example.com)
   - Port (e.g., 8080)
4. Click "Save" to apply the settings

### Managing Presets

1. Configure a proxy in "Fixed Server" mode
2. Enter a name for your preset
3. Click "Save" to store the preset
4. Use the "Preset" dropdown to quickly switch between saved configurations

## Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/simple-proxy.git
   cd simple-proxy
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Build the extension:
   ```
   npm run build
   ```
   or
   ```
   yarn build
   ```

4. Load the extension:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build` directory

### Project Structure

- `public/`: Static assets and manifest.json
- `src/`: Source code
  - `background.ts`: Background service worker
  - `components/`: React components
  - `pages/`: Page components (popup, options, sidepanel)
  - `hooks/`: Custom React hooks
  - `types/`: TypeScript type definitions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Privacy

This extension does not collect or transmit any user data. All proxy configurations are stored locally in your browser.
# Simple-Proxy
