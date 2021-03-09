import { omitBy, isUndefined } from 'lodash'

class FetchError extends Error {
  constructor (obj) {
    super()
    this.detail = obj.detail
    this.code = obj.code
    this.status = obj.status
    this.json = obj.json
  }
}

export const waitingState = (key, state) => {
  return {
    type: 'WAITING',
    payload: {
      key, state: !!state
    }
  }
}

export const fetchJSON = async function () {
  const args = Array.from(arguments)
  const res = await global.fetch.apply(this, args)
  try {
    const json = await res.json()
    if (!res.ok) {
      throw new FetchError({ json, status: res.status })
    }
    return { json, status: res.status }
  } catch (error) {
    return { ...error, status: res.status }
  }
}

export const apiFetch = async function (path, ...rest) {
  const url = 'https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev'
  const fetch = () => fetchJSON.apply(this, [url, {
    credentials: 'include',
    headers: new global.Headers({
      'Content-Type': 'application/json'
    }),
    method: 'GET',
    ...rest[0] }])

  try {
    const { json: result } = await fetch()
    return result
  } catch (error) {
    if (error.status === 502 || error.status === 503) {
      const { json: result } = await fetch()
      return result
    }
    throw error
  }
}

export const omitEmpty = function (data) {
  return omitBy(data, val => isUndefined(val) || val === null)
}

