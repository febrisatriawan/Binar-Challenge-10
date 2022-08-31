import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
//IMPORT REACTSTRAP COMPONENTS
import { Button } from "react-bootstrap";

const items = [
  {
    src: "/cyber.jpg",
    key: 1,
  },
  {
    src: "/gta.jpg",
    key: 2,
  },
  {
    src: "/wd.png",
    key: 3,
  },
];

function CarouselSection(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
        <Image src={item.src} alt={item.altText} width="1080" height="460" layout="responsive" />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });
  return (
    <>
      <div className="container-fluid bg-light ptb">
        <div className="row px-4">
          <div className="col-5 px-5 hero-desc">
            <h1>
              TEAM <span>ONE</span> PRODUCTION
            </h1>
            <hr />
            <p>Are you ready for the unique game all the world ? prepare yourself and play the game</p>
            <Link href="/register">
              <Button color="danger">REGISTER NOW !</Button>
            </Link>
          </div>
          <div className="col-md-7">
            <Carousel activeIndex={activeIndex} next={next} previous={previous} {...args}>
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarouselSection;
