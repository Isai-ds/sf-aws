import { SendMessageCommand, SQSClient, ReceiveMessageCommand, Message, MessageAttributeValue } from "@aws-sdk/client-sqs";
import { CognitoIdentityCredentialProvider } from "@aws-sdk/credential-providers";

interface Payload {
  attributes?: Record<string, MessageAttributeValue> | undefined;
  body: string;
}

class AWSSQS {
  sqsClient: SQSClient;
  constructor(region: string, credentials: CognitoIdentityCredentialProvider) {
    this.sqsClient = new SQSClient({
      region: region,
      credentials: credentials,
    });
  }

  private getMessage = async (sqsQueueUrl: string, config: any) => { 
    const command = new ReceiveMessageCommand({
      AttributeNames: ['CreatedTimestamp'],
      MaxNumberOfMessages: config.maxNumberOfMessages,
      MessageAttributeNames: config.messageAttributeNames,
      QueueUrl: sqsQueueUrl,
      WaitTimeSeconds: config.waitTimeSeconds,
      VisibilityTimeout: config.visibilityTimeout,
    });
    return this.sqsClient.send(command);
  }

  sendMessage = async (sqsQueueUrl: string, payload: Payload, delayedSeconds: number = 10) => {
    const { ...body } = payload;

    const command = new SendMessageCommand({
      QueueUrl: sqsQueueUrl,
      DelaySeconds: delayedSeconds,
      MessageAttributes: body.attributes,
      MessageBody: body.body,
    });

    const response = await this.sqsClient.send(command);
    return response;
  }

  subscribe = async (sqsQueueUrl: string,callback: (message: any) => any, config: any = {
    maxNumberOfMessages: 10,
    messageAttributeNames: ['All'],
    waitTimeSeconds: 20,
    visibilityTimeout: 20,
  }) => {    
    setInterval(async () => {
      const messages = await this.getMessage(sqsQueueUrl, config);

      if (messages.Messages){
        messages.Messages.map((message) => callback(message));
      }  
    }, config.waitTimeSeconds * 1000);
  }
}

export { AWSSQS };
export type { Payload };

// Replace for code transpiled module.exports = AWSSQS;

