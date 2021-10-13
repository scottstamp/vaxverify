import vaccineCodes from '../data/vaccineCodes'

const findPatientResource = (payload) => {
    const bundleEntries = payload.vc.credentialSubject.fhirBundle.entry ?? [];
    const patient = bundleEntries.find(e => e.resource.resourceType === 'Patient');
    if (patient) {
        return patient.resource;
    }
    return null;
}

const findImmunizationResources = (payload) => {
    const bundleEntries = payload.vc.credentialSubject.fhirBundle.entry ?? [];
    return bundleEntries.filter(e => e.resource.resourceType === 'Immunization')
    .map(e => {
        let resource = e.resource;
        resource.fullUrl = e.fullUrl;
        resource.occurrenceDateTime = resource.occurrenceDateTime.substring(0, 10);
        return resource;
    });
}

const getFriendlyVaccineName = (vaccineCode) => {
    var coding = vaccineCode.coding.find(c => c.system === "http://hl7.org/fhir/sid/cvx")

    if (coding === undefined)
        return vaccineCode.coding[0].code;

    var lookup = vaccineCodes.find(c => c.cvx === coding.code);
    if (lookup === undefined)
        return vaccineCode.coding[0].code;
    
    return lookup.product_name;
}

export {
    findPatientResource, 
    findImmunizationResources,
    getFriendlyVaccineName
}