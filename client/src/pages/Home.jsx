import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen pt-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-12">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                            Organize your work, <br />
                            <span className="text-blue-600">simplify your life.</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                            A straightforward task management tool designed for clarity and focus. No clutter, just productivity.
                        </p>

                        <div className="space-y-4">
                            {['Secure user authentication', 'Real-time task updates', 'Clean and simple dashboard'].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500" size={20} />
                                    <span className="text-slate-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                            >
                                Get Started
                                <ArrowRight className="ml-2" size={18} />
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Simple Visual */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-xl">
                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm">
                            <div className="space-y-4">
                                <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse"></div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm opacity-75">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm opacity-50">
                                        <div className="w-5 h-5 rounded-full border-2 border-green-500 bg-green-500 text-white flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <div className="h-2 w-1/2 bg-slate-100 rounded line-through"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;
