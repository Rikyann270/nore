export default function TrustSection() {
  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="bg-background rounded-lg border border-border p-12 md:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm tracking-widest text-muted-foreground mb-4 uppercase">Trusted by thousands</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6 text-balance">
              Join our ritual community
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Over 10,000 people have made Nore part of their daily skincare ritual. Experience the difference of
              intentional, clean skincare.
            </p>
            <div className="flex gap-8 justify-center flex-wrap">
              <div>
                <p className="text-3xl font-light text-primary">4.9/5</p>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
              <div>
                <p className="text-3xl font-light text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Would Recommend</p>
              </div>
              <div>
                <p className="text-3xl font-light text-primary">10k+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
