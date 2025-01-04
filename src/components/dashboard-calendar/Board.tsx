'use client'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskColumn from '@/components/dashboard-calendar/tasks/task-column/TaskColumn'
import AddTaskForm from '@/components/dashboard-calendar/AddTaskForm/AddTaskForm'
import Calendar from '@/components/dashboard-calendar/Calendar/Calendar'
import EditTaskModal from '@/components/dashboard-calendar/tasks/EditTaskModal'

import { useTaskManager } from '@/hooks/useTaskManager'
import { useTaskModal } from '@/hooks/useTaskModal'
import { Task } from '@/types/task'
import { columns } from '@/data/columns'

const Board: React.FC = () => {
  const { tasks, addTask, deleteTask, moveTask, updateTask } = useTaskManager()
  const { isModalOpen, taskToEdit, openModal, closeModal } = useTaskModal()

  const handleSaveTask = (updatedTask: Task) => {
    updateTask(updatedTask)
    closeModal()
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col p-5 rounded-lg shadow-lg antialiased bg-slate-700/20 w-full max-w-6xl mx-auto">
        <div className="flex flex-row space-x-4 mb-6">
          <AddTaskForm onAddTask={addTask} />
          <Calendar tasks={tasks} />
        </div>
        <div className="flex space-x-4 w-full">
          {columns.map((column) => (
            <TaskColumn
              key={column}
              column={column}
              tasks={tasks.filter((task) => task.columnId === column)}
              onMoveTask={moveTask}
              onDeleteTask={deleteTask}
              onEditTask={openModal}
            />
          ))}
        </div>
        <EditTaskModal
          task={taskToEdit}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveTask}
        />
      </div>
    </DndProvider>
  )
}

export default Board

