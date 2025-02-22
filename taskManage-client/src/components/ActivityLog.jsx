
const ActivityLog = () => {
    return (
        <div className="w-full bg-gray-200 rounded-3xl shadow-lg p-4 mb-2">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-300 text-gray-800">
                        <th className="py-2 px-4">Task Category</th>
                        <th className="py-2 px-4">ToDo</th>
                        <th className="py-2 px-4">In-Progress</th>
                        <th className="py-2 px-4">Done</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { task: "To-Dos", status: "Done", icon: "1" },
                        { task: "In Progress", status: "Done", icon: "2" },
                        { task: "Task Moved", status: "Done", icon: "3" },
                    ].map((row, index) => (
                        <tr key={index} className="border-t">
                            <td className="py-2 px-4">🔴</td>
                            <td className="py-2 px-4 font-bold">{row.task}</td>
                            <td className="py-2 px-4">⭕</td>
                            <td className="py-2 px-4">⚪⚪⚪</td>
                            <td className="py-2 px-4">🔵🔵⚪</td>
                            <td className="py-2 px-4">🔵🔵⚪</td>
                            <td className="py-2 px-4 font-bold text-blue-600">{row.status}</td>
                            <td className="py-2 px-4">
                                <span className="bg-pink-400 text-white rounded-full px-2 py-1">{row.icon}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityLog;