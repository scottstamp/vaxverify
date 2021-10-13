/** Cached keys used to validate SHC for some specific issuers */
const keys = {
	"https://covid19.quebec.ca/PreuveVaccinaleApi/issuer" : {
        friendly:"Government of Quebec / Gouvernement du Québec (QC)",
		kid: "Nqa1zvChOkoA46B5ZM_oK3MDhL3-mnLERV_30vkHQIc",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "XSxuwW_VI_s6lAw6LAlL8N7REGzQd_zXeIVDHP_j_Do",
		y: "88-aI4WAEl4YmUpew40a9vq_w5OcFvsuaKMxJRLRLL0",
	},
	"https://smarthealthcard.phsa.ca/v1/issuer" : {
        friendly:"Provincial Health Services Authority (BC)",
		kid: "XCqxdhhS7SWlPqihaUXovM_FjU65WeoBFGc_ppent0Q",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "xscSbZemoTx1qFzFo-j9VSnvAXdv9K-3DchzJvNnwrY",
      	y: "jA5uS5bz8R2nxf_TU-0ZmXq6CKWZhAG1Y4icAx8a9CA"
	},
	"https://pvc.service.yukon.ca/issuer": {
        friendly:"Yukon Department of Health and Social Services (YT)",
		kid: "UnHGY-iyCIr__dzyqcxUiApMwU9lfeXnzT2i5Eo7TvE",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "wCeT9rdLYTpOK52OK0-oRbwDxbljJdNiDuxPsPt_1go",
		y: "IgFPi1OrHtJWJGwPMvlueeHmULUKEpScgpQtoHNjX-Q"
	},
	"https://skphr.prd.telushealthspace.com": {
        friendly:"MySaskHealthRecord (SK)",
		kid: "xOqUO82bEz8APn_5wohZZvSK4Ui6pqWdSAv5BEhkes0",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "Hk4ktlNfoIIo7jp5I8cefp54Ils3TsKvKXw_E9CGIPE",
		y: "7hVieFGuHJeaNRCxVgKeVpoxDJevytgoCxqVZ6cfcdk"
	},
	"https://commons.ehealthsask.ca": {
        friendly:"MySaskHealthRecord (SK)",
		kid: "RBvL32MBD4FXqXKE86HU9Nnjp0hADhqztOXb-M_mP_k",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "p9Rf7Wh1_vCMTK4i4XLQFI6_LR0ZhISQVJ2PAy2yEdA",
		y: "ai71citYuk72ldpGiwRZ0NfZGJPzKZBVulaUv_74IjY"
  	},
	"https://www.hss.gov.nt.ca/covax": {
        friendly:"Northwest Territories Health and Social Services Authority (NT)",
		kid: "8C-9TNgyGuOqc-3FXyNRq6m5U9S1wyhCS1TvpgjzkoU",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "C-9Lltax_iU6iYdK8DdCZzv4cQN6SFVUG7ACaCT_MKM",
		y: "_qaENBMJz6iLf1qyYMx2_D6fXxbbNoHbLcfdPF9rUI0",
	},
	"https://www.gov.nl.ca/covid-19/life-during-covid-19/vaccination-record/prod": {
        friendly:"Government of Newfoundland and Labrador (NL)",
		kid: "UboztS3pE1mr0dnG7Rv24kRNqlYbHrbxd-qBFerpZvI",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "mB0PKTVRnr3JCtyucEjCHXkXW3COg5KP0y4gKCNJxWc",
		y: "PTpxiYECNiuyRwpwqjme8OIFdG7N-HwN2XH02phdZCs"
	},
	"https://covidrecords.alberta.ca/smarthealth/issuer" : {
        friendly:"Government of Alberta Covid Records (AB)",
		kty:"EC",
		kid:"JoO-sJHpheZboXdsUK4NtfulfvpiN1GlTdNnXN3XAnM",
		use:"sig",
		alg:"ES256",
		crv:"P-256",
		x:"GsriV0gunQpl2X9KgrDZ4EDCtIdfOmdzhdlosWrMqKk",
		y:"S99mZMCcJRsn662RaAmk_elvGiUs8IvSA7qBh04kaw0"
    },
	"https://pvc.novascotia.ca/issuer": {
		friendly: "Government of Nova Scotia (NS)",
        kid: "UJrT9jU8vOCUl4xsI1RZjOPP8hFUv7n9mhVtolqH9qw",
        kty: "EC",
		use: "sig",
		alg: "ES256",
		crv: "P-256",
		x: "kIaIeOhhxpiN13sDs6RKVzCpvxxObI9adKF5YEmKngM",
		y: "AZPQ7CHd3UHp0i4a4ua1FhIq8SJ__BuHgDESuK3A_zQ"
	}
}

export { keys }