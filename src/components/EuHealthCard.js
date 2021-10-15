import React, { Component } from 'react';
import { getCountryDisplayName, getManufacturerDisplayName, getVaccineProductDisplayName } from '../data/eu/data'

class EuHealthCard extends Component {
    getEntry = () => {
        return this.props.data.payload.get(-260).get(1)
    }

    getPatientName = () => {
        var entry = this.getEntry()
        var family = entry.nam.fnt
        var given = entry.nam.gnt

        return family + ", " + given
    }

    getVaccinationRecord = () => {
        return this.getEntry().v.find(v => v.tg === '840539006')
    }

    getVaccinationStatus = (record) => {
        if (record === undefined) return false;
        return (record.dn >= record.sd)
    }

    getResultsHeader = (data) => {
        const issuedAt = new Date(this.props.data.payload.get(6) * 1000)
        const expiresAt = new Date(this.props.data.payload.get(4) * 1000)

        if (window.bigint) {
            return (<>
                {data.verified ?
                    <div className="card mb-3">
                        <div className="card-header" style={{ fontSize: '1.2em' }}>
                            EU Green Pass <strong className="text-success">Validated</strong>
                            <img src="img/green-check.svg" alt="Valid" width="28" height="28" style={{ float: 'right' }} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Country of Origin: {getCountryDisplayName(data.payload.get(1))}</h5>
                            <p className="card-text">
                                Issued: {issuedAt.toLocaleDateString()} {issuedAt.toLocaleDateString()}<br />
                            Expires: {expiresAt.toLocaleDateString()} {expiresAt.toLocaleDateString()}
                            </p>
                        </div>
                    </div> :
                    <div className="card mb-3" >
                        <div className="card-header" style={{ fontSize: '1.2em' }}>
                            EU Green Pass <strong className="text-danger">Invalid</strong>
                            <img src="img/red-cross.svg" alt="Invalid" width="28" height="28" style={{ float: 'right' }} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">This card could not be validated and therefore should not be trusted.</h5>
                            <h5 className="card-title">Country of Origin: {getCountryDisplayName(data.payload.get(1))}</h5>
                            <p className="card-text">
                                Issued: {issuedAt.toLocaleDateString()} {issuedAt.toLocaleDateString()}<br />
                            Expires: {expiresAt.toLocaleDateString()} {expiresAt.toLocaleDateString()}
                            </p>
                        </div>
                    </div>}
            </>)
        } else {
            return (<div className="card mb-3">
                <div className="card-header" style={{ fontSize: '1.2em' }}>
                    EU Green Pass
                </div>
                <div className="card-body">
                    <h5 className="card-title">Country of Origin: {getCountryDisplayName(data.payload.get(1))}</h5>
                    <p className="card-text">Your browser or device does not support BigInt. Pass could not be verified.</p>
                    <p className="card-text">
                        Issued: {issuedAt.toLocaleDateString()} {issuedAt.toLocaleDateString()}<br />
                Expires: {expiresAt.toLocaleDateString()} {expiresAt.toLocaleDateString()}
                    </p>
                </div>
            </div>)
        }
    }

    render() {
        const data = this.props.data;

        if (data.payload === undefined) {
            return (<h3>Error loading data</h3>)
        }

        const patientName = this.getPatientName()
        const patientDob = this.getEntry().dob

        const vaccinationRecord = this.getVaccinationRecord()
        const vaccinationStatus = this.getVaccinationStatus(vaccinationRecord)

        return <>
            {this.getResultsHeader(data)}

            <div className="card mb-3">
                <div className="card-header"><strong>Patient Information</strong></div>
                <div className="card-body">
                    <table className="table mb-0">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{patientName}</td>
                            </tr>
                            <tr>
                                <th>Birthdate</th>
                                <td>{patientDob}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-header">
                    <strong>Immunizations</strong>

                    {vaccinationStatus ?
                        <span className="float-end"><span className="text-success fw-bold">Vaccinated</span> ({vaccinationRecord.dn}/{vaccinationRecord.sd})</span> :
                        <span className="float-end"><span className="text-danger fw-bold">Not fully vaccinated</span> ({vaccinationRecord.dn}/{vaccinationRecord.sd})</span>}
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Vaccine</th>
                                <td>{getVaccineProductDisplayName(vaccinationRecord.mp)}</td>
                            </tr>
                            <tr>
                                <th>Mfr</th>
                                <td>{getManufacturerDisplayName(vaccinationRecord.ma)}</td>
                            </tr>
                            <tr>
                                <th>Doses</th>
                                <td>{vaccinationRecord.dn}/{vaccinationRecord.sd}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{vaccinationRecord.dt}</td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td>{getCountryDisplayName(vaccinationRecord.co)}</td>
                            </tr>
                            <tr>
                                <th>Issuer</th>
                                <td>{vaccinationRecord.is}</td>
                            </tr>
                            <tr>
                                <th>UVCI</th>
                                <td>{vaccinationRecord.ci}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    }
}

export default EuHealthCard;