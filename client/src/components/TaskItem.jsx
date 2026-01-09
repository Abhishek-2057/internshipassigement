import { useState } from 'react';
import { Trash2, Edit2, CheckCircle, Circle, Clock, Save, X } from 'lucide-react';
import api from '../api/axios';
import { motion } from 'framer-motion';

const TaskItem = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDesc, setEditedDesc] = useState(task.description);

    const handleStatusToggle = async () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        try {
            const { data } = await api.put(`/tasks/${task._id}`, { ...task, status: newStatus });
            onUpdate(data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const { data } = await api.put(`/tasks/${task._id}`, {
                title: editedTitle,
                description: editedDesc,
            });
            onUpdate(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${task._id}`);
                onDelete(task._id);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group bg-white rounded-2xl shadow-sm border p-1 transition-all hover:shadow-md ${task.status === 'completed' ? 'border-slate-100 bg-slate-50/50' : 'border-slate-200'
                }`}
        >
            <div className="p-4 sm:p-5">
                {isEditing ? (
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-200 bg-blue-50/30 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium"
                            autoFocus
                        />
                        <textarea
                            value={editedDesc}
                            onChange={(e) => setEditedDesc(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-200 bg-blue-50/30 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none text-sm"
                            rows="2"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1"
                            >
                                <X size={16} /> Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start gap-4">
                        <button
                            onClick={handleStatusToggle}
                            className={`mt-0.5 flex-shrink-0 transition-all duration-300 ${task.status === 'completed'
                                    ? 'text-green-500 scale-110'
                                    : 'text-slate-300 hover:text-blue-500 hover:scale-110'
                                }`}
                        >
                            {task.status === 'completed' ? (
                                <CheckCircle className="h-6 w-6" />
                            ) : (
                                <Circle className="h-6 w-6" />
                            )}
                        </button>

                        <div className="flex-1 min-w-0 pt-0.5">
                            <h3 className={`text-lg font-semibold text-slate-900 truncate transition-all ${task.status === 'completed' ? 'line-through text-slate-400' : ''
                                }`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className={`mt-1 text-slate-600 text-sm line-clamp-2 ${task.status === 'completed' ? 'text-slate-400' : ''
                                    }`}>
                                    {task.description}
                                </p>
                            )}
                            <div className="mt-3 flex items-center gap-4 text-xs font-medium text-slate-400">
                                <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                                    <Clock size={12} />
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-200">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit Task"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Task"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default TaskItem;
