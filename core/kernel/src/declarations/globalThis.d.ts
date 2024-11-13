declare global {
  // eslint-disable-next-line no-var
  var kernel: Kernel | undefined

  interface Navigator {
    userAgentData: NavigatorUAData | null
  }
}
