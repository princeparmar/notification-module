import { IBasicTemplate, IType } from "../interfaces/interfaces";

export const basicTemplates: IBasicTemplate = {
    "tmpl_1": {
        [IType.SMS]: {
            message: "hello [name] \\ variable for params, this is the testing message",
        },
        [IType.SES]: {
            ccAddresses: [], // email ids for cc
            html: "html code",
            Text: "email text",
            Subject: "email subject",
            Source: "shource mail address", /* required */
            ReplyToAddresses: [] // if source mail is not for reply the add email ids where users can reply
        },
        [IType.SNS]: {
            title: "sample notification",
            body: "sample body",
            action: "action url",
            icon: "Icon url"
        }

    }
}