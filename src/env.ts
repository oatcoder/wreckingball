export const getGcpProjectId = (): string => {
  return process.env.GCP_PROJECT_ID || ''
}

export const getGcpTopicName = (): string => {
  return process.env.GCP_TOPIC_NAME || ''
}

export const getTopicSubscriptionName = (): string => {
  return process.env.GCP_TOPIC_SUBSCRIPTION_NAME || ''
}
