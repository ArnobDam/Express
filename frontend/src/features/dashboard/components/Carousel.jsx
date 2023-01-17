import "./Carousel.css";
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

export function Carousel({ children, itemLength, top = null, ...rest }) {
  return (
    <CarouselProvider
      naturalSlideHeight={800}
      naturalSlideWidth={600}
      totalSlides={itemLength}
      visibleSlides={4}
      step={4}
      dragEnabled={false}
      className="relative"
      {...rest}
    >
      <ButtonBack
        className="carousel-control-btn back"
        style={{ top: top ?? "46%" }}
      >
        <RxCaretLeft />
      </ButtonBack>
      <ButtonNext
        className="carousel-control-btn next"
        style={{ top: top ?? "46%" }}
      >
        <RxCaretRight />
      </ButtonNext>
      <Slider>{children}</Slider>
    </CarouselProvider>
  );
}
