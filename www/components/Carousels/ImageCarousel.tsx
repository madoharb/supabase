import { useRouter } from 'next/router'
import { Tabs, Button, IconCornerRightUp, IconArrowUpRight } from '@supabase/ui'
import { useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.min.css'

import ImageCarouselStyles from './ImageCarousel.module.css'
import Link from 'next/link'
import Image from 'next/image'
import TextLink from '../TextLink'

interface Content {
  title: string
  label?: string
  img_url?: string
  video_url?: string
  text?: string
  cta?: string
  url?: string
}

interface ImageCarouselProps {
  content: Content[]
  footer?: React.ReactNode
  altTabView?: boolean
}

function ImageCarousel(props: ImageCarouselProps) {
  // base path for images
  const { basePath } = useRouter()

  // store API swiper instance
  const [imageSwiper, setImageSwiper] = useState(undefined)
  const [swiperDetails, setSwiperDetails] = useState(undefined)

  const [imageSwiperActiveIndex, setImageSwiperActiveIndex] = useState(0)

  function handleImageSwiperNav(e: number) {
    setImageSwiperActiveIndex(e)
    // @ts-ignore
    imageSwiper.slideTo(e)
    // @ts-ignore
    swiperDetails.slideTo(e)
  }

  const details = (
    <div className="h-64 bg-white">
      <p>
        <span className="block text-white mb-8">Allow fetch something</span>
      </p>
      <p>
        <p>
          This would only allow the authenticated user access to a folder that is named after their
          own account UID. This is useful for things like profile images.
        </p>
      </p>
      <p>
        <Button type="outline" size="small" icon={<IconCornerRightUp />}>
          View documentation
        </Button>
      </p>
    </div>
  )

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-6 w-full">
        <div className="col-span-12 lg:col-span-7 sbui-tabs--alt">
          <div className={props.altTabView ? 'hidden' : 'block'}>
            <Tabs
              scrollable
              type={props.altTabView ? 'underlined' : 'pills'}
              // @ts-ignore
              activeId={imageSwiperActiveIndex.toString()}
              // @ts-ignore
              onChange={(id: string) => handleImageSwiperNav(Number(id))}
            >
              {props.content.map((content: Content, i) => {
                return (
                  <Tabs.Panel
                    key={i}
                    label={content.label ? content.label : content.title}
                    id={i.toString()}
                  >
                    <span></span>
                  </Tabs.Panel>
                )
              })}
            </Tabs>
          </div>
          <div
            className={`overflow-hidden border border-gray-100 dark:border-gray-600 rounded-md bg-gray-800 ${ImageCarouselStyles['gradient-bg']}`}
          >
            <Swiper
              // @ts-ignore
              onSwiper={setImageSwiper}
              style={{ zIndex: 0, overflow: 'auto', overflowX: 'hidden' }}
              initialSlide={0}
              spaceBetween={0}
              slidesPerView={1}
              speed={300}
              allowTouchMove={false}
            >
              {props.content.map((content: Content, i: number) => {
                return (
                  <SwiperSlide key={i}>
                    {content.img_url && (
                      <Image
                        src={`${basePath}${content.img_url}`}
                        layout="responsive"
                        width="1460"
                        height="960"
                      />
                    )}
                    {content.video_url && (
                      <video
                        src={`${basePath}/${content.video_url}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        Your browser does not support the video tag
                      </video>
                    )}
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 col-span-12 lg:col-span-5 lg:col-start-8 xl:col-span-5 xl:col-start-8">
        <div className={`sbui-tabs--underline-alt ${props.altTabView ? 'block' : 'hidden'} mb-3`}>
          <Tabs
            scrollable
            type="underlined"
            size="small"
            activeId={imageSwiperActiveIndex.toString()}
            onChange={(id: string) => handleImageSwiperNav(Number(id))}
          >
            {props.content.map((content: Content, i: number) => {
              return (
                <Tabs.Panel
                  label={content.label ? content.label : content.title}
                  id={i.toString()}
                  key={i}
                />
              )
            })}
          </Tabs>
        </div>
        <Swiper
          // @ts-ignore
          onSwiper={setSwiperDetails}
          initialSlide={0}
          speed={300}
          allowTouchMove={false}
          autoHeight={true}
        >
          {props.content.map((content, i) => {
            return (
              <SwiperSlide key={i} className="py-4">
                <h4 className="text-xl text-scale-1200 mb-4">{content.title}</h4>
                <p className="p text-base">{content.text}</p>
                <TextLink
                  label={content.cta ? content.cta : 'View documentation'}
                  url={content.url}
                />
              </SwiperSlide>
            )
          })}
          {props.footer && <div className="my-8">{props.footer}</div>}
        </Swiper>
      </div>
    </div>
  )
}

export default ImageCarousel
