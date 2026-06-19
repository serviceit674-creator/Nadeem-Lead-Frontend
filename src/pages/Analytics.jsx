import React from 'react';
import { Users, IndianRupee, TrendingUp, Target, Download, Brain, Trophy, ChevronRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Data & Config same as before...
const revenueData = [{ month: "Jan", revenue: 20000 }, { month: "Feb", revenue: 45000 }, { month: "Mar", revenue: 38000 }, { month: "Apr", revenue: 70000 }, { month: "May", revenue: 95000 }, { month: "Jun", revenue: 125000 }];
const sourceData = [{ name: "Facebook", value: 420 }, { name: "Google", value: 300 }, { name: "Website", value: 180 }, { name: "WhatsApp", value: 150 }];
const COLORS = ["#3B82F6", "#22C55E", "#F97316", "#A855F7"];
const agents = [{ name: "Rahul", leads: 120, conversions: 40, revenue: "₹1.8L" }, { name: "Amit", leads: 95, conversions: 31, revenue: "₹1.2L" }, { name: "Pankaj", leads: 80, conversions: 25, revenue: "₹90K" }];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h2 className="text-2xl font-bold mt-1 text-slate-900">{value}</h2>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </div>
);

export default function Analytics() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
          <p className="text-slate-500">Real-time business performance metrics</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors font-medium">
          <Download size={18} /> Export Data
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Leads" value="1,245" icon={Users} color="bg-blue-600" />
        <StatCard title="Revenue" value="₹12.5L" icon={IndianRupee} color="bg-green-600" />
        <StatCard title="Conv. Rate" value="23.6%" icon={Target} color="bg-purple-600" />
        <StatCard title="ROAS" value="8.2x" icon={TrendingUp} color="bg-orange-600" />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} dot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={sourceData} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                {sourceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Top Performing Agents</h3>
          <table className="w-full">
            <thead className="text-slate-400 text-sm text-left">
              <tr>
                <th className="pb-4">Agent Name</th>
                <th className="pb-4">Leads</th>
                <th className="pb-4">Conversions</th>
                <th className="pb-4">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {agents.map((agent) => (
                <tr key={agent.name} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-semibold">{agent.name}</td>
                  <td className="py-4 text-slate-600">{agent.leads}</td>
                  <td className="py-4 text-slate-600">{agent.conversions}</td>
                  <td className="py-4 font-bold text-green-600">{agent.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6 text-blue-400">
              <Brain size={24} />
              <h3 className="font-bold text-lg text-white">AI Strategy Core</h3>
            </div>
            <ul className="space-y-4">
              {['Facebook ads performing at 4.2x ROI', 'Conversion spike expected on weekends', 'Shift focus to Morning Call slots'].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <ChevronRight size={16} className="mt-1 text-blue-500" /> {tip}
                </li>
              ))}
            </ul>
          </div>
          <button className="w-full mt-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-colors">
            Run AI Optimization
          </button>
        </div>
      </div>
    </div>
  );
}