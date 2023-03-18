interface SendResponseOptions {
  type: 'Success' | 'Fail'
  message?: string
  data?: any
}

export function sendResponse(options: SendResponseOptions) {
  if (options.type === 'Success') {
    return Promise.resolve({
      message: options.message ?? null,
      data: options.data ?? null,
      status: options.type,
    })
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    message: options.message ?? 'Failed',
    data: options.data ?? null,
    status: options.type,
  })
}
export function generateToken(): string {
  const length = 8
  const chars = '0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    token += chars.charAt(randomIndex)
  }
  return token
}
