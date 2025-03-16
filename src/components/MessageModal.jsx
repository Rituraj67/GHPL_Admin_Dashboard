import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Paperclip,
  User,
  Mail,
  Calendar,
  Tag,
  Phone,
} from "lucide-react";

import axios from "../config/axiosInstance.js";
import { mytoast } from "../App.jsx";
import { useContact } from "../context/ContactContext.jsx";

const MessageModal = ({ message, onClose, onSendReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replySubject, setReplySubject] = useState(`Re: ${message.subject}`);
  const [replyMessage, setReplyMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const {updateContact}= useContact()
  const fileInputRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleSendReply = async () => {
    const formData = new FormData();
    formData.append("id", message.id);
    formData.append("subject", replySubject);
    formData.append("message", replyMessage);

    // Append each attachment file if available
    attachments.forEach((file, index) => {
      formData.append("attachments", file);
    });

    try {
      setIsSending(true);
      const res = await axios.post("/api/contact/send-reply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (res.status == 200) {
        mytoast("Replied successfully!");
       
        updateContact(res.data.result)
        onSendReply();
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }finally{
      setIsSending(false)
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setAttachments([...attachments, ...newFiles]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
  };

  const replyFormVariants = {
    hidden: { opacity: 0, height: 0, y: 20 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Message Details</h2>
          <motion.button
            onClick={onClose}
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded-full hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Message Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <motion.div
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">From:</span>
                <span className="font-medium">{message.name}</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{message.email}</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <Tag className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Subject:</span>
                <span className="font-medium">{message.subject}</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">
                  {new Date(message.createdAt).toLocaleDateString()}
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Phone:</span>
                <span className="font-medium">
                  {message.phone ? message.phone : "Not provided"}
                </span>
              </motion.div>
            </div>

            <motion.div className="mt-4 border-t pt-4" variants={itemVariants}>
              <h3 className="text-gray-500 mb-2">Message:</h3>
              <p className="whitespace-pre-line">{message.message}</p>
            </motion.div>
          </div>

          {/* Reply Form */}
          <AnimatePresence>
            {isReplying ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={replyFormVariants}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-medium">Reply to {message.name}</h3>
                </div>

                <div className="p-4 space-y-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type your reply here..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attachments
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>Add Files</span>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                      />
                    </div>

                    {attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded"
                          >
                            <span className="text-sm truncate">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end gap-3 bg-gray-50">
          {!isReplying ? (
            <motion.button
              onClick={handleReply}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Reply</span>
            </motion.button>
          ) : (
            <>
              <motion.button
                onClick={() => setIsReplying(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </motion.button>

              <motion.button
                onClick={handleSendReply}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors ${
                  isSending ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={!replyMessage.trim() || isSending}
              >
                {isSending ? (
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.536-3.536A9.964 9.964 0 0120 12h-4a6 6 0 00-6-6v4l-3.536-3.536A9.964 9.964 0 014 12H0z"
                    ></path>
                  </svg>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSending ? "Sending..." : "Send Reply"}</span>
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MessageModal;
