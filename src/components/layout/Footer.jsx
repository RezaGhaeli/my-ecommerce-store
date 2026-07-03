import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-white">ShopFlow</span>
            </div>
            <p className="text-sm leading-relaxed">
              Modern e-commerce for modern shoppers. Quality products, fast shipping, easy returns.
            </p>
          </div>

          {[
            { title: 'Shop', links: ['All Products', 'Electronics', 'Clothing', 'Home', 'Sports'] },
            { title: 'Support', links: ['FAQ', 'Shipping Info', 'Returns', 'Track Order'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <Link to="/" className="text-sm hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <p>© 2026 ShopFlow, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
