function sharedPlugin() {
  let isConfigResolved = false

  return {
    name: 'shared-plugin',
    sharedDuringBuild: true,
    configResolved() {
      isConfigResolved = true
    },
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { name: 'config-resolved', content: `${isConfigResolved}` },
        },
      ]
    },
  }
}

// The config file is loaded once per environment, so each load creates a new
// plugin instance.
export default {
  plugins: [sharedPlugin()],
}
