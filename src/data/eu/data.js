import countryCodes from './codes/country-2-codes.json'
// import diseaseAgentTargeted from './codes/disease-agent-targeted.json'
import vaccineMahManf from './codes/vaccine-mah-manf.json'
import vaccineMedicinalProduct from './codes/vaccine-medicinal-product.json'
// import vaccineProphylaxis from './codes/vaccine-prophylaxis.json'

export function getCountryDisplayName(code) {
    if (code === 'CNAM') return 'France'

    return countryCodes.valueSetValues[code].display
}

export function getManufacturerDisplayName(code) {
    return vaccineMahManf.valueSetValues[code].display
}

export function getVaccineProductDisplayName(code) {
    return vaccineMedicinalProduct.valueSetValues[code].display
}