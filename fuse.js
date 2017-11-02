const { FuseBox, WebIndexPlugin, EnvPlugin } = require('fuse-box')

const isProduction = false

const fuse = FuseBox.init({
    homeDir: 'src',
    output: 'dist/$name$hash.js',
    sourceMaps: { vendor: false, inline : false },
    hash: isProduction,
    package: 'playground',
    plugins: [
        EnvPlugin({ NODE_ENV: isProduction ? "production" : "development" }),
        WebIndexPlugin({
            template: 'template.html',
            target: 'public/index.html',
            bundles: 'public/client',
            resolve: output => `/${output.lastPrimaryOutput.filename}`
        })
    ]
})

if (!isProduction) {
    fuse.dev({ hmr: true, httpServer: false })
}

const client = fuse.bundle('public/client')
    .instructions('> client/index.tsx')
    .sourceMaps({sourceRoot:'../../'})
    .target('browser')

if (!isProduction) {
    client.watch()
        .hmr()
}

const server = fuse.bundle('server')
    .instructions('> [server/index.ts]')
    .sourceMaps({sourceRoot:'../'})
    .target('server@es2017')

if (!isProduction) {
    server.watch()
        .completed(proc => proc.require())
}

fuse.run()