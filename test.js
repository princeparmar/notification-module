// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const { isStrictNullChecksEnabled } = require('tslint');
// Set region
AWS.config.update({ region: 'ap-south-1' });


async function start() {
    // console.log("start")
    try {
        // result = await sendEmail()
        // console.log("end", JSON.stringify(result))
    } catch (e) {
        // console.log("received error", e)
    }
}


function sendEmail() {
    // Load the AWS SDK for Node.js
    // var AWS = require('aws-sdk');
    // Set the region 
    // AWS.config.update();

    // Create sendEmail params 
    var params = {
        Destination: { /* required */
            CcAddresses: [
                // 'pradip@alfa-creator.com',
                /* more items */
            ],
            ToAddresses: [
                // 'pradip@alfa-creator.com',
                'prince.soamedia@gmail.com',
                /* more items */
            ]
        },
        Message: { /* required */
            Body: { /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: "HTML_FORMAT_BODY"
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "TEXT_FORMAT_BODY"
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email'
            }
        },
        Source: 'prince.soamedia@gmail.com', /* required */
        ReplyToAddresses: [
            // 'prince.soamedia@gmail.com',
            /* more items */
        ],
    };

    // Create the promise and SES service object
    return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
}

function sendSMS() {
    // Create publish parameters
    var params = {
        Message: 'TEXT_MESSAGE', /* required */
        PhoneNumber: '+918160356061',
    };
    // Create promise and SNS service object
    return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
}


function check() {
    return ""
}

let res = start()
console.log(res instanceof Object)
res = check()
console.log(res instanceof Promise)
