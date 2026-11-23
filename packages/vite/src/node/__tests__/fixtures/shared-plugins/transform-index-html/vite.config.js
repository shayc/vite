function sharedPlugin(order) {
  let isConfigResolved = false

  return {
    name: `shared-plugin-${order}`,
    sharedDuringBuild: true,
    configResolved() {
      isConfigResolved = true
    },
    transformIndexHtml: {
      order,
      handler() {
        return [
          {
            tag: 'meta',
            attrs: {
              name: `config-resolved-${order}`,
              content: `${isConfigResolved}`,
            },
          },
        ]
      },
    },
  }
}

// The config file is loaded once per environment, so each load creates new
// plugin instances.
export default {
  plugins: [sharedPlugin('pre'), sharedPlugin('post')],
}
