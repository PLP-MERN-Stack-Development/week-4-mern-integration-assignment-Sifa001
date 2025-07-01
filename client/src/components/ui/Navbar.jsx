export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="font-bold text-xl">TaskApp</div>
      <div className="space-x-4">
        {/* Add navigation links here */}
        <a href="#" className="text-gray-700 hover:text-black">Home</a>
        <a href="#" className="text-gray-700 hover:text-black">Tasks</a>
      </div>
    </nav>
  );
} 