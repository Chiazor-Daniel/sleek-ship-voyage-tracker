import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin12345') {
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 shadow-xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Welcome back! Please login to continue.
          </CardDescription>
        </CardHeader>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <CardContent className="bg-gray-700 p-8 rounded-lg">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </CardContent>

          <div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white hover:text-white border border-blue-500 hover:border-blue-600">
              Sign in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;