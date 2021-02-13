export enum IType {
    SMS = 'SMS',
    SES = 'SES',
    SNS = 'SNS'
}

export interface IExecutorConfig {
    templateManager?: ITemplateManager
    publisher?: { [t: string]: IPublisher }
    logManager?: ILogManager
    onSucess?: (data: object) => {}
    onError?: (err: Error) => {}
    finally?: () => {}
}

export interface IPublisher {
    validate(): void
    setLogger(t: ILogManager): void
    setRequest(req: ISMSRequest | ISESRequest | ISNSRequest): void
    send(): Promise<any>
}

export interface ITemplateManager {
    setInput(inp: ITemplate, typ: IType): void
    getTemplate(): Promise<ISMSRequest[] | ISESRequest[] | ISNSRequest[]>
}

export interface ILogManager {
    setRequest(t: IRequest): void
    updateStatus(status: string): void
    info(msg: string): void
    warn(msg: string, err: Error): void
    error(msg: string, err: Error): void
}

interface IParams {
    sendTo: string
    params: { [t: string]: string }
}

export interface ITemplate {
    templateId: string
    details: IParams[]
}

export interface IBasicTemplate {
    [t: string]: {
        [t: string]: ISMSRequest | ISESRequest | ISNSRequest
    }
}

export interface ISNSRequest {
    sendTo: string
    title: string
    body: string
    action: string
    icon: string
}


export interface ISESRequest {
    ccAddresses?: string[]
    sendTo: string
    html?: string
    Text: string
    Subject: string
    Source: string /* required */
    ReplyToAddresses?: string[]
}

export interface ISMSRequest {
    message: string
    sendTo: string
}

export interface IRequest {
    id: string
    type: IType
    template: ITemplate
    requestedTime: Date
    userDetails: object
}

