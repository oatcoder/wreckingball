import { PubSub, Topic } from '@google-cloud/pubsub'
import { logger } from '../logging'

export class GcpService {
  private _pubSub: PubSub
  private _topic: Topic

  constructor (private gcpConfig: any) {
    this._pubSub = new PubSub({ projectId: gcpConfig.projectId })
    this._topic = this._pubSub.topic(this.gcpConfig.topicName)
  }

  publishMessage (message: any) {
    logger.info('Publishing Message', { msg: message })

    return this._topic.publishJSON(message)
      .then(value => {
        logger.info('Message published', { msg: message, value })
        return value
      })
  }
}
