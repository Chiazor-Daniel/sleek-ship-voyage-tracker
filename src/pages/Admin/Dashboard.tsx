import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createProduct, updateProduct, deleteProduct, fetchProducts } from '@/services/supabase';

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
const [formData, setFormData] = useState({
  id: '',
  name: '',
  origin: '',
  destination: '',
  ship: '',
  status: '',
  eta: '',
  image: '',
  coordinates: { lat: '' }, // Only keep latitude for current location
});

  useEffect(() => {
    // Check authentication
    if (!localStorage.getItem('adminAuthenticated')) {
      navigate('/admin/login');
    }

    // Fetch products
    fetchProducts().then(({ data }) => {
      setProducts(data || []);
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      setProducts([...products, formData]);
      resetForm();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct, formData);
      setProducts(products.map(product => 
        product.id === editingProduct ? { ...product, ...formData } : product
      ));
      resetForm();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      ...product,
      coordinates: {
        lat: product.coordinates?.lat || 0,
        lng: product.coordinates?.lng || 0
      }
    });
  };


const resetForm = () => {
  setEditingProduct(null);
  setFormData({
    id: '',
    name: '',
    origin: '',
    destination: '',
    ship: '',
    status: '',
    eta: '',
    image: '',
    coordinates: { lat: '' }, // Reset latitude as current location
  });
};

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create/Edit Product</h2>
        <form onSubmit={editingProduct ? handleUpdate : handleCreate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product ID</label>
              <Input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
                disabled={!!editingProduct}
                className="bg-gray-700 text-white"
                placeholder="Enter product ID"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-gray-700 text-white"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Origin</label>
              <Input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                required
                className="bg-gray-700 text-white"
                placeholder="Enter origin location"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Destination & Current location</label>
              <Textarea
              type='text'
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
                className="bg-gray-700 text-white min-h-24"
                placeholder="Enter destination & current location: example_ 'New York, USA\nLos Angeles, USA'"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Ship Name</label>
              <Input
                type="text"
                value={formData.ship}
                onChange={(e) => setFormData({ ...formData, ship: e.target.value })}
                required
                className="bg-gray-700 text-white"
                placeholder="Enter ship name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Input
                type="text"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
                className="bg-gray-700 text-white"
                placeholder="Enter shipment status"
              />
            </div>
                        
            <div>
              <label className="block text-sm font-medium mb-1">ETA</label>
              <Input
                type="date"
                value={formData.eta}
                onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                required
                className="bg-gray-700 text-white"
                placeholder="Select estimated arrival date"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                className="bg-gray-700 text-white"
                placeholder="Enter image URL"
              />
            </div>
  
 
          </div>

          <div className="mt-4 flex space-x-2">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
            {editingProduct && (
              <Button 
                type="button" 
                onClick={resetForm} 
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Products List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.origin} → {product.destination.split('\n')[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;