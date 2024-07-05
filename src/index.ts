import { AWSProvider } from "./lib/AWSProvider";
import { AWSSQS, Payload } from "./lib/sqs";

const credentials = AWSProvider.getCredetialsFromCognitoIdentityPool({
    identityPoolId: 'us-east-1:aff7953d-107a-4c42-9d1d-da45fd358a32',
    logins: {
        'river-trusted-1889-dev-ed.scratch.my.salesforce.com': 'eyJraWQiOiIyNTAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiTzBZMVlGNDYwWkk4bHlsNUYwaUhEZyIsInN1YiI6Imh0dHBzOi8vdGVzdC5zYWxlc2ZvcmNlLmNvbS9pZC8wMEQ3WDAwMDAwMVZpTzlVQUsvMDA1N1gwMDAwMDd1UjB6UUFFIiwiYXVkIjoiM01WRzlFVG0wdEljc2ZyekhEanlhYjR4VWZJQTJtc1VhN3NXYVkyZGxkOVBabkxOLkl1V24uTFBndVFTdXpqWFY0aW1oOWQzMWJzS2lpY2tDYkl3UyIsImlzcyI6Imh0dHBzOi8vcml2ZXItdHJ1c3RlZC0xODg5LWRldi1lZC5zY3JhdGNoLm15LnNhbGVzZm9yY2UuY29tIiwiZXhwIjoxNzIwMDE3MTg3LCJpYXQiOjE3MjAwMTcwNjcsIm5vbmNlIjoiYWJjIn0.WJTRKTkPhcol5NwVWz0a5rp6XJ39mLTZMKhDsVOTx6kQrI8zSSVIB_7xD01P4bd4WO540czgg1PthBjZsu4AC7Gy5e02jLMCmHaCnP6hXd9T337SLmglLyUtvWz9mH4Dy0J7v0agmTXuhjGDgBV6MKoPbYTlm7fmnhjuvkhx0PislimLmcH85CG9U1pEELuEf9btFtfxJWXWDTOKWzT_zpokUr8wH6gzP2dvRTkUFxC1Nhgm1VgUXbbIv9L5OSV1-mnURFNfriB-XTPEb9704WqqczVv1jAtxdb9yfNalpdZS5y1Mg1QqNwgC26T_hHqsCHMHqrJVusEEAcOax2AgPytTnzL7kB0xRH0zPg7qTlzu-KA3R-F_HZOCW3Js9Lmofr6ZcrKqvH5vB1-BIJ9cRgObuV-HhLHoqEhxVtsScnR_KuEfw6OzQ3Zg_BDVm_IhkXPtpdhbYMRkoeNkv2SEZlX2huIrr7cytD12GUsXtKdrDVH83Q9SG_qTV4D5nzojqfuFelBXuZCqjslEriC749HkqexznEMCOZ6y4NuV45VBEFRb-BuTfikSaaGdU-u21sVoGyF6uyBE6Hs2Qu2I2Xyqt9843A9ZbuSUWQAdxfbHG2hENdMUBiysxvu7y-qOcYmTLSnA59Yoj7y90mQEBMULmAu4_ALNyskC1txnFU',	
    },
    clientConfig: { region: "us-east-1" },
});

const notifications = new AWSSQS("us-east-1", credentials);
const payload = {
    attributes: {
        Title: {
            DataType: "String",
            StringValue: "The Whistler",
        },
        Author: {
            DataType: "String",
            StringValue: "John Grisham",
          },
        WeeksOn: {
            DataType: "Number",
            StringValue: "6",
        },
    },
    body: "Wini " + Date.now().toLocaleString(),
} as Payload

notifications.subscribe("https://sqs.us-east-1.amazonaws.com/444847227411/notifications", (message) => {
       console.log(message)
});   

notifications.sendMessage("https://sqs.us-east-1.amazonaws.com/444847227411/notifications", payload);
   

