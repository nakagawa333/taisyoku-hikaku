import { A11y, EffectCoverflow, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SimilarServicesResponse } from '@/constants/api/response/similarServicesResponse';
import { memo } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Manipulation } from "swiper/modules";
import DetailButton from './detailButton';
import { Tag } from './tag';

type Props = {
  similarServices: any
}

//スライダーコンポーネント
function SimilarServicesSwiper({
  similarServices
}: Props) {

  //TODO データが3件の場合、画面初期表示時左側のみカードが表示されない
  const loop: boolean = Array.isArray(similarServices) && 2 < similarServices.length;

  //初期スライド位置
  const initialSlide: number = similarServices.length === 0 ? 0 : similarServices.length - 1;

  //スライドの数
  const slidesPerView: number = similarServices.length === 0 ? 0 : 2;

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={loop}
      slidesPerView={slidesPerView}
      initialSlide={initialSlide}
      coverflowEffect={{
        rotate: 0,
        stretch: 80,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      }}
      scrollbar={{ draggable: true }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={true}
      modules={[EffectFade, EffectCoverflow, Pagination, Navigation, Navigation, Pagination, Scrollbar, A11y, Manipulation]}
      className="mySwiper"
    >
      {
        similarServices.map((similarService: SimilarServicesResponse, index: number) => {

          return (
            <SwiperSlide
              key={index}
            >
              <div
                className="bg-white m-auto mt-7 rounded overflow-hidden shadow-lg mb-20"
              >
                {
                  similarService.imgUrl && (
                    <img
                      className="w-full"
                      src={similarService.imgUrl}
                      alt="image"
                    />
                  )
                }
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {similarService.similarServiceName}
                  </div>
                </div>

                <div className="px-6 flex flex-wrap">
                  {
                    Array.isArray(similarService.tags) && similarService.tags.map((tag: any, index: number) => {
                      return (
                        <Tag
                          key={index}
                          tagName={tag.tagName}
                        />
                      )
                    })
                  }
                </div>

                <DetailButton
                  serviceId={similarService.similarServiceId}
                />

              </div>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  );
}

export default memo(SimilarServicesSwiper);