// populate.ts
import { createProduct } from "./supabase"

const dummyProducts = [
  {
    id: 'PRD001',
    name: 'Premium Coffee Beans',
    origin: 'Colombia',
    destination: 'New York',
    ship: 'SS Maritime Explorer',
    status: 'In Transit',
    eta: new Date('2025-04-20T00:00:00Z'), // Convert to Date object
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&auto=format',
    coordinates: { lat: 25.7617, lng: -80.1918 }
  },
  {
    id: 'PRD002',
    name: 'Scandinavian Furniture',
    origin: 'Sweden',
    destination: 'Los Angeles',
    ship: 'MV Nordic Star',
    status: 'Loading',
    eta: new Date('2025-04-25T00:00:00Z'), // Convert to Date object
    image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&auto=format',
    coordinates: { lat: 57.7089, lng: 11.9746 }
  },
  {
    id: 'PRD003',
    name: 'Organic Tea Collection',
    origin: 'India',
    destination: 'London',
    ship: 'SS Ocean Voyager',
    status: 'Departed',
    eta: new Date('2025-04-18T00:00:00Z'), // Convert to Date object
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&auto=format',
    coordinates: { lat: 19.076, lng: 72.8777 }
  }
]

export const populateDummyData = async () => {
  for (const product of dummyProducts) {
    const { error } = await createProduct(product)
    if (error) {
      console.error(`❌ Failed to add ${product.id}:`, error) // Log the entire error object
    } else {
      console.log(`✅ Added ${product.id} successfully`)
    }
  }
}