export function successRequest (data: object): any {
  return {
    code: 200,
    response: data
  }
}

export function badRequest (message?: string): any {
  return {
    code: 500,
    response: {
      message: message ?? 'INTERNAL_SERVER_ERROR',
      status: 500
    }
  }
}

export function notfoundRequest (message?: string): any {
  return {
    code: 404,
    response: {
      message: message ?? 'NOT_FOUND_REQUEST',
      status: 404
    }
  }
}
