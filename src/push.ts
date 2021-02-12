
import { IRequest, IExecutorConfig, IType } from "./interfaces/interfaces";
import { AwsSes } from "./publishers/ses.publisher";
import { AwsSms } from "./publishers/sms.publisher";
import { AwsSns } from "./publishers/sns.publisher";
import { sesTemplate } from "./templates/sesTemplate";
import { smsTemplate } from "./templates/smsTemplate";
import { snsTemplate } from "./templates/snsTemplate";

export class Executor {

    // configurations for the executor
    private config: IExecutorConfig = {
        templateManager: {},
        publisher: {},
        logManager: null,
        onSucess: function (data: Object): any { },
        onError: function (error: Error): any { },
        finally: function (): any { }
    }
    private request: IRequest;

    constructor(config: IExecutorConfig, request?: IRequest) {
        this.setDefaultConfig()
        this.updateConfig(config)
        if (request) this.setRequest(request)
    }

    private setDefaultConfig() {
        this.config.templateManager[IType.SES] = new sesTemplate()
        this.config.templateManager[IType.SMS] = new smsTemplate()
        this.config.templateManager[IType.SNS] = new snsTemplate()

        this.config.publisher[IType.SES] = new AwsSes()
        this.config.publisher[IType.SMS] = new AwsSms()
        this.config.publisher[IType.SNS] = new AwsSns()
    }

    // updating the config
    updateConfig(config: IExecutorConfig) {
        if (config.publisher)
            for (let k in config.publisher) this.config.publisher[k] = config.publisher[k]

        if (config.templateManager)
            for (let k in config.templateManager) this.config.templateManager[k] = config.templateManager[k]

        this.config.onError = config.onError || this.config.onError
        this.config.onSucess = config.onSucess || this.config.onSucess
        this.config.finally = config.finally || this.config.finally
    }

    setRequest(request: IRequest) { this.request = request }

    process() {
        let lm = this.config.logManager
        lm.setRequest(this.request)

        lm.info("process started")
        try {
            let t = this.request.type
            let tm = this.config.templateManager[t]
            tm.setInput(this.request.template)
            let tmpls = tm.getTemplate()
            let pub = this.config.publisher[t]
            let out = []
            for (let tmpl of tmpls) {
                lm.info(`validating request for ${tmpl}`)
                pub.setLogger(lm)
                pub.setRequest(tmpl)
                pub.validate()
                lm.info(`send notification for ${tmpl}`)
                let result = pub.send()
                out.push(result)
                lm.info(`sent success for ${tmpl}`)
            }
            this.config.onSucess && this.config.onSucess(out)
        } catch (e) {
            this.config.onError && this.config.onError(e)
            lm.error("Error in notification", e)
        } finally {
            this.config.finally && this.config.finally()
        }
    }
}