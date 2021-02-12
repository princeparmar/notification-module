import { ILogManager, IPublisher, ISMSRequest } from "../interfaces/interfaces";
import * as AWS from 'aws-sdk'
import { Publisher } from "./publisher";

export class AwsSms extends Publisher {

    private reg = new RegExp('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$')
    protected data:ISMSRequest

    send() {
        let params = {
            Message: this.data.message, /* required */
            PhoneNumber: this.data.number,
        };

        return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    }

    validate() {
        if (!this.data.message || this.data.message.trim().length == 0) throw new Error("Invalid message in sms");
        if (!this.data.number || this.data.number.trim().length == 0 || !this.reg.test(this.data.number)) throw new Error("Invalid number in sms");
    }
}