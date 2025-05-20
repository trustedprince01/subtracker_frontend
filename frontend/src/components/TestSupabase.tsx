import { supabase } from '../supabase'
import { useEffect, useState } from 'react'

export default function TestSupabase() {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Example of fetching data from Supabase
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('your_table')  // Replace with your actual table name
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setData(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Supabase Test</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
