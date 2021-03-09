import { waitingState, omitEmpty } from '../../lib/action-helpers'
import queryString from 'query-string'
import fetch from 'node-fetch'
import _ from 'lodash'
import moment from 'moment'

const mapPublicationToObject = (publication, publisherId) => {
  return _.omitBy({
    '@timestamp': moment().valueOf(),
    publisher_id: publisherId,
    publication_id: _.get(publication['work-summary'][0], 'put-code'),
    publication_date: moment(`${_.get(publication['work-summary'][0], 'publication-date.year.value', _.get(publication['work-summary'][0], 'created-date.value'))}-${_.get(publication['work-summary'][0], 'publication-date.month.value', '01')}-${_.get(publication['work-summary'][0], 'publication-date.day.value', '01')}`).valueOf(),
    last_modified_date: _.get(publication['work-summary'][0], 'last-modified-date.value'),
    title: _.get(publication['work-summary'][0], 'title.title.value'),
    subtitle: _.get(publication['work-summary'][0], 'title.subtitle'),
    url: _.get(publication['work-summary'][0], 'url.value'),
    type: _.get(publication['work-summary'][0], 'type'),
    journal_title: _.get(publication['work-summary'][0], 'journal-title.value')
  }, _.isUndefined)
}

export const fetchPublications = (publisherId) => async dispatch => {
  const waitingKey = 'PUBLICATIONS'
  try {
    dispatch(waitingState(waitingKey, true))
    const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/publications/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({
      type: 'PUBLICATIONS_LIST',
      payload
    })
  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState(waitingKey, false))
  }
}


export const queryPublications = (publisherId, queryTerms = []) => async dispatch => {
  const query = queryTerms.join()
  const waitingKey = 'PUBLICATIONS'
  try {
    dispatch(waitingState(waitingKey, true))
    // const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/publications?keywords=${query}`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' }
    // })

    // const payload = await response.json()

    return dispatch({
      type: 'PUBLICATIONS_LIST',
      payload: {}
    })
  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState(waitingKey, false))
  }
}