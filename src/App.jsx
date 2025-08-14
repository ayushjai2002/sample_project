import { useEffect, useState } from 'react'
import ProductList from './components/ProductList.jsx'
import AddProductForm from './components/AddProductForm.jsx'
import ContactForm from './components/ContactForm.jsx'
import { getProducts } from './api.js'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <>
      <header>
        <strong>My Products & Queries</strong>
      </header>
      <div className="container">
        <div className="grid">
          <div className="card">
            <h2>Product Catalog</h2>
            {loading ? <p>Loading products...</p> : error ? <p className="alert error">{error}</p> : <ProductList products={products} />}
            <hr style={{ margin: '14px 0', opacity:.2 }} />
            <h3 style={{ marginTop: 0 }}>Add a Product</h3>
            <AddProductForm onAdded={load} />
          </div>

          <div className="card">
            <h2>Ask a Question</h2>
            <ContactForm />
          </div>
        </div>

        <footer>
          Built with React + Node.js. Store products locally on the server (JSON file) and receive customer queries by email.
        </footer>
      </div>
    </>
  )
}
