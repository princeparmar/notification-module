import { ILogManager, IPublisher, ISESRequest, ISMSRequest } from "../interfaces/interfaces";
import * as AWS from 'aws-sdk'
import { Publisher } from "./publisher";

export class AwsSes extends Publisher {
    protected data: ISESRequest
    async send() {
        this.logger.info("sending data")
    }

    validate() {
        this.logger.info("validating data")
    }
}