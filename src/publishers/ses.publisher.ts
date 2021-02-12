import { ILogManager, IPublisher, ISESRequest, ISMSRequest } from "../interfaces/interfaces";
import * as AWS from 'aws-sdk'
import { Publisher } from "./publisher";

export class AwsSms extends Publisher {
    protected data: ISMSRequest
    send() {
    }

    validate() {
    }
}