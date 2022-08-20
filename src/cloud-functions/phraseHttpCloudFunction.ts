import { Request, Response } from 'express'
import { GcpService, PhraseService } from '../services'
import { getGcpProjectId, getGcpTopicName } from '../env'
import { logger } from '../logging'

let GCP_SERVICE: GcpService
let PHRASE_SERVICE: PhraseService

export async function postPhrase (req: Request, res: Response) {
  res.type('application/json')

  logger.info('request', { req })

  if (req.method !== 'POST') {
    return res.status(500).send({}).end()
  }

  if (!req.body) {
    return res.status(500).send({}).end()
  }

  const gcpConfig = {
    projectId: getGcpProjectId(),
    topicName: getGcpTopicName()
  }

  const gcpService = GCP_SERVICE || new GcpService(gcpConfig)
  const phraseService = PHRASE_SERVICE || new PhraseService(gcpService)

  return phraseService.emitPhrase(req.body.phrase)
    .then(value => {
      return res.status(200).send().end()
    }).catch(reason => {
      return res.status(500).send().end()
    })
}
