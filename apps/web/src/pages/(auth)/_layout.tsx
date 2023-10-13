import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Auth Layout</h1>
      <Outlet />
    </div>
  );
}
