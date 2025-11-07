export default function BenefitsSection() {
  const benefits = [
    {
      title: "Ritual Focused",
      description: "Thoughtfully designed for your morning and evening routines",
      icon: "✨",
    },
    {
      title: "Clean Ingredients",
      description: "Free from harsh chemicals and unnecessary additives",
      icon: "🌿",
    },
    {
      title: "Dermatologist Tested",
      description: "Formulated with professional dermatologists",
      icon: "✓",
    },
    {
      title: "Sustainable Packaging",
      description: "Recyclable and eco-conscious materials",
      icon: "♻️",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-balance">Why Nore</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe skincare is more than a routine, it's a ritual of self-care and mindfulness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-background rounded-lg p-8 border border-border hover:border-accent transition-colors"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-light mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
