import { TrashIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/utils/format'

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCartStore()

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2.5 py-1 hover:bg-gray-100 transition-colors text-sm font-medium cursor-pointer"
            >−</button>
            <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2.5 py-1 hover:bg-gray-100 transition-colors text-sm font-medium cursor-pointer"
            >+</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Remove item"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
