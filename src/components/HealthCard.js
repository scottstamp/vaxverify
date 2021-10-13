import React, { Component } from 'react';
import { keys } from '../data/keys'
import { findPatientResource, findImmunizationResources, getFriendlyVaccineName } from '../modules/helpers'

class HealthCard extends Component {
    getPatientName = () => {
        var patient = findPatientResource(this.props.data.payload)
        var family = patient.name[0].family
        var given = patient.name[0].given.join(' ')

        return family + ", " + given
    }

    getImmunizations = () => {
        let immunizations = findImmunizationResources(this.props.data.payload)
        let records = []
        immunizations.forEach((el, key, arr) => {
            let tableClass = "table"
            if (Object.is(arr.length - 1, key)) {
                tableClass = "table mb-0"
            }

            records.push(
                <div key={el.fullUrl}>
                    <table className={tableClass}>
                        <tbody>
                            <tr>
                                <th>Vaccine</th>
                                <td>{getFriendlyVaccineName(el.vaccineCode)}</td>
                            </tr>
                            {el.dose &&
                                <tr>
                                    <th>Dose</th>
                                    <td>{el.protocolApplied.doseNumber}</td>
                                </tr>}
                            <tr>
                                <th>Status</th>
                                {/* gross uppercase hack */}
                                <td>{el.status.charAt(0).toUpperCase()}{el.status.slice(1)} on {el.occurrenceDateTime}</td>
                            </tr>
                            {el.location &&
                                <tr>
                                    <th>Location</th>
                                    <td>{el.location.display}</td>
                                </tr>}
                            {el.performer &&
                                <tr>
                                    <th>Location</th>
                                    <td>{el.performer[0].actor.display}</td>
                                </tr>}
                            <tr>
                                <th>Lot</th>
                                <td>{el.lotNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })

        return records
    }

    render() {
        const data = this.props.data;
        if (data?.payload == null) return

        let patient = findPatientResource(data.payload);
        let issued = new Date(data.payload.nbf * 1000 ?? 0);

        return <>
            {data.verifications.trustable ?
                <div className="card mb-3">
                    <div className="card-header" style={{ fontSize: '1.2em' }}>
                        Health Card <strong className="text-success">Validated</strong>
                        <img src="img/green-check.svg" alt="Valid" width="28" height="28" style={{ float: 'right' }} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{keys[this.props.data.payload.iss].friendly}</h5>
                        <p className="card-text">Issued: {issued.toLocaleDateString()} at {issued.toLocaleTimeString()}</p>
                    </div>
                </div> :
                <div className="card mb-3" >
                    <div className="card-header" style={{ fontSize: '1.2em' }}>
                        Health Card <strong className="text-danger">Invalid</strong>
                        <img src="img/red-cross.svg" alt="Invalid" width="28" height="28" style={{ float: 'right' }} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">This card could not be validated and therefore should not be trusted.</h5>
                        <p className="card-text">Issuer: {data.payload.iss}</p>
                    </div>
                </div>}

            <div className="card mb-3">
                <div className="card-header"><strong>Patient Information</strong></div>
                <div className="card-body">
                    <table className="table mb-0">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{this.getPatientName()}</td>
                            </tr>
                            <tr>
                                <th>Birthdate</th>
                                <td>{patient.birthDate}</td>
                            </tr>
                            {patient.gender &&
                                <tr>
                                    <td>Gender</td>
                                    <td>{patient.gender}</td>
                                </tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-header"><strong>Immunizations</strong></div>
                <div className="card-body">
                    {this.getImmunizations()}
                </div>
            </div>
        </>
    }
}

export default HealthCard;