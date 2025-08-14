import { useState } from 'react'
import { addProduct } from '../api.js'

export default function AddProductForm({ onAdded }) {
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' })
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  function update(k, v) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: '', msg: '' })

    if (!form.name.trim() || !form.price) {
      setStatus({ type: 'error', msg: 'Name and price are required.' })
      return
    }

    setLoading(true)
    try {
      await addProduct({ ...form, price: Number(form.price) })
      setForm({ name: '', price: '', description: '', imageUrl: '' })
      setStatus({ type: 'success', msg: 'Product added.' })
      onAdded?.()
    } catch (err) {
      setStatus({ type: 'error', msg: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Product name *"
        value={form.name}
        onChange={e => update('name', e.target.value)}
      />
      <input
        placeholder="Price *"
        type="number"
        value={form.price}
        onChange={e => update('price', e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={e => update('imageUrl', e.target.value)}
      />
      <textarea
        placeholder="Description"
        rows="3"
        value={form.description}
        onChange={e => update('description', e.target.value)}
      />
      <button className="btn-primary" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
      {status.msg && (
        <div className={`alert ${status.type === 'success' ? 'success' : 'error'}`}>
          {status.msg}
        </div>
      )}
    </form>
  )
}
