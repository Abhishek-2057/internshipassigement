import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import api from '../api/axios';
import { Search, ListFilter, CheckCircle2, CircleDashed, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-lg transition-shadow"
    >
        <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`p-4 rounded-xl ${colorClass} group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.get('/tasks');
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const handleTaskUpdate = (updatedTask) => {
        setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    };

    const handleTaskDelete = (id) => {
        setTasks(tasks.filter((t) => t._id !== id));
    };

    const filteredTasks = tasks
        .filter((task) => {
            if (filter === 'all') return true;
            return task.status === filter;
        })
        .filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'pending').length
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-bold text-slate-900"
                        >
                            Dashboard
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 mt-1"
                        >
                            Welcome back, {user?.name}. Here's your overview.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100"
                    >
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Tasks"
                        value={stats.total}
                        icon={List}
                        colorClass="bg-blue-50 text-blue-600"
                        delay={0.1}
                    />
                    <StatCard
                        title="Pending"
                        value={stats.pending}
                        icon={CircleDashed}
                        colorClass="bg-orange-50 text-orange-600"
                        delay={0.2}
                    />
                    <StatCard
                        title="Completed"
                        value={stats.completed}
                        icon={CheckCircle2}
                        colorClass="bg-green-50 text-green-600"
                        delay={0.3}
                    />
                </div>

                {/* Action Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search your tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none focus:ring-0 placeholder:text-slate-400 text-slate-900"
                        />
                    </div>
                    <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
                    <div className="flex w-full md:w-auto p-1 bg-slate-100 rounded-xl">
                        {['all', 'pending', 'completed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${filter === f
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Task Form & List */}
                <div className="space-y-6">
                    <TaskForm onTaskAdded={handleTaskAdded} />

                    <div className="space-y-4 min-h-[300px]">
                        <AnimatePresence mode='popLayout'>
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
                                    <p>Loading tasks...</p>
                                </div>
                            ) : filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                    <TaskItem
                                        key={task._id}
                                        task={task}
                                        onUpdate={handleTaskUpdate}
                                        onDelete={handleTaskDelete}
                                    />
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300"
                                >
                                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                        <ListFilter size={32} />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900">No tasks found</h3>
                                    <p className="text-slate-500 mt-1">
                                        {searchQuery ? "Try adjusting your search terms" : "Get started by creating a new task above"}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
