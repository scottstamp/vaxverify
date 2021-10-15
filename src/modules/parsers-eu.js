// import { unpack, unpackAndVerify } from '@pathcheck/dcc-sdk'
// import cbor from 'cbor-web'
// import bdec from 'cbor-bigdecimal'
// bdec(cbor)

import zlib from 'pako'
import base45 from 'base45'
import * as cbor from 'borc'
import * as base64 from 'base64-js'
// import jose from 'node-jose'

const URI_SCHEMA = 'HC1';

// const CWT_ISSUER = 1;
// const CWT_SUBJECT = 2;
// const CWT_AUDIENCE = 3;
// const CWT_EXPIRATION = 4;
// const CWT_NOT_BEFORE = 5;
// const CWT_ISSUED_AT = 6;
// const CWT_ID = 7;
// const CWT_HCERT = -260;
// const CWT_HCERT_V1 = 1;

// const CWT_STRING_PAYLOAD = 99;

// const COSE_ALG_TAG = 1;
// const COSE_KID_TAG = 4;


function toBase64(bytes) {
    return base64.fromByteArray(bytes);
}

function toBase64URL(bytes) {
    return toBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/m, '');
}

async function unpack(uri) {
    let data = uri;

    // Backwards compatibility.
    if (data.startsWith(URI_SCHEMA)) {
        data = data.substring(3)
        if (data.startsWith(':')) {
            data = data.substring(1)
        } else {
            console.warn("Warning: unsafe HC1: header from older versions");
        };
    } else {
        console.warn("Warning: no HC1: header from older versions");
    };

    let unencodedData = base45.decode(data);

    // Check if it was zipped (Backwards compatibility.)
    if (unencodedData[0] === 0x78) {
        unencodedData = zlib.inflate(unencodedData);
    }

    return unencodedData;
}

async function decodeCbor(cborObj) {
    if (cborObj instanceof Buffer || cborObj instanceof Uint8Array) {
        try {
            cborObj = cbor.decode(cborObj);
            for (var key in cborObj) {
                cborObj[key] = await decodeCbor(cborObj[key]);
            }
        } catch {
            // If it is not CBOR then encode Base64
            if (cborObj.length === 8) // key ID: 
                cborObj = toBase64URL(cborObj)
            else
                cborObj = cborObj.toString('base64');
        }
    }

    if (Array.isArray(cborObj)) {
        for (let i = 0; i < cborObj.length; i++) {
            cborObj[i] = await decodeCbor(cborObj[i])
        }
    }

    if (cborObj instanceof Map) {
        for (const [key,] of cborObj.entries()) {
            cborObj.set(key, await decodeCbor(cborObj.get(key)));
        }
    }

    return cborObj;
}

/*
function getCOSEHeaderParams(header) {
    let headerObj;
    // Sometimes the header has to be decoded. 
    if (header instanceof Buffer || header instanceof Uint8Array) {
        if (header.length === 0) {
            return {};
        }
        headerObj = cbor.decode(header);
    }

    // Sometimes the header is already decoded. 
    if (header instanceof Map) {
        headerObj = header;
    }

    if (headerObj) {
        let algorithm;
        let kid;

        if (headerObj.get(COSE_ALG_TAG))
            algorithm = headerObj.get(COSE_ALG_TAG);
        if (headerObj.get(COSE_KID_TAG))
            kid = new Uint8Array(headerObj.get(COSE_KID_TAG));

        return { alg: algorithm, kid: kid };
    }
    return {};
}

async function getIssuerKeyId(coseContent) {
    let cborObj = cbor.decode(new Uint8Array(coseContent));

    if (!cborObj) {
        console.log("Not a readable COSE");
        return undefined;
    }

    let cborObjValue = cborObj.value;

    if (!cborObjValue) {
        if (Array.isArray(cborObj)) {
            console.warn("COSE object with no Value field", cborObj);
            cborObjValue = cborObj;
        } else {
            console.log("COSE object with no Value field and no array", cborObj);
            return undefined;
        }
    }

    let [protec, unprotec, payload, signature] = cborObjValue;

    let cwtIssuer;

    try {
        let decodedPayload = cbor.decode(payload);
        if (decodedPayload instanceof Map) {
            cwtIssuer = decodedPayload.get(CWT_ISSUER);
        }
    } catch (err) {
        console.log(payload, err);
    }

    let protectedData = getCOSEHeaderParams(protec);
    let unProtectedData = getCOSEHeaderParams(unprotec);

    return {
        alg: protectedData.alg ? protectedData.alg : unProtectedData.alg,
        kid: protectedData.kid ? protectedData.kid : unProtectedData.kid,
        iss: cwtIssuer
    };
}
*/

const parseHC1 = async (rawHC1) => {
    if (window.bigint) {
        try {
            const { unpackAndVerify } = await import('@pathcheck/dcc-sdk');
            let payload = await unpackAndVerify(rawHC1)
            return { verified: true, payload };
        }
        catch {
            let decoded = await decodeCbor(await unpack(rawHC1));
            let payload = decoded.value[2]
            return { verified: false, payload };
        }
    } else {
        try {
            let decoded = await decodeCbor(await unpack(rawHC1));
            let payload = decoded.value[2]
            return { verified: false, payload }
        } catch (err) {
            console.log(err)
        }
    }
}

export { parseHC1 }