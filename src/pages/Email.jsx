"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiTrash2,
  FiUsers,
  FiCalendar,
  FiFilter,
  FiEye,
  FiX,
  FiGlobe,
} from "react-icons/fi";

/* ---------------- Precision Date Formatter (IST Friendly) ---------------- */
const formatLeadDate = (dateStr) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  
  const dayStr = date.toLocaleDateString('en-GB', {
    day: '2-digit', 
    month: 'short', 
    year: 'numeric'
  });
  
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flex flex-col">
      <span className="text-gray-900 font-semibold text-sm">{dayStr}</span>
      <span className="text-xs text-gray-400 font-medium tracking-tight mt-0.5">{timeStr}</span>
    </div>
  );
};

/* ---------------- Helper Components for Sidebar ---------------- */
const Section = ({ title, children }) => (
  <div>
    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{title}</h4>
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">{children}</div>
  </div>
);

const Field = ({ label, value }) => (
  <div className="flex justify-between items-start gap-4 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
    <span className="text-xs text-gray-500 font-medium shrink-0">{label}</span>
    <span className="text-sm text-gray-900 font-bold text-right">{value || "—"}</span>
  </div>
);

/* ---------------- Readable Skeleton Loader ---------------- */
const TableSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <tr key={i} className="animate-pulse border-b">
        <td className="px-6 py-4"><div className="h-5 w-32 bg-gray-200 rounded" /></td>
        <td className="px-6 py-4"><div className="h-5 w-40 bg-gray-100 rounded" /></td>
        <td className="px-6 py-4"><div className="h-5 w-24 bg-gray-100 rounded" /></td>
        <td className="px-6 py-4"><div className="h-5 w-24 bg-gray-100 rounded" /></td>
        <td className="px-6 py-4 text-center"><div className="h-6 w-16 bg-blue-50 rounded mx-auto" /></td>
        <td className="px-6 py-4"><div className="h-5 w-24 bg-gray-100 rounded" /></td>
        <td className="px-6 py-4 text-right"><div className="h-8 w-16 bg-gray-200 rounded-lg ml-auto" /></td>
      </tr>
    ))}
  </>
);

