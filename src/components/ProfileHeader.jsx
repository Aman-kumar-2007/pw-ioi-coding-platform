import {
  Edit3,
  Share2,
  Flame,
  MapPin,
} from "lucide-react"

function ProfileHeader() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">

        {/* Profile Info */}
        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-bold">
            A
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Aman Kumar
            </h2>

            <p className="text-gray-500 mt-1">
              CSE • 3rd Year
            </p>

            <div className="flex items-center gap-1 text-sm text-gray-400 mt-2">
              <MapPin size={15} />
              <span>PW IOI</span>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Competitive Programmer • Developer
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <div className="bg-orange-50 text-orange-600 px-4 py-3 rounded-xl flex items-center gap-2">
            <Flame size={20} />

            <div>
              <p className="text-xs text-orange-400">
                Current Streak
              </p>

              <p className="font-bold">
                0 Days
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
            <Share2 size={17} />
            Share
          </button>

          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition">
            <Edit3 size={17} />
            Edit Profile
          </button>

        </div>

      </div>
    </section>
  )
}

export default ProfileHeader
