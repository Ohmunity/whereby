import fetch from 'node-fetch'

const BASE_URL = 'https://api.whereby.dev/v1'

interface Response {
  success: boolean
  data?: any
  error?: any
}

interface CallOptions {
  body?: { [key: string]: any }
}

interface CreateMeeting {
  startDate: Date
  endDate: Date
  isLocked?: boolean
  roomNamePrefix?: string
  roomMode?: 'group' | 'normal'
  fields?: string[]
}

class WhereBy {
  token: string | null = null

  constructor(token: string) {
    this.token = token
  }

  private _call(
    url: string,
    method: 'GET' | 'POST' | 'DELETE',
    options?: CallOptions,
  ): Promise<Response> {
    if (!this.token) {
      throw new Error('Token is required')
    }

    return new Promise((resolve) => {
      fetch(BASE_URL + url, {
        method,
        body: options?.body ? JSON.stringify(options?.body) : undefined,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((r) => {
          return r.json()
        })
        .then((response) => {
          if (response.error) {
            resolve({
              success: false,
              error: new Error(response.error),
            })
          } else {
            resolve({
              success: true,
              data: response,
            })
          }
        })
        .catch((err) => {
          resolve({
            success: false,
            error: err,
          })
        })
    })
  }

  createMeeting({
    startDate,
    endDate,
    ...moreOptions
  }: CreateMeeting): Promise<Response> {
    return this._call('/meetings', 'POST', {
      body: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        fields: ['hostRoomUrl'],
        ...moreOptions,
      },
    })
  }

  meeting(id: string | number): Promise<Response> {
    return this._call(`/meetings/${id}`, 'GET')
  }

  deleteMeeting(id: string | number): Promise<Response> {
    return this._call(`/meetings/${id}`, 'DELETE')
  }
}

export default WhereBy
