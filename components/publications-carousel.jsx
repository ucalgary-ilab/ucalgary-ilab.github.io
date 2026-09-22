import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import Link from 'next/link'
import ContributionCard from './contribution-card'
import { getContributions, getPeople, getPhotos, getCovers, getPhoto } from './contributions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PublicationsCarousel({ limit=5 }) {
  const plural = 'publications'

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, containScroll: false }, [
    Fade(),
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  ])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const scrollToRecent = useCallback((e) => {
    e.preventDefault()
    const target = document.getElementById(plural)
    if (!target) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [plural])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      emblaApi.plugins().autoplay.stop()
    }
  }, [emblaApi])

  let contributions = getContributions(plural).slice(0, limit)
  if (contributions.length === 0) return null

  let { names, namesId } = getPeople()
  let pictures = getPhotos()
  let covers = getCovers(plural)

  return (
    <div className="publications-carousel">
      <div className="publications-carousel-viewport" ref={emblaRef}>
        <div className="publications-carousel-container">
          { contributions.map((contribution, i) => (
            <div className="publications-carousel-slide" key={i}>
              <ContributionCard
                type="publication"
                plural={plural}
                contribution={contribution}
                i={i}
                covers={covers}
                names={names}
                namesId={namesId}
                pictures={pictures}
                getPhoto={getPhoto}
              />
            </div>
          )) }
        </div>
      </div>
      <div className="publications-carousel-controls">
        <button
          type="button"
          className="publications-carousel-nav publications-carousel-prev"
          aria-label="Previous publication"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <FontAwesomeIcon icon="fas fa-chevron-left" />
        </button>
        <div className="publications-carousel-dots">
          { contributions.map((contribution, i) => (
            <button
              type="button"
              key={i}
              className={ `publications-carousel-dot${ i === selectedIndex ? ' active' : '' }` }
              aria-label={ `Go to publication ${ i + 1 }` }
              aria-current={ i === selectedIndex }
              onClick={ () => scrollTo(i) }
            />
          )) }
        </div>
        <button
          type="button"
          className="publications-carousel-nav publications-carousel-next"
          aria-label="Next publication"
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <FontAwesomeIcon icon="fas fa-chevron-right" />
        </button>
        <Link
          href={`#${plural}`}
          className="publications-carousel-more"
          onClick={scrollToRecent}
        >
          See more projects!
        </Link>
      </div>
    </div>
  )
}
