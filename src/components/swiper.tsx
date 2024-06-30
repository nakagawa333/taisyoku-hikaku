import { useRef } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import DetailButton from './DetailButton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Props = {
  similarServices:any
}

/**
 * スライダーコンポーネント
 * @param components 
 * @returns 
 */
export default function SimilarServicesSwiper(props:Props){

  return (
            <Swiper
              navigation={true}
              slidesPerView={"auto"}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              freeMode={true}
              centeredSlides={true}
              modules={[Pagination,Navigation]}
              className="mySwiper"
          >
          {
            props.similarServices.map((similarService:any,index:number) => {

              return(

                <SwiperSlide>
                  <div 
                    className="m-auto	mt-7 rounded overflow-hidden shadow-lg max-w-xs mb-20" 
                    key={index}
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
                              <p className="text-gray-700 text-base">

                              </p>
                      </div>

                      <div className="px-6">
                          {
                              Array.isArray(similarService.tags) && similarService.tags.map((tag:any) => {
                                  return (
                                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
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