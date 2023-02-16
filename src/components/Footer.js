import SwitchLabels from './SwitchLabels';

//footer component
const Footer = ({ setUnit, unitCurr }) => {

    // function to change the units - called when a button is clicked
    function changeUnits() {
        if (unitCurr === "℃") {
            setUnit("℉")

        }
        else {
            setUnit("℃")
        }

    }
    return (
        <div className="footerBack">
            <div className='footer'>

                <div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/moreInfo">MoreInfo</a></li>
                        <li><a href="/news">News</a></li>
                    </ul>
                </div>

                <SwitchLabels onChangeFunc={changeUnits} unit={unitCurr} />


            </div>
        </div>
    )
}

export default Footer