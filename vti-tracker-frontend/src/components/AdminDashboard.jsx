import React, { useState } from 'react';
import {
  IconMap,
  IconBus,
  IconRoute,
  IconDriver,
  IconReport,
  IconShield,
  IconLogout,
  IconAlert,
  IconRefresh,
} from './Icons';

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('tracking');
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const [isSyncing, setIsSyncing] = useState(false);

  const [buses, setBuses] = useState([
    { id: 'BUS-101', plate: 'VTI-8801', model: 'Volvo 9700', tracker: 'OBD-GPS-4412', status: 'In Service', speed: 42, driver: 'Arthur Pendelton', route: 'Campus Line Alpha' },
    { id: 'BUS-102', plate: 'VTI-8802', model: 'Scania Touring', tracker: 'OBD-GPS-9921', status: 'In Service', speed: 38, driver: 'Elena Rostova', route: 'Express Downtown' },
    { id: 'BUS-103', plate: 'VTI-8803', model: 'Mercedes Tourismo', tracker: 'OBD-GPS-1092', status: 'Maintenance', speed: 0, driver: 'Unassigned', route: 'Unassigned' },
    { id: 'BUS-104', plate: 'VTI-8804', model: 'MAN Lion\'s Coach', tracker: 'OBD-GPS-7734', status: 'In Service', speed: 55, driver: 'Marcus Kane', route: 'Northlink Shuttle' },
  ]);

  const [alerts] = useState([
    { id: 1, type: 'Speed Violation', bus: 'BUS-104', message: 'Exceeded 50 km/h in Campus Zone', time: '2 mins ago', severity: 'warning' },
    { id: 2, type: 'Geofence Exit', bus: 'BUS-102', message: 'Crossed designated perimeter at Gate 3', time: '14 mins ago', severity: 'info' },
  ]);

  const [routes] = useState([
    { id: 'R-01', name: 'Campus Line Alpha', stops: 8, frequency: '15 mins', activeBuses: 2, status: 'Active' },
    { id: 'R-02', name: 'Express Downtown', stops: 12, frequency: '20 mins', activeBuses: 1, status: 'Active' },
    { id: 'R-03', name: 'Northlink Shuttle', stops: 6, frequency: '30 mins', activeBuses: 1, status: 'Active' },
  ]);

  const [drivers] = useState([
    { id: 'DRV-01', name: 'Arthur Pendelton', license: 'DL-893241-A', phone: '+1 555-0192', assignedBus: 'BUS-101', shift: 'Morning (06:00 - 14:00)', status: 'On Duty' },
    { id: 'DRV-02', name: 'Elena Rostova', license: 'DL-443912-B', phone: '+1 555-0243', assignedBus: 'BUS-102', shift: 'Morning (06:00 - 14:00)', status: 'On Duty' },
    { id: 'DRV-03', name: 'Marcus Kane', license: 'DL-908123-A', phone: '+1 555-0388', assignedBus: 'BUS-104', shift: 'Full Shift (08:00 - 18:00)', status: 'On Duty' },
    { id: 'DRV-04', name: 'Samantha Vance', license: 'DL-332910-A', phone: '+1 555-0455', assignedBus: 'Unassigned', shift: 'Evening (14:00 - 22:00)', status: 'Standby' },
  ]);

  const handleSyncDatabase = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setLastSync(new Date().toLocaleTimeString());
      setIsSyncing(false);
    }, 600);
  };

  const navItems = [
    { id: 'tracking', label: '1. Live Map & Tracking', sub: 'Real-time GPS & Telemetry', icon: IconMap, access: 'FULL CONTROL' },
    { id: 'fleet', label: '2. Fleet Management', sub: 'Vehicles & Hardware Pairing', icon: IconBus, access: 'FULL CONTROL' },
    { id: 'routes', label: '3. Routes & Schedules', sub: 'Stops, Lines & Timetables', icon: IconRoute, access: 'FULL CONTROL' },
    { id: 'drivers', label: '4. Driver Management', sub: 'Profiles & Shift Assignment', icon: IconDriver, access: 'MANAGER' },
    { id: 'reports', label: '5. Reports & Analytics', sub: 'Performance Data Export', icon: IconReport, access: 'READ / EXPORT' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
            <IconShield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide text-white">BUS TRACKER ADMIN PORTAL</div>
            <div className="text-xs text-slate-400">Control & Navigation Hub • v2.4</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSyncDatabase}
            disabled={isSyncing}
            className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <IconRefresh className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-400' : ''}`} />
            <span>Sync DB: {lastSync}</span>
          </button>

          <div className="h-6 w-px bg-slate-800" />

          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-200">{user?.name || 'Administrator'}</div>
            <div className="text-[10px] text-blue-400 font-mono tracking-wider">{user?.accessLevel || 'FULL CONTROL'}</div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            title="Logout"
          >
            <IconLogout className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        <aside className="w-full md:w-72 bg-slate-900/40 border-r border-slate-800/80 p-4 space-y-2">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Administrative Core Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 border ${
                  isActive
                    ? 'bg-blue-600/15 border-blue-500/40 text-blue-400 shadow-lg shadow-blue-500/5'
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className={`mt-0.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 truncate">{item.sub}</div>
                  <span className="inline-block mt-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                    {item.access}
                  </span>
                </div>
              </button>
            );
          })}
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">1. Live Map & Tracking</h2>
                  <p className="text-xs text-slate-400">Track Active Bus Locations & Speeds • Monitor Geofence & Emergency Alerts</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-medium">
                  Full Control Mode
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      alert.severity === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                        : 'bg-blue-500/10 border-blue-500/30 text-blue-200'
                    }`}
                  >
                    <IconAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold flex items-center justify-between">
                        <span>{alert.type} - {alert.bus}</span>
                        <span className="text-xs opacity-75">{alert.time}</span>
                      </div>
                      <p className="text-xs mt-1 opacity-90">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="text-sm font-semibold text-white mb-4">Active Fleet Telemetry</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {buses.map((bus) => (
                    <div key={bus.id} className="bg-slate-950/70 border border-slate-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-blue-400 text-sm">{bus.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-400">
                          {bus.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-medium">{bus.plate} • {bus.model}</div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                        <div>Speed: <span className="font-mono text-white">{bus.speed} km/h</span></div>
                        <div>GPS: <span className="font-mono text-slate-200">{bus.tracker}</span></div>
                        <div className="col-span-2 text-slate-300 truncate">Route: {bus.route}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fleet' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">2. Fleet Management</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 font-semibold border-b border-slate-800 uppercase">
                    <tr>
                      <th className="p-3">Bus ID</th>
                      <th className="p-3">Plate & Model</th>
                      <th className="p-3">Paired GPS</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {buses.map((bus) => (
                      <tr key={bus.id}>
                        <td className="p-3 font-bold text-white">{bus.id}</td>
                        <td className="p-3 text-slate-300">{bus.plate} ({bus.model})</td>
                        <td className="p-3 font-mono text-blue-400">{bus.tracker}</td>
                        <td className="p-3 text-emerald-400">{bus.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">3. Routes & Schedules</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {routes.map((r) => (
                  <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="font-bold text-white mb-2">{r.name}</div>
                    <div className="text-xs text-slate-400">Stops: {r.stops} • Frequency: {r.frequency}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'drivers' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">4. Driver Management</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="divide-y divide-slate-800">
                  {drivers.map((d) => (
                    <div key={d.id} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-white">{d.name}</div>
                        <div className="text-slate-400">{d.license} • {d.shift}</div>
                      </div>
                      <span className="text-emerald-400 font-medium">{d.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">5. Reports & Analytics</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
                <p className="text-xs text-slate-400 mb-4">Export performance, on-time arrivals, and compliance logs.</p>
                <button
                  onClick={() => alert("Downloading trip & telemetry audit log...")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
                >
                  Export Performance Report (CSV)
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
