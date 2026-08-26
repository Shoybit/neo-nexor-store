import Link from "next/link";
import products from "../../../../database/products.json";
import ProductContent from "./ProductContent";


export default async function ProductDetails({ params }) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f8f5]">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-black/40">
            Product
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Product not found
          </h1>

          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return <ProductContent product={product} />;
}