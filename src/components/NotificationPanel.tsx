interface Props {
  notifications: string[];
}

export default function NotificationPanel({ notifications }: Props) {
  return (
    <div className="absolute right-0 top-16 w-96 bg-white/95 backdrop-blur-2xl border border-pink-100 rounded-3xl shadow-2xl p-5 z-50">
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        Notifications
      </h3>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="bg-pink-50 border border-pink-100 rounded-2xl p-4 text-gray-700"
            >
              {note}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
