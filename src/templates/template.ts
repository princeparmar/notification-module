import { IBasicTemplate, ISESRequest, ISMSRequest, ISNSRequest, ITemplate, ITemplateManager, IType } from "../interfaces/interfaces"

export class Template implements ITemplateManager {
    private inp: ITemplate
    private typ: IType

    constructor(private basicTemplates: IBasicTemplate) { }

    setInput(inp: ITemplate, typ: IType) {
        this.inp = inp
        this.typ = typ
    }

    findTemplate(): ISMSRequest | ISESRequest | ISNSRequest {
        return this.basicTemplates[this.inp.templateId][this.typ]
    }

    async getTemplate(): Promise<ISMSRequest[] | ISESRequest[] | ISNSRequest[]> {
        let tmpl = this.findTemplate()
        tmpl = JSON.parse(JSON.stringify(tmpl))

        const out: ISMSRequest[] | ISESRequest[] | ISNSRequest[] = []

        for (const detail of this.inp.details) {
            if (!detail || !detail.params) continue
            tmpl.sendTo = detail.sendTo
            let str = JSON.stringify(tmpl)
            for (const param of Object.keys(detail.params)) {
                str = str.split(`[${param}]`).join(detail.params[param])
            }
            out.push(JSON.parse(str))
        }

        return out
    }

}