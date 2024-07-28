import { EffectCoverflow, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import DetailButton from './detailButton';

type Props = {
  similarServices: any
}

/**
 * スライダーコンポーネント
 * @param components 
 * @returns 
 */
export default function SimilarServicesSwiper({
  similarServices
}: Props) {

  //TODO データが3件の場合、画面初期表示時左側のみカードが表示されない
  const loop: boolean = Array.isArray(similarServices) && 2 < similarServices.length;

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={loop}
      slidesPerView={2}
      initialSlide={1}
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
      modules={[EffectFade, EffectCoverflow, Pagination, Navigation]}

      className="mySwiper"
    >
      {
        similarServices.map((similarService: any, index: number) => {

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

                <div className="px-6">
                  {
                    Array.isArray(similarService.tags) && similarService.tags.map((tag: any, index: number) => {
                      return (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          #{tag.tagName}
                        </span>
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