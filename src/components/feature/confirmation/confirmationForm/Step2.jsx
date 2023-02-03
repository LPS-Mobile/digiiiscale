export default function Step2(props) {
    const { setStep } = props
    return (<>
        <div className="confirmation_heading">
            <div className={`confirmation_heading_item`}>
                <div className="confirmation_code">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={`confirmation_heading_item `} onClick={() => { setStep(3) }}>
                <div style={{ color: "green" }}>ENTER</div>
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