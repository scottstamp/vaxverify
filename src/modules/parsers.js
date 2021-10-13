const jose = require('node-jose')
const { keys } = require('../data/keys')
const pako = require('pako')

/**
 * Extract data from a raw 'shc://' string
 * @param {string} rawSHC The raw 'shc://' string (from a QR code)
 * @return The header, payload and verification result of the SHC
 */
const parseShc = async(rawSHC) => {
    const jwt = numericShcToJwt(rawSHC);
    const splitJwt = jwt.split(".")
    const header = parseJwtHeader(splitJwt[0])
    const payload = parseJwtPayload(splitJwt[1])
    const verifications = await verifySignature(jwt, payload.iss)

    console.log(verifications);

    return {
        header,
        payload,
        verifications
    }
}

/**
 * Convert a SHC raw string to a standard JWT
 * @param {string} rawSHC The raw 'shc://' string (from a QR code)
 * @return {string} The encoded JWT  
 */
function numericShcToJwt(rawSHC) {

    if (rawSHC.startsWith('shc:/')) {
        rawSHC = rawSHC.split('/')[1];
    }

    return rawSHC
        .match(/(..?)/g)
        .map((number) => String.fromCharCode(parseInt(number, 10) + 45))
        .join("")
}

/**
 * Decode the JWT header and return it as an object
 * @param {string} header Base64 encoded header
 * @return {object} The decoded header
 */
function parseJwtHeader(header) {
	const headerData = Buffer.from(header, "base64");
	return JSON.parse(headerData)
}

/**
 * Decode and extract the JWT payload
 * @param {string} payload Base64 encoded + zlib compressed jwt payload
 * @return {object} The decoded payload 
 */
function parseJwtPayload(payload) {
	const buffer = Buffer.from(payload, "base64")
	const payloadJson = Buffer.from(pako.inflateRaw(buffer), 'utf8')
	return JSON.parse(payloadJson)
}

/**
 * Verify the signature of a JWT with the given issuer
 * using the public key of the issuer.
 *
 * @param {string} jwt JWT to verify
 * @param {string} issuer The expexted issuer of the JWT
 * @return The verification result  
 */
async function verifySignature(jwt, issuer) {
	try {
        const keys = await getKeys(issuer);
        if (keys === undefined) {
            return {
                trustable: false
            }
        }

        const result = await jose.JWS.createVerify(keys).verify(jwt);
        return {
			trustable: result,
			verifiedBy: keys.kid,
			origin: issuer
		}
	} catch (err) {
		console.log(err.message)
		return {
			trustable: false
		}
	}
}

/**
 * Get the public keys of the given issuer.
 * We try to get the keys from the cache  first,
 * if not found, we fetch them from the issuer.
 *
 * @param {string} issuer Issuer of the JWT to verify
 * @return {jose.JWK.key | undefined} Key or undefined if not cached
 */
function getKeys(issuer) {
	if (keys[issuer]) {
        const key = keys[issuer];
        return jose.JWK.asKey(key);
	} else {
        return undefined;
	}
}

export { parseShc }