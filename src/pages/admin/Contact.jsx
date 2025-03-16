import { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import MessageModal from "../../components/MessageModal";
import { mytoast } from "../../App";
import { useContact } from "../../context/ContactContext";
import axios from "../../config/axiosInstance";

export default function AdminContact() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contacts, updateContact } = useContact();
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500 text-white";
      case "Replied":
        return "bg-green-500 text-white";
      case "Viewed":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    if (message.status == "New") {
      try {
        const res = await axios.put(`/api/contact/mark-viewed/${message.id}`);
        console.log(res);
        updateContact(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSendReply = (replyData) => {
    console.log("Sending reply:", replyData);

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Total Messages
            </h2>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              New Messages
            </h2>
            <div className="text-2xl font-bold">
              {contacts.filter((msg) => msg.status === "New").length}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Replied Messages
            </h2>
            <div className="text-2xl font-bold">
              {contacts.filter((msg) => msg.status === "Replied").length}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subject
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-500 text-sm"
                    >
                      No contact messages found.
                    </td>
                  </tr>
                ) : (
                  contacts.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {message.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {message.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                        {message.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            message.status
                          )}`}
                        >
                          {message.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className=" text-blue-700 hover:text-blue-500 transition-colors"
                          onClick={() => handleViewMessage(message)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {isModalOpen && selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={handleCloseModal}
          onSendReply={handleSendReply}
        />
      )}
    </AdminLayout>
  );
}
