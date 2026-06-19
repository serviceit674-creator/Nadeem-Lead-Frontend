import React, { useState } from 'react';
import { 
  Settings, User, Bell, Shield, Database, Link as LinkIcon, 
  Globe, Mail, Save, ToggleLeft, ToggleRight 
} from 'lucide-react';

export default function Setting() {
  const [isAiEnabled, setIsAiEnabled] = useState(true);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
        </div>

        {/* Setting Sections */}
        <div className="space-y-6">
          
          {/* General Branding */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe size={18} className="text-slate-400" /> General Branding
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">CRM Name</label>
                <input type="text" className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none focus:ring-2 ring-blue-500" defaultValue="LeadFlow Pro" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Company Email</label>
                <input type="email" className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none" defaultValue="admin@crm.com" />
              </div>
            </div>
          </section>

          {/* Integrations */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LinkIcon size={18} className="text-slate-400" /> Integrations
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50">
                <div>
                  <p className="font-semibold text-sm">WhatsApp Business API</p>
                  <p className="text-xs text-slate-500">Connected: +91 98765 43210</p>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:underline">Manage</button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50">
                <div>
                  <p className="font-semibold text-sm">Facebook Ads Manager</p>
                  <p className="text-xs text-slate-500">Active Campaign Sync</p>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:underline">Manage</button>
              </div>
            </div>
          </section>

          {/* Automation & AI */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Database size={18} className="text-slate-400" /> AI Automation
              </h3>
              <button onClick={() => setIsAiEnabled(!isAiEnabled)}>
                {isAiEnabled ? <ToggleRight size={32} className="text-blue-600" /> : <ToggleLeft size={32} className="text-slate-300" />}
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">Enable AI-powered lead scoring and automated follow-up suggestions.</p>
          </section>

          {/* Security */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield size={18} className="text-slate-400" /> Security
            </h3>
            <button className="flex items-center gap-2 text-red-600 font-medium text-sm hover:bg-red-50 p-2 rounded-lg transition">
              <User size={16} /> Reset User Permissions
            </button>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg">Cancel</button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}