import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import ShopByCategory from "@/components/ShopByCategory";
import WhyNeoNexor from "@/components/WhyNeoNexor";

export default function Home() {
  return (
    <main>
      <Hero/>
      <FeaturedProducts/>
      <ShopByCategory/>
      <WhyNeoNexor/>
      
    </main>
  );
}