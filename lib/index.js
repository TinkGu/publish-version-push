const changelogParser = require('changelog-parser');
const TimeChecker = require('./check-time');

function getPkg(path) {
  return require(path);
}

/** get publish info from changelog and package json */
async function getVersionInfo({ packagePath, changelogPath }) {
  const pkg = getPkg(packagePath);
  const version = (pkg && pkg.version) || '';
  let changelog = null;
  let versionChangelog = null;
  try {
    changelog = await changelogParser(changelogPath);
  } catch (err) {
    console.error(err);
  }

  if (version && changelog && Array.isArray(changelog.versions)) {
    const versionContent = changelog.versions.find((x) => x.version === version);
    if (versionContent) {
      versionChangelog = versionContent;
    }
  }

  return {
    pkg,
    changelog,
    versionChangelog,
    version,
  };
}

async function getPublishInfo({
  changelogPath,
  packagePath,
  omitWeekday = [6, 0],
  checkTime = (x) => x.after('9:30') && x.before('21:00'),
}) {
  const isValidTime = TimeChecker.checkTime({ omitWeekday, checkTime });
  if (!isValidTime) {
    return;
  }

  return getVersionInfo({
    changelogPath,
    packagePath,
  });
}

module.exports = {
  getVersionInfo,
  getPublishInfo,
  TimeChecker,
};
