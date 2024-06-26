import { fromCognitoIdentityPool  } from "@aws-sdk/credential-providers";

export interface CognitoIdentityPool {
    identityPoolId: string;
    logins: { [key: string]: string };
    clientConfig?: { region: string };
}

const getCredetialsFromCognitoIdentityPool = (config: CognitoIdentityPool) => {
    return fromCognitoIdentityPool({
        identityPoolId: config.identityPoolId,
        logins: config.logins,
        clientConfig: config.clientConfig
    })
}

const AWSProvider ={
    getCredetialsFromCognitoIdentityPool,
}

export { AWSProvider }

// Replace for code transpiled module.exports = AWSProvider