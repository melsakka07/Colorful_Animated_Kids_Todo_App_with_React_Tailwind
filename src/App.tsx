import { useState, useEffect } from 'react'
import { Plus, Trash2, Star, CheckCircle } from 'lucide-react'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

function TodoItem({ todo, onToggle, onDelete }: { 
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="group relative flex items-center gap-4 p-4 mb-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <button 
        onClick={() => onToggle(todo.id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
          ${todo.completed ? 'bg-green-400' : 'bg-pink-200 hover:bg-pink-300'}`}
      >
        {todo.completed ? (
          <CheckCircle className="w-5 h-5 text-white" />
        ) : (
          <span className="text-2xl">🎯</span>
        )}
      </button>
      <span className={`flex-1 text-xl font-comic ${todo.completed ? 'text-gray-400 line-through' : 'text-purple-600'}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="w-6 h-6" />
      </button>
      <div className="absolute -right-4 opacity-0 group-hover:right-0 group-hover:opacity-100 transition-all duration-300">
        <Star className="w-5 h-5 text-yellow-400 animate-bounce" />
      </div>
    </div>
  )
}

function AddTodo({ onAdd }: { onAdd: (text: string) => void }) {
  const [input, setInput] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input.trim())
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="sticky top-4 z-10 mb-8">
      <div className="flex gap-2 bg-white p-2 rounded-xl shadow-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 50))}
          placeholder="What's your mission .. Yara 😍? 🚀"
          className="flex-1 p-4 text-xl bg-transparent outline-none placeholder:text-pink-300 font-comic"
        />
        <button
          type="submit"
          className="p-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg text-white hover:scale-105 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </form>
  )
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('kidTodos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('kidTodos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    setTodos([{
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date()
    }, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-comic text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Yara's Mission Control 🚀
        </h1>
        
        <AddTodo onAdd={addTodo} />
        
        <div className="relative">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
          
          {todos.length === 0 && (
            <div className="text-center p-8 bg-white rounded-xl animate-pulse">
              <img 
                src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4" 
                alt="No tasks" 
                className="w-48 mx-auto mb-4 rounded-full"
              />
              <p className="text-xl text-gray-500 font-comic">
                All missions accomplished! Time for ice cream! 🍦
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
