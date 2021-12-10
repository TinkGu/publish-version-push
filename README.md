# get-publish-version-info

> get version info after published new version

# Install

```bash
yarn add -D get-publish-version-info
```

# Usage

```javascript
const { getPublishInfo } = require('get-publish-version-info');

async function postPublish() {
  const info = await getPublishInfo({
    changelogPath: 'your CHANGELOG.md file path here',
    packagePath: 'your package.json file path here',
  });

  if (info) {
    // do something
  }
}
```

# API

TODO:
