import Header from '../../../_components/header/header.jsx'
import InfoBlock from '../../../_components/infoBlock/InfoBlock.jsx'
import MapButton from '../../../_components/mapButton/MapButton.jsx'
import MasterCard from '../../../_components/masterCard/MasterCard.jsx'
import Review from '../../../_components/review/Review.jsx'
import ServicesList from '../../../_components/servicesList/ServicesList.jsx'

export default function RegistrationPage(){
    return(
        <main>
            <Header/>
            <InfoBlock/>
            <MapButton/>
            <MasterCard/>
            <Review/>
            <ServicesList/>
        </main>
    )
}