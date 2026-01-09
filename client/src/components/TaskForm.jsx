import { useState } from 'react';
import { Plus, Loader2, Send } from 'lucide-react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';

const TaskForm = ({ onTaskAdded }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setIsLoading(true);
        try {
            const { data } = await api.post('/tasks', formData);
            onTaskAdded(data);
            setFormData({ title: '', description: '' });
            setIsExpanded(false);
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md">
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="group flex items-center gap-4 w-full p-4 text-left transition-colors hover:bg-slate-50"
                >
                    <div className="bg-blue-50 p-2 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                    </div>
                    <div className="flex-1">
                        <span className="text-lg font-medium text-slate-600 group-hover:text-blue-600 transition-colors">Create a new task...</span>
                    </div>
                </button>
            ) : (
                <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={onSubmit}
                    className="p-6 space-y-4"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                            <Plus size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">New Task</h3>
                    </div>

                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 text-lg font-medium bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                        autoFocus
                    />
                    <textarea
                        placeholder="Add a description (optional)"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none transition-all placeholder:text-slate-400"
                        rows="3"
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !formData.title.trim()}
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-50 transition-colors shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : (
                                <>
                                    Create Task <Send size={16} />
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            )}
        </div>
    );
};

export default TaskForm;
