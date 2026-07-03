import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xs tracking-tight">SF</span>
              </div>
              <span className="font-semibold text-[15px] text-white tracking-tight">ShopFlow</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-[200px]">
              Quality products, fast shipping, easy returns.
            </p>
          </div>

          {[
            { title: 'Shop', links: ['All Products', 'Electronics', 'Clothing', 'Home', 'Sports'] },
            { title: 'Support', links: ['FAQ', 'Shipping Info', 'Returns', 'Track Order'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <Link to="/" className="text-sm text-gray-500 hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-xs text-gray-600">
          <p>© 2026 ShopFlow, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-gray-400 transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
