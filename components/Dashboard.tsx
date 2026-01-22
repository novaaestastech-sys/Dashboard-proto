"use client";

import { FolderPlus, Folders, FileText, Scale, Clock, Bell, MessageSquare } from "lucide-react";

// Placeholder data for recent workspaces
const recentWorkspaces = [
    {
        id: 1,
        name: "Johnson Estate Planning",
        documents: [
            { name: "Last Will & Testament", type: "Will" },
            { name: "Power of Attorney", type: "POA" },
            { name: "Healthcare Directive", type: "Directive" },
        ],
        lastModified: "2 hours ago",
    },
    {
        id: 2,
        name: "TechCorp Merger",
        documents: [
            { name: "Merger Agreement", type: "Contract" },
            { name: "Non-Disclosure Agreement", type: "NDA" },
            { name: "Due Diligence Checklist", type: "Checklist" },
            { name: "Asset Purchase Agreement", type: "Contract" },
        ],
        lastModified: "5 hours ago",
    },
    {
        id: 3,
        name: "Smith vs. Anderson",
        documents: [
            { name: "Complaint Filing", type: "Litigation" },
            { name: "Discovery Request", type: "Litigation" },
            { name: "Motion to Dismiss", type: "Motion" },
        ],
        lastModified: "1 day ago",
    },
    {
        id: 4,
        name: "Real Estate - 123 Oak Street",
        documents: [
            { name: "Purchase Agreement", type: "Contract" },
            { name: "Title Insurance", type: "Insurance" },
            { name: "Closing Documents", type: "Closing" },
        ],
        lastModified: "3 days ago",
    },
];

// Placeholder notifications
const notifications = [
    { id: 1, text: "Document 'NDA Draft' awaiting review", time: "10 min ago" },
    { id: 2, text: "Client Johnson signed Will document", time: "1 hour ago" },
    { id: 3, text: "Deadline: Smith case filing due tomorrow", time: "2 hours ago" },
];

const Dashboard = () => {
    return (
        <div className="w-full bg-neutral-950 p-3 sm:p-4 md:p-6 min-h-screen md:h-screen overflow-y-auto md:overflow-hidden rounded-none sm:rounded-l-xl md:rounded-l-2xl">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-5 h-auto lg:h-full">

                {/* LEFT SIDE */}
                <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5 lg:h-full lg:overflow-hidden">
                    {/* Search Bar */}
                    <div className="h-11 sm:h-12 shrink-0 rounded-xl bg-neutral-900 flex items-center px-3 sm:px-4 text-neutral-500 text-sm sm:text-base border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/80 transition-all duration-300 cursor-text active:bg-neutral-800/90">
                        <svg className="w-4 h-4 mr-2 sm:mr-3 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="truncate">Search documents, workspaces...</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-5 shrink-0">
                        <div className="h-16 sm:h-20 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center gap-2 sm:gap-3 text-neutral-200 hover:border-neutral-600 hover:bg-neutral-800/80 active:bg-neutral-800 transition-all duration-300 cursor-pointer group">
                            <FolderPlus className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-neutral-200 group-active:text-neutral-200 group-hover:scale-110 transition-all" />
                            <span className="font-medium text-sm sm:text-base">New Workspace</span>
                        </div>
                        <div className="h-16 sm:h-20 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center gap-2 sm:gap-3 text-neutral-200 hover:border-neutral-600 hover:bg-neutral-800/80 active:bg-neutral-800 transition-all duration-300 cursor-pointer group">
                            <Folders className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-neutral-200 group-active:text-neutral-200 group-hover:scale-110 transition-all" />
                            <span className="font-medium text-sm sm:text-base">All Workspaces</span>
                        </div>
                    </div>

                    {/* Recent Workspaces */}
                    <div className="rounded-xl sm:rounded-2xl bg-neutral-900/80 p-4 sm:p-5 flex-1 lg:overflow-hidden border border-neutral-800">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h2 className="text-base sm:text-lg font-semibold text-neutral-100 flex items-center gap-2">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                                Recent Workspaces
                            </h2>
                        </div>

                        <div className="space-y-2 sm:space-y-3 lg:h-[calc(100%-2.5rem)] lg:overflow-y-auto scrollbar-hide lg:pr-1">
                            {recentWorkspaces.map((workspace) => (
                                <div
                                    key={workspace.id}
                                    className="p-3 sm:p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 active:border-neutral-500 hover:bg-neutral-900/50 active:bg-neutral-900/70 transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                                        <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                                            <Scale className="w-4 h-4 text-neutral-500 shrink-0" />
                                            <h3 className="font-medium text-sm sm:text-base text-neutral-100 group-hover:text-white transition-colors truncate">{workspace.name}</h3>
                                        </div>
                                        <span className="text-xs text-neutral-600 shrink-0">{workspace.lastModified}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-neutral-900 text-xs text-neutral-400 border border-neutral-800 w-fit">
                                        <FileText className="w-3 h-3 text-neutral-500" />
                                        <span>{workspace.documents.length} docs</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Interactive height container */}
                <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 lg:h-full lg:overflow-hidden group/sidebar">

                    {/* Notifications - Shrinks when chatbot is hovered */}
                    <div className="rounded-xl sm:rounded-2xl bg-neutral-900/80 p-4 sm:p-5 overflow-hidden border border-neutral-800 transition-all duration-500 ease-out lg:flex-[2] lg:group-hover/chatbot:flex-[1] lg:min-h-0 flex flex-col">
                        <h2 className="text-base sm:text-lg font-semibold text-neutral-100 mb-3 sm:mb-4 flex items-center gap-2 shrink-0">
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                            Notifications
                        </h2>
                        <div className="space-y-2 sm:space-y-3 flex-1 lg:overflow-y-auto scrollbar-hide">
                            {notifications.map((notif) => (
                                <div key={notif.id} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 active:border-neutral-500 hover:bg-neutral-900/50 active:bg-neutral-900/70 transition-all duration-300 cursor-pointer">
                                    <p className="text-sm text-neutral-200">{notif.text}</p>
                                    <p className="text-xs text-neutral-600 mt-1 sm:mt-1.5">{notif.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legal Assistant (Chatbot) - Expands on hover */}
                    <div className="group/chatbot rounded-xl sm:rounded-2xl bg-neutral-900/80 p-4 sm:p-5 overflow-hidden flex flex-col border border-neutral-800 transition-all duration-500 ease-out lg:flex-[2] lg:hover:flex-[4] lg:min-h-0">
                        <h2 className="text-base sm:text-lg font-semibold text-neutral-100 mb-3 sm:mb-4 flex items-center gap-2 shrink-0">
                            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                            Legal Assistant
                        </h2>
                        <div className="flex-1 flex items-center justify-center text-neutral-500 text-sm lg:overflow-y-auto scrollbar-hide">
                            <div className="text-center p-3 sm:p-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 sm:w-7 sm:h-7 text-neutral-400" />
                                </div>
                                <p className="text-xs sm:text-sm">Ask questions about legal documents,<br className="hidden sm:inline" /><span className="sm:hidden"> </span>get drafting assistance, or find templates.</p>
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 p-3 sm:p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-500 text-sm shrink-0 flex items-center gap-2 hover:border-neutral-600 active:border-neutral-500 transition-colors cursor-text">
                            <span className="flex-1 truncate">Type a message...</span>
                            <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-neutral-700 flex items-center justify-center hover:bg-neutral-600 active:bg-neutral-500 transition-colors cursor-pointer shrink-0">
                                <svg className="w-4 h-4 text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;

