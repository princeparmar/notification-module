
import { IRequest, IExecutorConfig, IType } from "./interfaces/interfaces";
import { AwsSes } from "./publishers/ses.publisher";
import { AwsSms } from "./publishers/sms.publisher";
import { AwsSns } from "./publishers/sns.publisher";
import { SesTemplate } from "./templates/sesTemplate";
import { SmsTemplate } from "./templates/smsTemplate";
import { SnsTemplate } from "./templates/snsTemplate";

export class Executor {

    // configurations for the executor
    private config: IExecutorConfig = {
        templateManager: {},
        publisher: {},
        logManager: null
    }
    private request: IRequest;

    constructor(config: IExecutorConfig, request?: IRequest) {
        this.setDefaultConfig()
        this.updateConfig(config)
        if (request) this.setRequest(request)
    }

    private setDefaultConfig() {
        this.config.templateManager[IType.SES] = new SesTemplate()
        this.config.templateManager[IType.SMS] = new SmsTemplate()
        this.config.templateManager[IType.SNS] = new SnsTemplate()

        this.config.publisher[IType.SES] = new AwsSes()
        this.config.publisher[IType.SMS] = new AwsSms()
        this.config.publisher[IType.SNS] = new AwsSns()
    }

    // updating the config
    updateConfig(config: IExecutorConfig) {
        if (config.publisher)
            for (const k in config.publisher) this.config.publisher[k] = config.publisher[k]

        if (config.templateManager)
            for (const k in config.templateManager) this.config.templateManager[k] = config.templateManager[k]

        this.config.onError = config.onError || this.config.onError
        this.config.onSucess = config.onSucess || this.config.onSucess
        this.config.finally = config.finally || this.config.finally
    }

    setRequest(request: IRequest) { this.request = request }

    async process() {
        const lm = this.config.logManager
        lm.setRequest(this.request)

        lm.info("process started")
        try {
            const t = this.request.type
            const tm = this.config.templateManager[t]
            if (!tm) throw new Error(`INVALID_TEMP_TYPE`)

            tm.setInput(this.request.template)
            const tmpls = tm.getTemplate()
            if (!tmpls || tmpls.length === 0) throw new Error("INVALID_TEMPLATE_ID")

            const pub = this.config.publisher[t]
            if (!pub) throw new Error(`INVALID_PUBL_TYPE`)

            const out = []
            for (const tmpl of tmpls) {
                lm.info(`validating request for ${tmpl}`)
                pub.setLogger(lm)
                pub.setRequest(tmpl)
                pub.validate()
                lm.info(`send notification for ${tmpl}`)
                const result = await pub.send()
                out.push(result)
                lm.info(`sent success for ${tmpl}`)
            }
            if (this.config.onSucess) this.config.onSucess(out)
        } catch (e) {
            if (this.config.onError) this.config.onError(e)
            lm.error("Error in notification", e)
        } finally {
            if (this.config.finally) this.config.finally()
        }
    }
}