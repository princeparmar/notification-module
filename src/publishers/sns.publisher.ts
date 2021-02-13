import { ILogManager, IPublisher, ISESRequest, ISMSRequest, ISNSRequest } from "../interfaces/interfaces";
import * as AWS from 'aws-sdk'
import { Publisher } from "./publisher";

export class AwsSns extends Publisher {
    protected data: ISNSRequest
    async send() {
        this.logger.info("sending data")
    }

    validate() {
        this.logger.info("validating data")
    }
}