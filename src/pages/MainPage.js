import { useRef, useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import QrReader from 'react-qr-reader-es6'

import { parseShc } from '../modules/parsers'
import HealthCard from '../components/HealthCard'
import EuHealthCard from '../components/EuHealthCard'
import { parseHC1 } from '../modules/parsers-eu'
import { Button } from 'react-bootstrap'


export default function MainPage() {
    const [tabKey, setTabKey] = useState('text')
    const [data, setData] = useState(undefined)
    const [euData, setEuData] = useState(undefined)
    const uploadRef = useRef(null)

    const handleData = async (text) => {
        if (text === null) return;

        if (text.startsWith('shc:/')) {
            // SHC vaccine certificate
            var shc = await parseShc(text)
            setEuData(undefined)
            setData(shc)
            setTabKey('info')
        } else if (text.startsWith("HC1:")) {
            try {
                // EU vaccine certificate
                var hc1 = await parseHC1(text)
            } catch (err) {
                console.error(err)
            }
            console.log(hc1)
            setData(undefined)
            setEuData(hc1)
            setTabKey('info')
        }
    }

    const handleError = (err) => {
        console.error(err)
    }

    const handlePasteSubmit = (event) => {
        handleData(event.target[0].value);
        event.preventDefault();
    }

    const handleLegacyLoad = () => {
        var el = document.getElementsByTagName('img')[0]
        if (el !== undefined) {
            el.setAttribute('src', 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22/%3E')
        }
    }

    const openImageDialog = () => {
        uploadRef.current.openImageDialog();
    }

    return (
        <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} id="input-tabs" className="mb-3">
            <Tab eventKey="scan" title="Scan">
                {tabKey === 'scan' && <QrReader
                    className="mx-auto"
                    style={{ width: '100%' }}
                    onScan={handleData}
                    onError={handleError}
                    resolution={1920}
                    showViewFinder={false}
                    delay={200} />}
            </Tab>
            <Tab eventKey="upload" title="Upload">
                {tabKey === 'upload' && <>
                    <Button onClick={openImageDialog}>Upload Image</Button>
                    <QrReader
                        className="mx-auto"
                        style={{ width: '100%' }}
                        onScan={handleData}
                        onLoad={handleLegacyLoad}
                        onError={handleError}
                        resolution={1920}
                        legacyMode={true}
                        ref={uploadRef}
                        delay={1000} />
                </>}
            </Tab>
            <Tab eventKey="text" title="Paste Text">
                <form onSubmit={handlePasteSubmit}>
                    <div className="form-group">
                        <label htmlFor="shcData">Decoded data (SHC or HC1)</label>
                        <textarea id="shcData" className="form-control" placeholder="shc:/5676290952..., HC1:..." rows="8" />
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary mt-2" />
                </form>
            </Tab>
            <Tab eventKey="info" title="Info" disabled={data === undefined && euData === undefined}>
                {data && <HealthCard data={data} />}
                {euData && <EuHealthCard data={euData} />}
            </Tab>
        </Tabs>
    )
}