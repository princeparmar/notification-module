import { ILogManager, IPublisher, ISESRequest, ISMSRequest, ISNSRequest } from "../interfaces/interfaces";

export abstract class Publisher implements IPublisher {
    protected data: ISESRequest | ISMSRequest | ISNSRequest
    protected logger: ILogManager
    setRequest(data: ISESRequest | ISMSRequest | ISNSRequest) {
        this.data = data
    }

    setLogger(logger: ILogManager) {
        this.logger = logger
    }

    abstract send(): void
    abstract validate(): void
}