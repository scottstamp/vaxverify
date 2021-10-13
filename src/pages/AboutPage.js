export default function AboutPage() {
    return (
        <div className="p-4 mt-4 mb-4 bg-light rounded-3">
            <div className="container-fluid py-2">
                <h4 className="display-6 fw-bold">About VaxVerify</h4>
                <p className="fs-7">
                    <strong>VaxVerify</strong> is <a href="https://github.com/scottstamp/vaxverify">free, open-source</a> Canadian "vaccine passport" verifier.
                </p>
                <p className="fs-7">
                    <strong className="text-white">DISCLAIMER:</strong> VaxVerify is not intended to be used as a replacement for official apps provided by the province.
                </p>
                <p className="fs-7">
                    Using this app for any official purposes may be a violation of law in some provinces, and we take no responsibility for the information provided.
                    This project is an educational exercise to help document how these systems work.
                </p>
                <p className="fs-7">
                    Please only use VaxVerify with <span className="text-white">your own</span> information, or <span className="text-white">with the consent of the third party</span>.{' '}
                    Information contained within should not be considered "private", but could reveal details a third party may not wish to share (i.e. medical exemptions).
                </p>
                <p className="fs-7">
                    The goal of this project is to create a Canada-wide compatible application, and more provinces will be added as they roll out provincial initiatives.
                </p>
                <p className="fs-7">
                    Currently supported:
                    <ul>
                        <li>Alberta</li>
                        <li>British Colombia</li>
                        <li>Newfoundland and Labrador</li>
                        <li>Northwest Territories</li>
                        <li>Nova Scotia</li>
                        <li>Québec</li>
                        <li>Saskatchewan</li>
                        <li>Yukon</li>
                    </ul>
                </p>
            </div>
        </div>
    )
}