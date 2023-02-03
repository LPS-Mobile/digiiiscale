export default function Step1(props) {
    const { setStep, active, setActive } = props
    return (
        <div className="pickups_heading">
            <div className={`pickups_heading_item ${active === "pickups" ? "active_item" : ""} `}
                onClick={() => {
                    setStep(2)
                    setActive("pickups")
                }}>
                <div>Pickups</div>
            </div>
            <div className={`pickups_heading_item ${active === "prev-pickups" ? "active_item" : ""} `} onClick={() => {
                setStep(6)
                setActive("prev-pickups")
            }}>
                <div>Previous Pickups</div>
            </div>
        </div>
    )
}