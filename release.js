(async function release() {
  const { execSync } = require('child_process');
  const prompt = require('prompt');
  const fs = require('fs');

  require('dotenv')
    .config();

  const token = process.env.GH_TOKEN;

  prompt.start();

  const json = require('./package.json');

  const currentVersion = json.version;

  const { version } = await prompt.get({
    properties: {
      version: {
        description: `Enter the version to publish (current ${currentVersion}`,
        before(value) {
          return `v${value}`;
        },
      },
    },
  });

  json.version = version;

  fs.writeFileSync('./package.json', JSON.stringify(json, null, 2));

  execSync('git add .');
  console.log('Files staged.');

  const message = `feat: release ${version}`;

  execSync(`git commit -m ${message}`);
  console.log(`Commit with message: ${message}`);

  execSync(`cross-env GH_TOKEN=${token} electron-builder -- -p always`, { stdio: 'inherit' });
}());
