export default function TextureSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm tracking-widest text-muted-foreground mb-3 uppercase">Our Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-balance">
              Crafted for your skin's unique journey
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Every product in the Nore collection is designed with intention. We source the finest ingredients, blend
              them with expertise, and package them with sustainability in mind.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your skin deserves moments of calm and rituals that nourish both body and mind.
            </p>
          </div>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center text-muted-foreground">
            <img
              src="././page_utilities/2149659570.jpg"
              alt="Skincare texture"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
