export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f5]">
      <section className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
            Neo Nexor
          </p>

          <h1 className="text-5xl font-black text-black tracking-[-0.06em] sm:text-7xl">
            Storefront
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/55">
            Modern products. Thoughtful design. Built for everyday life.
          </p>
        </div>
      </section>
    </main>
  );
}