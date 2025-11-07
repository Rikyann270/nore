export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-light mb-4">Shop</h3>
            <ul className="space-y-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
              <li>
                <a href="#">All Products</a>
              </li>
              <li>
                <a href="#">Serums</a>
              </li>
              <li>
                <a href="#">Moisturizers</a>
              </li>
              <li>
                <a href="#">Cleansers</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light mb-4">Company</h3>
            <ul className="space-y-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light mb-4">Support</h3>
            <ul className="space-y-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Track Order</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light mb-4">Legal</h3>
            <ul className="space-y-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
              <li>
                <a href="#">Accessibility</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-[500%] text-center text-[#ed9574]/30  font-serif font-light">Noré</p>
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>&copy; 2025 Nore. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
