import PublicLayout from "../components/layouts/PublicLayout"
import {useMilestones} from "../context/MilestoneContext"


export default function MilestonesPage() {

  const {milestones} = useMilestones()

  
  const sortedMilestones = [...milestones].sort((a, b) => b.year - a.year)

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Our Journey</h1>
        <p className="text-gray-600 mb-8">Key milestones in Genoviq's history of innovation and growth</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"></div>

          <div className="space-y-12">
            {sortedMilestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2 w-5 h-5 rounded-full bg-primary hidden md:block"></div>

                <div className={`md:flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="md:w-1/2 p-4">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                      <div className="relative">
                        <img
                          src={milestone.image || "/placeholder.svg"}
                          alt={milestone.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-primary text-white px-4 py-2 rounded-br-lg font-bold">
                          {milestone.year}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 hidden md:block"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

