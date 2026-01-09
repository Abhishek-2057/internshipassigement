import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';
import { Input, Button, Card } from '../components/UI';
import { motion } from 'framer-motion';

import { toast } from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await register(formData);
            toast.success('Registration successful! Welcome aboard.');
            navigate('/dashboard');
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-16 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50/50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block p-3 rounded-2xl bg-indigo-100/50 text-indigo-600 mb-4"
                >
                    <User size={32} />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-extrabold text-slate-900"
                >
                    Create an account
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-2 text-slate-500"
                >
                    Start your journey with PrimeTrade
                </motion.p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="py-8 px-4 sm:px-10 glass">
                    <form className="space-y-6" onSubmit={onSubmit}>


                        <Input
                            label="Full Name"
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={onChange}
                        />

                        <Input
                            label="Email address"
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={onChange}
                        />

                        <Input
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={onChange}
                        />

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full bg-slate-900 hover:bg-slate-800 shadow-slate-900/20"
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-slate-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1">
                            <Link
                                to="/login"
                                className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                Sign in here
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Register;
