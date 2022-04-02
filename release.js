(async function(){
    const { execSync } = require('child_process')
    const prompt = require('prompt')

    require('dotenv').config()

    const token = process.env.GH_TOKEN

    prompt.start()

    const json = require('./package.json')

    const currentVersion = json.version

    const { version } = await prompt.get({
        properties: {
            version: {
                description: `Enter the version to publish (current ${currentVersion}`,
                before: function(value) { return 'v' + value; }
            }
        }
    })

    json.version = version

    fs.writeFileSync('./package.json', JSON.stringify(json))

    execSync('git add .')
    console.log('Files staged.')

    execSync(`git commit -m "feat: release ${version}"`)
    console.log('Files committed.')

    execSync(`cross-env GH_TOKEN=${token} electron-builder -- -p always`, {stdio: 'inherit'})
}())
