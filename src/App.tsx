import { useEffect, useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { LucideIcon } from 'lucide-react';

const severityData = [
  { repo: 'AuthSvc', critical: 2, high: 5, medium: 8, low: 12 },
  { repo: 'Payments', critical: 0, high: 3, medium: 6, low: 9 },
  { repo: 'UserAPI', critical: 1, high: 7, medium: 4, low: 15 },
  { repo: 'PortalUI', critical: 0, high: 2, medium: 5, low: 8 },
  { repo: 'DataSync', critical: 3, high: 4, medium: 7, low: 10 },
];

const vulnerabilities = [
  { id: 'CVE-2024-001', package: 'lodash', version: '4.17.15', severity: 'Critical', status: 'Open', repo: 'AuthSvc' },
  { id: 'CVE-2024-012', package: 'axios', version: '0.21.1', severity: 'High', status: 'In Progress', repo: 'UserAPI' },
  { id: 'CVE-2024-023', package: 'express', version: '4.17.1', severity: 'Medium', status: 'Open', repo: 'Payments' },
  { id: 'CVE-2024-034', package: 'moment', version: '2.29.1', severity: 'Low', status: 'Approved', repo: 'PortalUI' },
  { id: 'CVE-2024-045', package: 'jsonwebtoken', version: '8.5.1', severity: 'High', status: 'Open', repo: 'DataSync' },
];

const approvedPackages = [
  { name: 'react', version: '18.2.0', license: 'MIT', updated: '2024-01-10' },
  { name: 'typescript', version: '5.3.3', license: 'Apache-2.0', updated: '2024-01-08' },
  { name: 'tailwindcss', version: '3.4.1', license: 'MIT', updated: '2024-01-05' },
];

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-white">{value}</h3>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const severityBadge = (severity: string) => {
  const map: Record<string, string> = {
    Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  return map[severity] || 'bg-gray-500/20 text-gray-400';
};

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Open: 'text-red-400',
    'In Progress': 'text-yellow-400',
    Approved: 'text-green-400',
  };
  return map[status] || 'text-gray-400';
};

function App() {
  const [tab, setTab] = useState<'vulnerabilities' | 'packages'>('vulnerabilities');

  useEffect(() => {
    document.title = 'Compliance Dashboard';
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-400" aria-hidden="true" />
            <div>
              <h1 className="text-xl font-bold">ComplianceGuard</h1>
              <p className="text-xs text-gray-400">Enterprise Security & Compliance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
              aria-label="Export report"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Security Overview</h2>
          <p className="text-gray-400">Track vulnerabilities and approved packages across repositories</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={AlertTriangle} label="Critical" value="2" color="bg-red-500" />
          <StatCard icon={AlertTriangle} label="High" value="8" color="bg-orange-500" />
          <StatCard icon={AlertTriangle} label="Medium" value="19" color="bg-yellow-500" />
          <StatCard icon={CheckCircle} label="Low" value="39" color="bg-blue-500" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Vulnerabilities by Repository</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="repo" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                  <Bar dataKey="critical" stackId="a" fill="#ef4444" />
                  <Bar dataKey="high" stackId="a" fill="#f97316" />
                  <Bar dataKey="medium" stackId="a" fill="#eab308" />
                  <Bar dataKey="low" stackId="a" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Approved Packages Summary */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Approved Packages</h3>
            <div className="space-y-3">
              {approvedPackages.map((pkg) => (
                <div key={pkg.name} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium">{pkg.name}</p>
                    <p className="text-xs text-gray-400">{pkg.license}</p>
                  </div>
                  <span className="text-sm text-emerald-400 font-mono">{pkg.version}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              View all packages →
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-700" role="tablist" aria-label="Security tabs">
            <button
              onClick={() => setTab('vulnerabilities')}
              className={`px-6 py-3 text-sm font-medium ${tab === 'vulnerabilities' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-gray-700/30' : 'text-gray-400 hover:text-white'}`}
              role="tab"
              aria-selected={tab === 'vulnerabilities'}
            >
              Vulnerabilities
            </button>
            <button
              onClick={() => setTab('packages')}
              className={`px-6 py-3 text-sm font-medium ${tab === 'packages' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-gray-700/30' : 'text-gray-400 hover:text-white'}`}
              role="tab"
              aria-selected={tab === 'packages'}
            >
              Approved Packages
            </button>
          </div>

          <div className="p-6" role="tabpanel">
            {tab === 'vulnerabilities' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Package</th>
                      <th className="pb-3 font-medium">Version</th>
                      <th className="pb-3 font-medium">Repository</th>
                      <th className="pb-3 font-medium">Severity</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {vulnerabilities.map((v) => (
                      <tr key={v.id} className="hover:bg-gray-700/30">
                        <td className="py-3 font-mono text-gray-300">{v.id}</td>
                        <td className="py-3">{v.package}</td>
                        <td className="py-3 text-gray-400">{v.version}</td>
                        <td className="py-3 text-gray-400">{v.repo}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs border ${severityBadge(v.severity)}`}>{v.severity}</span>
                        </td>
                        <td className={`py-3 font-medium ${statusBadge(v.status)}`}>{v.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3 font-medium">Package</th>
                      <th className="pb-3 font-medium">Version</th>
                      <th className="pb-3 font-medium">License</th>
                      <th className="pb-3 font-medium">Last Updated</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {approvedPackages.map((pkg) => (
                      <tr key={pkg.name} className="hover:bg-gray-700/30">
                        <td className="py-3 font-medium">{pkg.name}</td>
                        <td className="py-3 font-mono text-gray-400">{pkg.version}</td>
                        <td className="py-3 text-gray-400">{pkg.license}</td>
                        <td className="py-3 text-gray-400">{pkg.updated}</td>
                        <td className="py-3"><span className="text-emerald-400 font-medium">Approved</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
