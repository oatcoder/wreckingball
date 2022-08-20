import { Serializer } from 'jsonapi-serializer'
import { GcpService } from './GcpService'
import { IMeta, IPhrase } from '../models'
import { logger } from '../logging'
import { MessageTypeEnum, MesssageStatusEnum } from '../enums'
import { v4 as uuid } from 'uuid'

export class PhraseService {
  constructor (private gcpService: GcpService) {

  }

  emitPhrase (phrase: string) {
    const dto = this.buildMessageDto(phrase)

    return this.gcpService.publishMessage(dto)
      .catch(reason => {
        logger.error('Phrase emit threw an exception', { reason })
        throw new Error('Phrase message publish failed')
      })
  }

  buildMessageDto (phrase: string) {
    const phraseData: IPhrase = {
      status: MesssageStatusEnum.EVALUATE,
      text: phrase
    }

    const meta: IMeta = {
      id: uuid(),
      source: 'phrase cloud function',
      timestamp: parseInt(Date.now().toString(), undefined),
      type: MessageTypeEnum.CloudFunctionMessage
    }

    return new Serializer(MessageTypeEnum.CloudFunctionMessage, {
      attributes: Object.keys(phraseData),
      meta: meta
    }).serialize(phraseData)
  }
}
