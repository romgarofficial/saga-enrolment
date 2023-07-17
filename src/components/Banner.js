import {Nav, Carousel, Container, Button, Image} from "react-bootstrap"
import BannerBG1 from "../images/banner-bg1.jpg"
import BannerBG2 from "../images/banner-bg2.jpg"
import BannerBG3 from "../images/banner-bg3.jpg"

export default function Banner(){
    return(
        <>
            <Container fluid className="d-lg-flex justify-content-center align-items-center bg-lightgray vh-75 shadow p-0  d-none">
            <Carousel>
                <Carousel.Item interval={5000} className="vh-75">
                    <img
                    className="d-block w-100 img-filter center-cropped"
                    src={BannerBG1}
                    alt="First slide"
                    />
                    <Carousel.Caption className="text-shadow">
                    <h3 className="fw-bold">BE AN ALOYSIAN!</h3>
                    <p>Great News! Incoming new students or transferees from Public and other Private Junior High Schools, Pay only 1000 Pesos per month at SAGA for tuition and miscelleneous fees.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000} className="vh-75">
                    <img
                    className="d-block w-100 img-filter center-cropped"
                    src={BannerBG2}
                    alt="First slide"
                    />
                    <Carousel.Caption className="text-shadow">
                    <h3 className="fw-bold">BE AN ALOYSIAN!</h3>
                    <p>Great News! Incoming new students or transferees from Public and other Private Junior High Schools, Pay only 1000 Pesos per month at SAGA for tuition and miscelleneous fees.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000} className="vh-75">
                    <img
                    className="d-block w-100 img-filter center-cropped"
                    src={BannerBG3}
                    alt="First slide"
                    />
                    <Carousel.Caption className="text-shadow">
                    <h3 className="fw-bold">BE AN ALOYSIAN!</h3>
                    <p>Great News! Incoming new students or transferees from Public and other Private Junior High Schools, Pay only 1000 Pesos per month at SAGA for tuition and miscelleneous fees.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </Container>
        </>
    )
}
