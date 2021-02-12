import { ISMSRequest, ITemplateManager, ITemplate } from "../interfaces/interfaces";
import { Template } from "./template";

export class smsTemplate extends Template {
    getTemplate():ISMSRequest[] {
        return null
    }
}