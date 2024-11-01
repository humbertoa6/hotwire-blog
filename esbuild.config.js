#!/usr/bin/env node

const esbuild = require('esbuild')
const path = require('path')
const chokidar = require('chokidar')
const http = require('http')

// Add more entrypoints, if needed
const entryPoints = [
  "application.js",
]
const watchDirectories = [
  "./app/javascript/**/*.js",
  "./app/views/**/*.html.erb",
  "./app/assets/stylesheets/*.css",
  "./app/assets/stylesheets/*.scss"
]

const config = {
  absWorkingDir: path.join(process.cwd(), "app/javascript"),
  bundle: true,
  entryPoints: entryPoints,
  outdir: path.join(process.cwd(), "app/assets/builds"),
  sourcemap: true,
  banner: {
    js: ' (() => new EventSource("http://localhost:8082").onmessage = () => location.reload())();',
  },
}

async function start() {
  const clients = []
  const server = http.createServer((req, res) => {
    clients.push(res)
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
    })
  }).listen(8082)

  const ctx = await esbuild.context(config)

  chokidar.watch(watchDirectories).on('all', (event, path) => {
    if (path.includes("javascript")) {
      ctx.rebuild().then(() => {
        clients.forEach((res) => res.write('data: update\n\n'))
        clients.length = 0
      })
    }
  })
}

if (process.argv.includes("--rebuild")) {
  start()
} else {
  esbuild.build({
    ...config,
    minify: process.env.RAILS_ENV === "production",
  }).catch(() => process.exit(1))
}
