import { ISESRequest, ISMSRequest, ISNSRequest, ITemplate, ITemplateManager } from "../interfaces/interfaces"

export abstract class Template implements ITemplateManager {
    protected inp: ITemplate
    setInput(inp: ITemplate) {
        this.inp = inp
    }

    abstract getTemplate():ISMSRequest[] | ISESRequest[] | ISNSRequest[]

}