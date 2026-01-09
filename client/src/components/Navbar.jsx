import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full top-0 z-50 glass border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 transform group-hover:scale-105 transition-transform duration-200">
                                P
                            </div>
                            <span className="font-bold text-xl text-slate-800 tracking-tight">PrimeTrade</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center gap-2 font-medium transition-colors px-3 py-2 rounded-lg ${isActive('/dashboard')
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Link>
                                <div className="h-6 w-px bg-slate-200"></div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 border border-blue-200">
                                            <User size={14} />
                                        </div>
                                        {user.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-medium transition-colors text-sm"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="group flex items-center gap-1 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 active:scale-95"
                                >
                                    Get Started
                                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-lg hover:bg-slate-100"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {user ? (
                                <>
                                    <div className="px-3 py-4 flex items-center gap-3 border-b border-slate-100 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{user.name}</p>
                                            <p className="text-sm text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                                    >
                                        <LayoutDashboard size={20} />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-3 rounded-xl text-base font-medium text-center text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
