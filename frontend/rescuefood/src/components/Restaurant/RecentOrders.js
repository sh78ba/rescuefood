const RecentOrders = () => {
    const orders = [
      { id: "#0010235", name: "Tuna Soup", status: "Pending", date: "12-12-2024", quantity: 3 },
      { id: "#0010299", name: "Mozzarella Pizza", status: "Delivered", date: "12-12-2024", quantity: 1 },
      { id: "#0010235", name: "Sweet Cheezy Pizza", status: "Cancelled", date: "12-12-2024", quantity: 2 },
    ];
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Recent Donations</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="flex justify-between items-center py-2 border-b">
              <span>{order.name}</span>
              <span>{order.date}</span>
              <span className={`px-2 py-1 rounded ${order.status === "Pending" ? "bg-yellow-200" : order.status === "Delivered" ? "bg-green-200" : "bg-red-200"}`}>{order.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RecentOrders;