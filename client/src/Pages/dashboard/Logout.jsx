import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { LogOut } from 'lucide-react'

export default function Logout() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/signin")
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 flex flex-col items-center gap-5 max-w-sm w-full">
        
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <LogOut className="w-8 h-8 text-red-500" />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Logging Out</h2>
          <p className="text-gray-500 text-sm">Are you sure you want to log out of your account?</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition-all"
          >
            Yes, Log me out
          </button>
          <button
            onClick={handleCancel}
            className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}