export default function Step1(props) {
    const { setStep } = props
    return (<>
        <div className="confirmation_heading">
            <div onClick={() => setStep(2)} className={`confirmation_heading_item`} style={{ color: "green", fontSize: 16 }}>
                Enter confirmation number to start Digiscale Delivery
            </div>
            <div className={`confirmation_heading_item `}>
                <div style={{ color: "green" }}>Settings</div>
            </div>
        </div>
        <div className="business_space">
            <div className="business_space_item">Business ad space</div>
            <div className="business_space_item">Business ad space</div>
            <div className="business_space_item">Business ad space</div>
        </div>
    </>
    )
}