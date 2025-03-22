import { motion, AnimatePresence } from "framer-motion"


export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "Confirm Action",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-red-600 hover:bg-red-700",
}) {
  if (!isOpen) return null


return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                {cancelText}
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className={`px-4 py-2 text-white rounded-md transition-colors ${confirmButtonClass}`}
              >
                {confirmText}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

