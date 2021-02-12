export enum IType {
    SMS = 'SMS',
    SES = 'SES',
    SNS = 'SNS'
}

export interface IExecutorConfig {
    templateManager?: { [t: string]: ITemplateManager }
    publisher?: { [t: string]: IPublisher }
    logManager?: ILogManager
    onSucess?: (data: Object) => {}
    onError?: (err: Error) => {}
    finally?: () => {}
}

export interface IPublisher {
    validate(): void
    setLogger(t: ILogManager): void
    setRequest(req: ISMSRequest | ISESRequest | ISNSRequest): void
    send(): void
}

export interface ITemplateManager {
    setInput(inp: ITemplate): void
    getTemplate(): ISMSRequest[] | ISESRequest[] | ISNSRequest[]
}

export interface ILogManager {
    setRequest(t: IRequest): void
    info(msg: string): void
    warn(msg: string, err: Error): void
    error(msg: string, err: Error): void
}

interface IParams {
    sendTo: string
    params: string[]
}

interface ITemplate {
    templateId: string
    details: IParams[]
}


export interface ISNSRequest {
    token: string[]
    title: string
    body: string
    action: string
    icon: string
}


export interface ISESRequest {
    ccAddresses?: string[]
    toAddresses: string[]
    html?: string
    Text: string
    Subject: string
    Source: string /* required */
    ReplyToAddresses?: string[]
}

export interface ISMSRequest {
    message: string
    number: string
}

export interface IRequest {
    id: string
    type: IType
    template: ITemplate
    requestedTime: Date
    userDetails: Object
}

