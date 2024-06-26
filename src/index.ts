import { AWSProvider } from "./lib/AWSProvider";
import { AWSSQS, Payload } from "./lib/sqs";

const credentials = AWSProvider.getCredetialsFromCognitoIdentityPool({
    identityPoolId: 'us-east-1:aff7953d-107a-4c42-9d1d-da45fd358a32',
    logins: {
        'river-trusted-1889-dev-ed.scratch.my.salesforce.com': 'eyJraWQiOiIyNTAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiZW14My14NFhpTFpiOGlrRlhWdE5zdyIsInN1YiI6Imh0dHBzOi8vdGVzdC5zYWxlc2ZvcmNlLmNvbS9pZC8wMEQ3WDAwMDAwMVZpTzlVQUsvMDA1N1gwMDAwMDd1UjB6UUFFIiwiYXVkIjoiM01WRzlFVG0wdEljc2ZyekhEanlhYjR4VWZJQTJtc1VhN3NXYVkyZGxkOVBabkxOLkl1V24uTFBndVFTdXpqWFY0aW1oOWQzMWJzS2lpY2tDYkl3UyIsImlzcyI6Imh0dHBzOi8vcml2ZXItdHJ1c3RlZC0xODg5LWRldi1lZC5zY3JhdGNoLm15LnNhbGVzZm9yY2UuY29tIiwiZXhwIjoxNzE5MzQ4NTU1LCJpYXQiOjE3MTkzNDg0MzUsIm5vbmNlIjoiYWJjIn0.Duu4Xj6QDfH3rPl6ij_WZlDBjlAgofpXY1YM4_6V6QFc1H3hg171mrG0rAAaunoOuq4yD9bFMZtNpM6jJhu09HVfpgywZgn2SKuGAAf87SOfOaEcq5TNqjdTrLgrZPOm0d1NS3s9YkMS3taHTWwNLF-cGBxgessrd06eIFZvi6oTLZoPP9d8vfYfgUh9rVu-qPEiGkDkdEuLUHkmLGqiVjEBQwaG5OpzFztpTSWRuGbavN-33oUCXjE0fgn9a4fgUOUDKOC0DP6rwYZMIPjTWfCOSHOItCWrQ54KYeZcu7nEZPnDlniW6BNyKGn0wHtHoSzlJrjVF6z7lP69nRUXnlQ4-FLYq93CDZjeqARGoSBLtbZDC2AVZoJ1Lz_dOdBBSLCO2XON22poB0EN_bjwTscpGV-OWG_S-ubnby84uZ2ah1wOowq1oXYW4oglNGSnV19wJa2A5e6jIFn695kpJK6rOpMmRuAzPxPgaFSYr4KuB6tEHxLuoX2vK4oT3T1y76qxkOby9Petkme7RdKzb2RY2DD8E4xHM4xuGrzxHYBuYEak6fcV1MsGi59uQu82n7fRoUjz3Q9TwoTincbIOvFVx5yneRO0q61nSWBrmadhtgH9e-13YWTDKZK-4OprQyktE2_0JQsttPotPNkACSc2NspuqUEPDdiTubS9bYc',	
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
    body: "Gaby " + Date.now().toLocaleString(),
} as Payload

notifications.subscribe("https://sqs.us-east-1.amazonaws.com/444847227411/notifications", (message) => {
       console.log(message)
});

notifications.sendMessage("https://sqs.us-east-1.amazonaws.com/444847227411/notifications", payload);
   

