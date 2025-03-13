import AdminLayout from "../../components/layouts/AdminLayout"

// Mock data for contact messages
const mockMessages = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "Product Inquiry",
    message: "I would like to know more about your pain relief products and their side effects.",
    date: "2023-12-10",
    status: "New",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Partnership Opportunity",
    message:
      "Our company is interested in distributing your products in the Asian market. Please contact me to discuss further.",
    date: "2023-12-05",
    status: "Replied",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    subject: "Job Application",
    message:
      "I am interested in the Research Scientist position advertised on your website. Please find my resume attached.",
    date: "2023-11-28",
    status: "Archived",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    subject: "Product Feedback",
    message: "I've been using your vitamin supplements for 3 months and wanted to share my positive experience.",
    date: "2023-11-20",
    status: "New",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    subject: "Media Inquiry",
    message:
      "I'm a journalist writing an article about pharmaceutical innovations. Would like to schedule an interview.",
    date: "2023-11-15",
    status: "Replied",
  },
]

export default function AdminContact() {
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500 text-white"
      case "Replied":
        return "bg-green-500 text-white"
      case "Archived":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Total Messages</h2>
            <div className="text-2xl font-bold">{mockMessages.length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-sm font-medium text-gray-500 mb-2">New Messages</h2>
            <div className="text-2xl font-bold">{mockMessages.filter((msg) => msg.status === "New").length}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Replied Messages</h2>
            <div className="text-2xl font-bold">{mockMessages.filter((msg) => msg.status === "Replied").length}</div>
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
                {mockMessages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{message.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{message.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">{message.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">{message.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(message.status)}`}
                      >
                        {message.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-primary/70">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

