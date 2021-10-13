import { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import QrReader from 'react-qr-reader'

import { parseShc } from '../modules/parsers'
import HealthCard from '../components/HealthCard'


export default function MainPage() {
    const [tabKey, setTabKey] = useState('text')
    const [data, setData] = useState(undefined)

    const handleShc = async (text) => {
        if (text && text.startsWith('shc:/')) {
            var parsed = await parseShc(text)

            setData(parsed)
            setTabKey('info')
        }
    }

    const handlePasteSubmit = (event) => {
        handleShc(event.target[0].value);
        event.preventDefault();
    }

    return (
        <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} id="input-tabs" className="mb-3">
            <Tab eventKey="scan" title="Scan">
                {tabKey === 'scan' && <QrReader
                    className="mx-auto"
                    style={{ width: '100%' }}
                    onScan={handleShc}
                    showViewFinder={false}
                    delay={100} />}
            </Tab>
            <Tab eventKey="text" title="Paste Text">
                <form onSubmit={handlePasteSubmit}>
                    <div class="form-group">
                        <label for="shcData">SHC data</label>
                        <textarea id="shcData" className="form-control" placeholder="shc:/5676290952..." rows="8" />
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary mt-2" />
                </form>
            </Tab>
            <Tab eventKey="info" title="Info" disabled={data === undefined}>
                {data && <HealthCard data={data} />}
            </Tab>
        </Tabs>
    )
}