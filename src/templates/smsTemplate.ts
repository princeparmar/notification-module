import { ISMSRequest, ITemplateManager, ITemplate } from "../interfaces/interfaces";
import { Template } from "./template";

export class SmsTemplate extends Template {
    getTemplate():ISMSRequest[] {
        return null
    }
}