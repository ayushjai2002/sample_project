import { useState } from 'react'
import { sendQuery } from '../api.js'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  function update(k, v) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: '', msg: '' })

    if (
      !form.name.trim() ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ||
      !form.message.trim()
    ) {
      setStatus({
        type: 'error',
        msg: 'Please fill name, valid email, and your message.'
      })
      return
    }

    setLoading(true)
    try {
      await sendQuery(form)
      setForm({ name: '', email: '', message: '' })
      setStatus({
        type: 'success',
        msg: 'Sent! I will reply by email soon.'
      })
    } catch (err) {
      setStatus({ type: 'error', msg: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Your name *"
        value={form.name}
        onChange={e => update('name', e.target.value)}
      />
      <input
        placeholder="Your email *"
        value={form.email}
        onChange={e => update('email', e.target.value)}
      />
      <textarea
        placeholder="Write your question here *"
        rows="5"
        value={form.message}
        onChange={e => update('message', e.target.value)}
      />
      <button className="btn-primary" disabled={loading}>
        {loading ? 'Sending...' : 'Send Query'}
      </button>

      {status.msg && (
        <div className={`alert ${status.type === 'success' ? 'success' : 'error'}`}>
          {status.msg}
        </div>
      )}

      <small className="help">We’ll send this to the owner by email.</small>
    </form>
  )
}
