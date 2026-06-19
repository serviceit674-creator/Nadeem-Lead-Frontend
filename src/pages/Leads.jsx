import React, { useMemo, useState, useEffect } from "react";
import { Plus, Search, Layers, Compass, FileSpreadsheet, FileText, ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- Exact Match Table Skeleton ---------------- */
const TableSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <tr key={i} className="animate-pulse border-b border-slate-100">
        <td className="p-4"><div className="h-5 w-32 bg-slate-200 rounded-lg" /></td>
        <td className="p-4"><div className="h-4 w-40 bg-slate-100 rounded-lg" /></td>
        <td className="p-4"><div className="h-4 w-28 bg-slate-100 rounded-lg" /></td>
        <td className="p-4"><div className="h-6 w-20 bg-slate-100 rounded-md" /></td>
        <td className="p-4"><div className="h-6 w-14 bg-slate-100 rounded-md" /></td>
        <td className="p-4"><div className="h-6 w-16 bg-blue-50/50 rounded-md" /></td>
      </tr>
    ))}
  </>
);

/* ---------------- High-Fidelity Static Mock Dataset (25 items) ---------------- */
const MOCK_LEADS_DATABASE = [
  { _id: "L001", name: "Alexander Wright", email: "alex.wright@quantumflow.io", phone: "+1 (555) 234-5678", source: "facebook", score: 94, status: "Verified" },
  { _id: "L002", name: "Sophia Martinez", email: "sophia.m@vortexdigital.co", phone: "+1 (555) 876-5432", source: "instagram", score: 82, status: "In Progress" },
  { _id: "L003", name: "Marcus Chen", email: "marcus.chen@nexusbuilt.com", phone: "+1 (555) 345-6789", source: "whatsapp", score: 47, status: "New" },
  { _id: "L004", name: "Olivia Vance", email: "olivia.vance@hyperpixel.net", phone: "+1 (555) 987-6543", source: "facebook", score: 71, status: "Contacted" },
  { _id: "L005", name: "Liam Gallagher", email: "liam.g@stratos-aero.com", phone: "+1 (555) 456-7890", source: "whatsapp", score: 88, status: "Verified" },
  { _id: "L006", name: "Emma Watson", email: "emma.watson@lumina-tech.org", phone: "+1 (555) 654-3210", source: "instagram", score: 35, status: "Dead Lead" },
  { _id: "L007", name: "Devon Lane", email: "devon.lane@cloverfield.co", phone: "+1 (555) 567-8901", source: "facebook", score: 79, status: "In Progress" },
  { _id: "L008", name: "Bessie Cooper", email: "bessie.c@aetherlabs.io", phone: "+1 (555) 432-1098", source: "facebook", score: 91, status: "Verified" },
  { _id: "L009", name: "Arlene McCoy", email: "arlene.mccoy@infinitum.biz", phone: "+1 (555) 678-9012", source: "whatsapp", score: 63, status: "Contacted" },
  { _id: "L010", name: "Albert Flores", email: "albert.f@apexsystems.com", phone: "+1 (555) 210-9876", source: "instagram", score: 18, status: "Dead Lead" },
  { _id: "L011", name: "Savannah Nguyen", email: "savannah.n@biocore.org", phone: "+1 (555) 789-0123", source: "facebook", score: 85, status: "Verified" },
  { _id: "L012", name: "Cody Fisher", email: "cody.fisher@dataprism.io", phone: "+1 (555) 321-0987", source: "instagram", score: 55, status: "In Progress" },
  { _id: "L013", name: "Kristin Watson", email: "kristin.w@elevatedev.com", phone: "+1 (555) 890-1234", source: "whatsapp", score: 92, status: "Verified" },
  { _id: "L014", name: "Marvin McKinney", email: "marvin.mck@synapse.net", phone: "+1 (555) 543-2109", source: "facebook", score: 41, status: "New" },
  { _id: "L015", name: "Courtney Henry", email: "courtney.h@vectorgraphics.cc", phone: "+1 (555) 901-2345", source: "instagram", score: 74, status: "Contacted" },
  { _id: "L016", name: "Darlene Robertson", email: "darlene.rob@blueocean.org", phone: "+1 (555) 654-7890", source: "whatsapp", score: 68, status: "In Progress" },
  { _id: "L017", name: "Eleanor Pena", email: "eleanor.pena@cloudwalk.com", phone: "+1 (555) 123-9876", source: "facebook", score: 96, status: "Verified" },
  { _id: "L018", name: "Floyd Miles", email: "floyd.miles@ironclad-sec.com", phone: "+1 (555) 789-3456", source: "instagram", score: 29, status: "Dead Lead" },
  { _id: "L019", name: "Guy Hawkins", email: "guy.hawkins@terrashift.io", phone: "+1 (555) 456-1234", source: "whatsapp", score: 81, status: "Verified" },
  { _id: "L020", name: "Jerome Bell", email: "jerome.bell@novaspheres.co", phone: "+1 (555) 890-5678", source: "facebook", score: 52, status: "New" },
  { _id: "L021", name: "Kathryn Murphy", email: "kathryn.m@pixelpioneer.io", phone: "+1 (555) 234-9012", source: "instagram", score: 77, status: "In Progress" },
  { _id: "L022", name: "Leslie Alexander", email: "leslie.a@quantumlabs.org", phone: "+1 (555) 567-3456", source: "whatsapp", score: 89, status: "Verified" },
  { _id: "L023", name: "Michael Foster", email: "michael.f@silverback.net", phone: "+1 (555) 901-7890", source: "facebook", score: 61, status: "Contacted" },
  { _id: "L024", name: "Annette Black", email: "annette.b@cyberguard.com", phone: "+1 (555) 345-0123", source: "instagram", score: 43, status: "New" },
  { _id: "L025", name: "Esther Howard", email: "esther.h@titanium-dev.co", phone: "+1 (555) 678-4567", source: "whatsapp", score: 95, status: "Verified" }
];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [search, setSearch] = useState("");
  const [channelTab, setChannelTab] = useState("facebook");
  
  /* Pagination Local States Configured to 7 items */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Local simulated response loader engine
  const fetchLeads = (isInitial = false) => {
    if (isInitial) setLoading(true);
    
    // Simulate a brief local parsing clock to allow the design skeleton to manifest beautifully
    const timeout = setTimeout(() => {
      setLeads(MOCK_LEADS_DATABASE);
      if (isInitial) setLoading(false);
    }, isInitial ? 600 : 0);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    fetchLeads(true);
  }, []);

  // Reset pagination to page 1 whenever search criteria or channel updates
  useEffect(() => {
    setCurrentPage(1);
  }, [search, channelTab]);

  /* 1. Global Filter Core logic */
  const globalFilteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        lead.name?.toLowerCase().includes(searchLower) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.phone?.includes(searchLower);
      
      const dbSource = lead.source ? lead.source.toLowerCase() : "facebook";
      const matchesChannel = dbSource.includes(channelTab.toLowerCase());
      
      return matchesSearch && matchesChannel;
    });
  }, [search, leads, channelTab]);

  /* 2. Page Slice Segment Allocation */
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return globalFilteredLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [globalFilteredLeads, currentPage]);

  const totalPages = Math.ceil(globalFilteredLeads.length / itemsPerPage) || 1;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-100";
    if (score >= 50) return "text-yellow-600 bg-yellow-50 border-yellow-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  /* ---------------- Native Highly Compatible Export Engines ---------------- */
  const downloadExcelCSV = () => {
    if (globalFilteredLeads.length === 0) {
      alert("No structured data available to export.");
      return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Lead Name,Email Address,Phone Number,Channel Source,AI Score %,Current Status\n";
    
    globalFilteredLeads.forEach((lead) => {
      const row = [
        `"${(lead.name || "N/A").replace(/"/g, '""')}"`,
        `"${(lead.email || "N/A").replace(/"/g, '""')}"`,
        `"${lead.phone || "N/A"}"`,
        `"${lead.source || "Facebook"}"`,
        `"${lead.score || 0}%"`,
        `"${lead.status || "New"}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodedUri);
    downloadAnchor.setAttribute("download", `Leads_Report_${channelTab}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  const downloadPDFReport = () => {
    window.print();
  };

  return (
    <div className="flex h-screen bg-slate-50 print:bg-white print:h-auto">
      <div className="flex-1 p-8 overflow-y-auto print:p-0">
        
        {/* Top Operational Action Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8 print:hidden">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lead Pipeline</h1>
            <p className="text-slate-500 mt-1">Manage and track your incoming leads</p>
          </div>
          
          {/* Integrated Utilities Block */}
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            {/* CSV Spreadsheet Button */}
            <button 
              onClick={downloadExcelCSV}
              className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-slate-50 font-bold text-sm shadow-sm transition active:scale-95"
            >
              <FileSpreadsheet size={18} className="text-emerald-600" /> Export Excel/CSV
            </button>

            {/* Document PDF Button */}
            <button 
              onClick={downloadPDFReport}
              className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-slate-50 font-bold text-sm shadow-sm transition active:scale-95"
            >
              <FileText size={18} className="text-red-500" /> Save as PDF
            </button>

            {/* Manual Primary Trigger */}
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition font-semibold text-sm shadow-sm active:scale-95 ml-auto xl:ml-0">
              <Plus size={18} /> Add Manual Lead
            </button>
          </div>
        </div>

        {/* 2 Analytical Top Widgets (Total and Tracker) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Total Leads */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm relative overflow-hidden group">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <Layers size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Segment Leads</p>
              <h3 className="text-3xl font-black text-slate-900 mt-0.5">{globalFilteredLeads.length}</h3>
            </div>
            <div className="absolute right-0 bottom-0 translate-y-4 translate-x-2 text-slate-50 opacity-10 pointer-events-none font-black text-8xl group-hover:scale-110 transition-transform">
              #
            </div>
          </div>

          {/* Card 2: Current Track Page Count */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm relative overflow-hidden group">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
              <Compass size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Pipeline Frame</p>
              <h3 className="text-3xl font-black text-slate-900 mt-0.5">
                Page {currentPage} <span className="text-slate-300 font-light text-xl">/ {totalPages}</span>
              </h3>
            </div>
            <div className="absolute right-4 text-xs font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">
              {itemsPerPage} Rows / Page
            </div>
          </div>
        </div>

        {/* Search & Navigation Tab Channels */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 print:hidden">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email or phone..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
            {["whatsapp", "facebook", "instagram"].map((tab) => (
              <button
                key={tab}
                onClick={() => setChannelTab(tab)}
                className={`px-5 py-2 rounded-lg capitalize text-sm font-semibold transition-all ${
                  channelTab === tab 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Core Spreadsheet Table Layout */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:border-0 print:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/70 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Name</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Contact Info</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Phone</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Source</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">AI Score</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <TableSkeleton />
                ) : paginatedLeads.length > 0 ? (
                  paginatedLeads.map((lead) => (
                    <tr 
                      key={lead._id} 
                      onClick={() => setSelectedLead(lead)} 
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors group print:hover:bg-transparent"
                    >
                      <td className="p-4 font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {lead.name || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {lead.email || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600 font-mono">
                        {lead.phone || "N/A"}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-bold text-slate-600 capitalize border border-slate-200">
                          {lead.source || "Facebook"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-black border ${getScoreColor(lead.score)}`}>
                          {lead.score || 0}%
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold border border-blue-100">
                          {lead.status || "New"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Search size={28} className="text-slate-300" />
                        <p className="font-semibold text-slate-500 text-base">No active leads found</p>
                        <p className="text-xs text-slate-400">Try adjusting your search criteria or switching channels.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Pagination Controls */}
        {!loading && globalFilteredLeads.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 print:hidden">
            <p className="text-sm text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">{paginatedLeads.length}</span> of{" "}
              <span className="text-slate-900 font-bold">{globalFilteredLeads.length}</span> targeted leads
            </p>
            
            <div className="flex items-center gap-1.5">
              {/* Prev Page Control */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition shadow-sm active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              
              {/* Numeric Page Indexes */}
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                      currentPage === idx + 1
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Next Page Control */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev - 1 + 2)} // Safe functional advance execution
                className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition shadow-sm active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}