/* ---------------- Multi-Platform Medical Ingestion Dataset ---------------- */
const GENERATE_MOCK_LEADS = () => {
  const sampleFirstNames = ["Rohan", "Kriti", "Aman", "Priya", "Kabir", "Ananya", "Vikram", "Sneha", "Rahul", "Divya", "Arjun", "Meera", "Yash", "Riya", "Aditya"];
  const sampleLastNames = ["Malhotra", "Sanon", "Dhillon", "Sharma", "Mehta", "Iyer", "Rathore", "Joshi", "Verma", "Gupta", "Kapoor", "Nair", "Patel", "Reddy", "Singh"];
  
  // Channels where doctor receives bookings/leads from
  const acquisitionPlatforms = [
    "Practo Health",
    "Apollo 24/7",
    "Tata 1mg Portal",
    "Personal Website",
    "Google My Business",
    "Justdial Medical"
  ];
  
  const cities = ["New Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai", "Noida", "Gurugram"];
  const states = ["Delhi NCR", "Maharashtra", "Karnataka", "Telangana", "Maharashtra", "Tamil Nadu", "Uttar Pradesh", "Haryana"];
  const urgencyTiers = ["Routine Case", "Urgent Review", "Follow-up", "Immediate Priority"];
  
  const medicalCases = [
    { cond: "Chronic Hypertension", msg: "Patient requested urgent callback via Practo regarding sudden medication side effects and recurring morning dizziness." },
    { cond: "Type 2 Diabetes Control", msg: "Uploaded latest fasting report on 1mg. HbA1c is 8.4. Needs optimization adjustments for insulin dosage." },
    { cond: "Severe Migraine Cluster", msg: "Web inquiry: Experiencing acute unilateral throbbing head pain along with light sensitivity for 3 continuous days." },
    { cond: "Post-Op Knee Follow-up", msg: "Apollo lead: Mild post-surgery swelling in the left knee. Requesting an evening video consultation appointment slot." },
    { cond: "Acute Acid Reflux", msg: "Google Business: Continuous chest burning sensation post-meals. General antacids are completely failing to give relief." },
    { cond: "Pediatric Asthma Triage", msg: "Justdial lead: 6-year-old child exhibiting wheezing patterns due to sudden weather transitions. Requires a nebulizer schedule." }
  ];

  return Array.from({ length: 45 }, (_, index) => {
    const locIndex = Math.floor(Math.random() * cities.length);
    const gender = Math.random() > 0.45 ? "Male" : "Female";
    const firstName = sampleFirstNames[Math.floor(Math.random() * sampleFirstNames.length)];
    const lastName = sampleLastNames[Math.floor(Math.random() * sampleLastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 10}@healthmail.com`;
    
    const medicalCase = medicalCases[index % medicalCases.length];
    const platform = acquisitionPlatforms[index % acquisitionPlatforms.length];

    return {
      "._id": `case_id_${3000 + index}`,
      fullName,
      email,
      mobileNumber: `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`,
      interestedCourse: medicalCase.cond, // Condition
      course: "",
      city: cities[locIndex],
      state: states[locIndex],
      gender,
      fatherName: `Platform: ${platform}`, // Embedded Source Platform metadata securely
      dateOfBirth: new Date(1960 + Math.floor(Math.random() * 55), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      preferredLanguage: Math.random() > 0.3 ? "English" : "Hindi",
      qualification: platform, // Reused safely for table routing filters
      stream: urgencyTiers[Math.floor(Math.random() * urgencyTiers.length)], // Urgency Level mapping
      twelfthPercentage: Math.floor(22 + Math.random() * 65), // Patient Age
      message: medicalCase.msg,
      createdAt: new Date(Date.now() - index * 45 * 60000).toISOString()
    };
  });
};

/* ---------------- Main Page ---------------- */
const LeadsPage = () => {
  const [masterLeads, setMasterLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const [deleteModal, setDeleteModal] = useState({ open: false, id: "", name: "" });
  const [deleting, setDeleting] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const data = GENERATE_MOCK_LEADS();
    setMasterLeads(data);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const searchedAllLeads = useMemo(() => {
    if (!search) return masterLeads;
    const keyword = search.toLowerCase();
    return masterLeads.filter(
      (l) =>
        (l.fullName || "").toLowerCase().includes(keyword) ||
        (l.email || "").toLowerCase().includes(keyword) ||
        (l.interestedCourse || "").toLowerCase().includes(keyword) ||
        (l.qualification || "").toLowerCase().includes(keyword) || // Platform search matching
        (l.stream || "").toLowerCase().includes(keyword) // Urgency search matching
    );
  }, [search, masterLeads]);

  const paginatedLeads = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return searchedAllLeads.slice(startIndex, startIndex + limit);
  }, [searchedAllLeads, page, limit]);

  const total = searchedAllLeads.length;
  const totalPages = Math.ceil(total / limit);

  const confirmDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setMasterLeads((prev) => prev.filter((l) => l._id !== deleteModal.id));
      setDeleteModal({ open: false, id: "", name: "" });
      setDeleting(false);
      
      const updatedTotal = total - 1;
      const updatedMaxPages = Math.ceil(updatedTotal / limit) || 1;
      if (page > updatedMaxPages) {
        setPage(updatedMaxPages);
      }
    }, 400);
  };

  // Small badge helper for identifying platform channels instantly
  const getPlatformBadgeStyle = (platform) => {
    if (platform.includes("Practo")) return "bg-teal-50 text-teal-700 border-teal-100";
    if (platform.includes("Apollo")) return "bg-orange-50 text-orange-700 border-orange-100";
    if (platform.includes("1mg")) return "bg-red-50 text-red-700 border-red-100";
    if (platform.includes("Website")) return "bg-blue-50 text-blue-700 border-blue-100";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-8 px-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
        >
          <FiChevronLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <FiGlobe /> Multi-Channel Sync Active
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl"><FiUsers size={22}/></div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Aggregated Patients</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">{masterLeads.length}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 bg-green-50 text-green-600 rounded-xl"><FiFilter size={22}/></div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Filtered Channels</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">{total}</h3>
          </div>
        </div>
        <div className="bg-blue-600 p-5 rounded-2xl text-white flex items-center gap-4 shadow-md">
           <div className="p-3.5 bg-white/10 rounded-xl"><FiCalendar size={22}/></div>
           <div>
             <p className="text-xs text-blue-100 font-semibold uppercase tracking-wider">Live Intake Dashboard</p>
             <h3 className="text-2xl font-black mt-0.5">Page {page} / {totalPages || 1}</h3>
           </div>
        </div>
      </div>

      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Omni-Channel Lead Hub</h1>
          <p className="text-sm text-gray-500 mt-0.5">Centralized patient acquisition across networks, portals, and direct bookings</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search platform, ailment, patient name..."
            className="pl-12 pr-4 py-2.5 w-full bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl outline-none text-sm transition-all shadow-inner"
          />
        </div>
      </div>

      {/* High-Readability Omnichannel Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Patient Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Contact Sync</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Source Platform</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Clinical Indication</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Triage Urgency</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Received On</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {loading ? (
                <TableSkeleton />
              ) : paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <FiSearch size={32} />
                      <p className="font-semibold text-base text-gray-500">No synchronized platform leads match your filter</p>
                      <button onClick={() => setSearch("")} className="text-blue-600 text-sm font-bold hover:underline">Reset Search Filters</button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-black text-xs uppercase shadow-sm shrink-0">
                          {lead.fullName?.charAt(0) || "P"}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm truncate max-w-[150px]">{lead.fullName}</span>
                          <span className="text-xs font-semibold text-gray-400">{lead.twelfthPercentage} Yrs • {lead.gender}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex flex-col max-w-[180px]">
                        <span className="text-gray-800 font-semibold text-xs truncate">{lead.email}</span>
                        <span className="text-xs text-gray-400 font-mono mt-0.5">{lead.mobileNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border block w-max ${getPlatformBadgeStyle(lead.qualification)}`}>
                        {lead.qualification}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-gray-900 font-semibold text-sm block max-w-[160px] truncate">
                        {lead.interestedCourse}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`text-[11px] font-bold tracking-tight uppercase px-2.5 py-0.5 rounded-md ${
                        lead.stream === 'Immediate Priority' ? 'bg-red-100 text-red-800' :
                        lead.stream === 'Urgent Review' ? 'bg-amber-100 text-amber-800' :
                        lead.stream === 'Follow-up' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.stream}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      {formatLeadDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ open: true, id: lead._id, name: lead.fullName })}
                          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination View */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          <p className="text-sm text-gray-500 font-medium">
            Showing <span className="text-gray-900 font-bold">{paginatedLeads.length}</span> of <span className="text-gray-900 font-bold">{total}</span> cross-platform inbound inquiries
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <FiChevronLeft size={18} />
            </button>
            
            <div className="flex gap-1">
               {[...Array(totalPages)].map((_, i) => (
                 <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                    page === i + 1 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                 >
                  {i + 1}
                 </button>
               ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Deep-Dive Case Assessment Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setSelectedLead(null)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col transition-all duration-300">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-black text-sm">
                  {selectedLead.fullName?.charAt(0) || "P"}
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">{selectedLead.fullName}</h2>
                  <p className="text-xs font-mono text-gray-400">{selectedLead._id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                <FiX size={18} />
              </button>
            </div>

            <div className="p-5 space-y-5 text-sm">
              <Section title="Acquisition Metadata">
                <Field label="Inbound Channel" value={selectedLead.qualification} />
                <Field label="Triage Priority" value={selectedLead.stream} />
                <Field label="Patient Age" value={`${selectedLead.twelfthPercentage} Years`} />
                <Field label="Gender" value={selectedLead.gender} />
              </Section>

              <Section title="Patient Demographics">
                <Field label="Full Name" value={selectedLead.fullName} />
                <Field label="Email Address" value={selectedLead.email} />
                <Field label="Mobile Number" value={selectedLead.mobileNumber} />
                <Field label="City Location" value={selectedLead.city} />
                <Field label="State Region" value={selectedLead.state} />
              </Section>

              <Section title="Clinical Parameters">
                <Field label="Primary Complaint" value={selectedLead.interestedCourse} />
                <Field label="Preferred Lang" value={selectedLead.preferredLanguage} />
                <Field label="Intake Verified" value="Yes (OTP Confirmed)" />
              </Section>

              {selectedLead.message && (
                <Section title="Inbound Form Text & Patient Notes">
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3.5 leading-relaxed font-medium">{selectedLead.message}</p>
                </Section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Record Deletion Overlay Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setDeleteModal({ open: false, id: "", name: "" })} />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 z-10">
            <h3 className="text-base font-bold text-gray-900">Confirm Deletion</h3>
            <p className="text-sm text-gray-500 leading-normal">
              Are you sure you want to dismiss the case request for <span className="font-bold text-gray-900">"{deleteModal.name}"</span>? This will wipe the lead reference from this session layout.
            </p>
            <div className="flex justify-end gap-3 pt-1 text-sm">
              <button
                onClick={() => setDeleteModal({ open: false, id: "", name: "" })}
                className="px-4 py-2 font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-40"
              >
                {deleting ? "Purging Case..." : "Confirm Dismissal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;