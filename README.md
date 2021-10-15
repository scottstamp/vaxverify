# VaxVerify

A free, open-source "vaccine passport" verifier.

### Information

VaxVerify is an open-source verifier app for international standard "vaccine passport" QR proofs.
These QR codes are digitally signed by their issuing party (typically a local government or health authority).

The majority of Canadian provinces using a QR proof system currently adopt the Smart Health Cards protocol (https://smarthealth.cards), a standard using JSON Web Tokens to securely encode health information.
Information currently included by Canadian provinces includes: Full name, date of birth, vaccine history (COVID-19 related only) such as date, vaccine type and location received. Proofs may also store medical exemption information for people with exempted medical conditions. More information regarding exemptions is currently unknown.

In addition to SHC, support has also recently been added for EU Green Pass proofs. This feature is currently in beta and may not work as expected. Please file an Issue if you experience any problems with EU Green Pass.

### 🇨🇦 Supported Provinces and Territories

VaxVerify currently supports the following Canadian provinces and territories:

* Alberta
* British Colombia
* Newfoundland and Labrador
* Northwest Territories
* Nova Scotia
* Québec
* Saskatchewan
* Yukon

### Other Supported Regions

In addition to supporting Canadian standards, VaxVerify can decode records that comply with SMART Health Card or EU Green Pass standards. The following regions currently have validation support:

* European Union members
* United Kingdom
* USA
 - California

### Disclaimers

* This project is not affiliated with any government or health agency, in Canada or otherwise.
* This app is intended for educational purposes and does not provide any warranty of any kind including data validation.
* This application should not be used to collect personal data without the consent of the data owner. Furthermore, it cannot be used for verifying proof of vaccination in the context of the law on vaccination passports in any Canadian province or territory. **Merchants and venue owners must use the official application for their jurisdiction.**
* The developer of this application disclaims any responsibility for illegal use of the application by a third party.

---

## Usage

This is a React web application. A local copy can be served with the following commands:

```
git clone https://github.com/scottstamp/vaxverify.git
cd vaxverify
npm install
npm start
```

A production copy is also hosted at https://covid.xksc.org but note this version may not always be the latest commit.

---

## Credits

* Huge thank you to @obrassard for his work on https://github.com/obrassard/shc-extractor which this project is largely based on. See his repo for more technical information and background.