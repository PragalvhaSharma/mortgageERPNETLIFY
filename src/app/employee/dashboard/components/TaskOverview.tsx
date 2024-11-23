'use client'

import { useState, useEffect } from 'react'
import { FiClock, FiCheckCircle, FiAlertCircle, FiFileText, FiFilter, FiChevronDown } from 'react-icons/fi'

interface Note {
  id: string
  content: string
  timestamp: Date
  taskId: string
}

interface Task {
  id: string
  title: string
  deadline: Date
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'completed'
  completedAt?: Date
  notes: Note[]
  description?: string
}

export default function TaskOverview() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Loan Application #12345',
      deadline: new Date('2024-03-20'),
      priority: 'high',
      status: 'pending',
      notes: [],
      description: 'Detailed review of loan application including credit check and income verification.'
    },
    {
      id: '2',
      title: 'Process Property Appraisal #789',
      deadline: new Date('2024-03-25'),
      priority: 'medium',
      status: 'pending',
      notes: [],
      description: 'Schedule and review property appraisal for loan application #789.'
    },
    // Add more sample tasks as needed
  ])

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'deadline' | 'priority' | 'status'>('deadline')

  // Task Management Functions
  const markComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { 
        ...task, 
        status: 'completed',
        completedAt: new Date()
      } : task
    ))
  }

  const addNote = (taskId: string, noteContent: string) => {
    const newNoteObj: Note = {
      id: Date.now().toString(),
      content: noteContent,
      timestamp: new Date(),
      taskId
    }

    setTasks(tasks.map(task =>
      task.id === taskId ? {
        ...task,
        notes: [...task.notes, newNoteObj]
      } : task
    ))
    setNewNote('')
  }

  // Filtering and Sorting Functions
  const filteredTasks = tasks.filter(task => {
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority
    const statusMatch = filterStatus === 'all' || task.status === filterStatus
    return priorityMatch && statusMatch
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return a.deadline.getTime() - b.deadline.getTime()
      case 'priority': {
        const priorityWeight = { high: 3, medium: 2, low: 1 }
        return priorityWeight[b.priority] - priorityWeight[a.priority]
      }
      case 'status':
        return a.status === 'pending' ? -1 : 1
      default:
        return 0
    }
  })

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Task Overview</h2>
          
          {/* Progress Summary */}
          <div className="flex items-center space-x-4 bg-blue-50 px-4 py-2 rounded-lg">
            <div className="text-sm">
              <span className="text-blue-600 font-semibold">
                {tasks.filter(t => t.status === 'completed').length}
              </span>
              <span className="text-gray-600">/{tasks.length} Completed</span>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(tasks.filter(t => t.status === 'completed').length / tasks.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
          <FiFilter className="text-gray-400" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="text-sm bg-white border-gray-200 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="text-sm bg-white border-gray-200 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm bg-white border-gray-200 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {sortedTasks.map(task => (
          <div 
            key={task.id}
            className="group flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className={`mt-1 p-2 rounded-full ${task.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`}>
                {task.status === 'completed' ? (
                  <FiCheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <FiClock className="w-5 h-5 text-blue-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityStyles(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mt-1 mb-3">{task.description}</p>
                
                <div className="flex items-center space-x-6">
                  <span className="text-sm text-gray-500 flex items-center">
                    <FiAlertCircle className="w-4 h-4 mr-2 text-gray-400" />
                    Due {task.deadline.toLocaleDateString()}
                  </span>
                  {task.notes.length > 0 && (
                    <span className="text-sm text-gray-500 flex items-center">
                      <FiFileText className="w-4 h-4 mr-2 text-gray-400" />
                      {task.notes.length} notes
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {task.status === 'pending' && (
                <button
                  onClick={() => markComplete(task.id)}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                >
                  <FiCheckCircle className="w-4 h-4 mr-2" />
                  Complete
                </button>
              )}
              <button 
                onClick={() => {
                  setSelectedTask(task)
                  setIsNoteModalOpen(true)
                }}
                className="px-4 py-2 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center"
              >
                <FiFileText className="w-4 h-4 mr-2" />
                Notes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Notes for {selectedTask?.title}
              </h3>
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>
            
            <div className="max-h-80 overflow-y-auto mb-6 space-y-3">
              {selectedTask?.notes.map(note => (
                <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <span className="text-xs text-gray-500">
                    {note.timestamp.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg resize-none h-32 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a new note..."
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedTask && newNote.trim()) {
                      addNote(selectedTask.id, newNote.trim())
                      setIsNoteModalOpen(false)
                    }
                  }}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Updated utility function for priority styles
const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700'
    case 'medium': return 'bg-yellow-100 text-yellow-700'
    case 'low': return 'bg-green-100 text-green-700'
    default: return 'bg-gray-100 text-gray-700'
  }
} 