
import { IRequest, IExecutorConfig } from "./interfaces/interfaces";

export class Executor {

    private config: IExecutorConfig = {}
    private request: IRequest;

    constructor(config: IExecutorConfig, request?: IRequest) {
        this.updateConfig(config)
        if (request) this.setRequest(request)
    }

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
            for (let tmpl of tmpls) {
                lm.info(`validating request for ${tmpl}`)
                pub.setLogger(lm)
                pub.setRequest(tmpl)
                pub.validate()
                lm.info(`send notification for ${tmpl}`)
                pub.send()
                lm.info(`sent success for ${tmpl}`)
            }
        } catch (e) {
            lm.error("Error in notification", e)
        }
    }
}