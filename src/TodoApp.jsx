"use client"

import { useState } from "react"
import { Plus, Check, X, Edit3, Trash2 } from "lucide-react"


export default function TodoApp() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState("")

  const addTask = () => {
    if (!task.trim()) return
    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    }
    setTasks([...tasks, newTask])
    setTask("")
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const startEdit = (id, text) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = () => {
    if (!editingText.trim()) return
    setTasks(tasks.map((t) => (t.id === editingId ? { ...t, text: editingText.trim() } : t)))
    setEditingId(null)
    setEditingText("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit()
    } else if (e.key === "Escape") {
      cancelEdit()
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  return (
    <div className="todo-app">
      <div className="todo-container">
        {/* Header */}
        <div className="todo-header">
          <h1 className="todo-title">My Tasks</h1>
          <p className="todo-subtitle">
            {totalCount === 0 ? "No tasks yet. Add one below!" : `${completedCount} of ${totalCount} tasks completed`}
          </p>
        </div>

        {/* Add Task Form */}
        <div className="add-task-form">
          <div className="add-task-input-group">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="task-input"
              placeholder="What needs to be done?"
            />
            <button onClick={addTask} disabled={!task.trim()} className="add-task-btn">
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p className="empty-title">Your task list is empty</p>
              <p className="empty-subtitle">Add a task above to get started!</p>
            </div>
          ) : (
            tasks.map((t) => (
              <div key={t.id} className={`task-item ${t.completed ? "completed" : ""}`}>
                <div className="task-content">
                  {/* Complete/Undo Button */}
                  <button onClick={() => toggleTask(t.id)} className={`task-checkbox ${t.completed ? "checked" : ""}`}>
                    {t.completed && <Check size={14} />}
                  </button>

                  {/* Task Text or Edit Input */}
                  <div className="task-text-container">
                    {editingId === t.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyPress={handleEditKeyPress}
                        className="task-edit-input"
                        autoFocus
                      />
                    ) : (
                      <span className={`task-text ${t.completed ? "strikethrough" : ""}`}>{t.text}</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="task-actions">
                    {editingId === t.id ? (
                      <>
                        <button onClick={saveEdit} className="action-btn save-btn" title="Save">
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEdit} className="action-btn cancel-btn" title="Cancel">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(t.id, t.text)} className="action-btn edit-btn" title="Edit">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => deleteTask(t.id)} className="action-btn delete-btn" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Progress Summary */}
        {tasks.length > 0 && (
          <div className="progress-summary">
            <div className="progress-header">
              <span>Progress</span>
              <span>
                {completedCount}/{totalCount} completed
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
