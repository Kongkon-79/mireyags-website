import React from 'react'
import HeroSection from './_components/hero'
import CommittedToScientific from './_components/committed-to-scientific'
import FeatureHighlightsSection from './_components/category'
import FeaturedResearchPeptidesSection from './_components/featured-products'

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <FeatureHighlightsSection/>
      <FeaturedResearchPeptidesSection/>
      <CommittedToScientific/>
    </div>
  )
}

export default HomePage