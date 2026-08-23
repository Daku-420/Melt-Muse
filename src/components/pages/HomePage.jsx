import React from 'react';
import { Hero } from '../home/Hero';
import { BrandIntro } from '../home/BrandIntro';
import { FeaturedCollection } from '../home/FeaturedCollection';
import { Bestsellers } from '../home/Bestsellers';
import { SensoryExperience } from '../home/SensoryExperience';
import { Craftsmanship } from '../home/Craftsmanship';
import { Testimonials } from '../home/Testimonials';
import { InstagramGrid } from '../home/InstagramGrid';
import { Newsletter } from '../home/Newsletter';

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <BrandIntro />
      <FeaturedCollection />
      <SensoryExperience />
      <Bestsellers />
      <Craftsmanship />
      <Testimonials />
      <InstagramGrid />
      <Newsletter />
    </main>
  );
};
