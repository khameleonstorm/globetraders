import s from './Testimonials.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Autoplay } from "swiper";
import { useEffect, useState } from 'react';
import { ReactComponent as Quote } from '../../assets/quote.svg';

export default function Testimonials({ data }) {
  const [slidesPerView, setSlidesPerView] = useState(0.96);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 600) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(0.99);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className={s.ctn}>
      <h1 className='title'>Testimonials</h1>
      <Swiper
        slidesPerView={slidesPerView}
        freeMode={true}
        modules={[FreeMode, Autoplay]}
        className={s.wrp}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >

          {data.map((doc, i) => 
          <SwiperSlide className={s.slide} key={i}>
            <div className={s.avatar}>
              <img src={`https://robohash.org/${doc.id}`} alt='avatar'/>
              <p className={s.name}>{doc.name}</p>
            </div>

            <p>{doc.message}</p>
            <Quote className={s.quote} width={60} height={60} />
          </SwiperSlide> 
          )}
      </Swiper>
    </div>
  )
}
