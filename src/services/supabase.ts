// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hjkltyfxcfqztitgflmt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqa2x0eWZ4Y2ZxenRpdGdmbG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxOTQ0MTQsImV4cCI6MjA2MDc3MDQxNH0.L7sB0JkBR7TC7YL7yFsQ5qO9PhtJW58BVQwzZFnh0AU'

export const supabase = createClient(supabaseUrl, supabaseKey)

// CREATE
export const createProduct = async (product) => {
  return await supabase.from('products').insert([product])
}

// READ
export const fetchProducts = async () => {
  return await supabase.from('products').select('*')
}

// UPDATE
export const updateProduct = async (id, updates) => {
  return await supabase.from('products').update(updates).eq('id', id)
}

// DELETE
export const deleteProduct = async (id) => {
  return await supabase.from('products').delete().eq('id', id)
}
