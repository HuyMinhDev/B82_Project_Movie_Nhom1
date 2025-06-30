import AppPromoSection from "@/components/layouts/home-layout/AppPromoSection";
import CarouselMovie from "@/components/layouts/home-layout/CarouselMovie";
import ListMovie from "@/components/layouts/home-layout/ListMovie";
import PartnerCarousel from "@/components/layouts/home-layout/Our-Patner";
import TabMovie from "@/components/layouts/home-layout/TabMovie";
import React from "react";

export default function HomePage() {
  return (
    <div className="pt-[70px]">
      <CarouselMovie />
      <ListMovie />
      <TabMovie />
      <PartnerCarousel />
      <AppPromoSection />
    </div>
  );
}
