import { IBasicTemplate, IType } from "../interfaces/interfaces";

export const basicTemplates: IBasicTemplate = {
    "tmpl_1": {
        [IType.SMS]: {
            message: "hello [name], this is the testing message",
            sendTo: "MobileNumber"
        }
    }
}