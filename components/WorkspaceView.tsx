"use client";

import React, { useState } from "react";
import {
    ArrowLeft,
    Plus,
    FileText,
    MoreHorizontal,
    Search,
    Grid3X3,
    List,
    Clock,
    Star,
    Trash2,
    Copy,
    Pencil,
    Check,
    X,
    FileSpreadsheet,
    FileCheck,
    ScrollText,
    Scale,
    ChevronRight,
} from "lucide-react";

// Types
interface Document {
    id: number;
    name: string;
    type: string;
    lastModified: string;
    isFavorite?: boolean;
}

interface Template {
    id: number;
    name: string;
    category: string;
    icon: React.ReactNode;
}

interface WorkspaceViewProps {
    workspaceId?: number;
    workspaceName?: string;
    onBack?: () => void;
}

// Mock data for documents
const mockDocuments: Document[] = [
    { id: 1, name: "Purchase Agreement Draft", type: "Contract", lastModified: "2 hours ago" },
    { id: 2, name: "Non-Disclosure Agreement", type: "NDA", lastModified: "Yesterday" },
    { id: 3, name: "john julio 70", type: "Contract", lastModified: "3 days ago" },
    { id: 4, name: "Meeting Notes - Jan 15", type: "Contract", lastModified: "1 week ago" },
    { id: 5, name: "Mi bomba", type: "NDA", lastModified: "1 week ago" },
    { id: 6, name: "Employment Contract", type: "Contract", lastModified: "2 weeks ago" },
];

// Mock templates
const templates: Template[] = [
    { id: 1, name: "Non-Disclosure Agreement", category: "Contracts", icon: <FileCheck className="w-4 h-4" /> },
    { id: 2, name: "Service Agreement", category: "Contracts", icon: <FileText className="w-4 h-4" /> },
    { id: 3, name: "Employment Contract", category: "Contracts", icon: <ScrollText className="w-4 h-4" /> },
    { id: 4, name: "Last Will & Testament", category: "Estate", icon: <Scale className="w-4 h-4" /> },
    { id: 5, name: "Power of Attorney", category: "Estate", icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 6, name: "Motion to Dismiss", category: "Litigation", icon: <FileText className="w-4 h-4" /> },
];

// Recent templates (for quick access)
const recentTemplates = templates.slice(0, 3);


const WorkspaceView = ({
    workspaceName = "State Vs John Pork",
    onBack,
}: WorkspaceViewProps) => {
    const [documents, setDocuments] = useState<Document[]>(mockDocuments);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(workspaceName);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [templateSearch, setTemplateSearch] = useState("");
    const [hoveredDoc, setHoveredDoc] = useState<number | null>(null);
    const [isLoading] = useState(false);
    const [isTemplatesPanelOpen, setIsTemplatesPanelOpen] = useState(true);

    // Filter documents based on search
    const filteredDocs = documents.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter templates based on search
    const filteredTemplates = templates.filter((template) =>
        template.name.toLowerCase().includes(templateSearch.toLowerCase())
    );

    // Determine grid layout based on document count
    const getGridClass = () => {
        if (filteredDocs.length <= 4) {
            return "grid-cols-2 lg:grid-cols-2";
        }
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    };

    // Handle name save
    const handleNameSave = () => {
        setIsEditing(false);
        // Here you would save to backend
    };

    // Handle document delete
    const handleDeleteDoc = (id: number) => {
        setDocuments(documents.filter((doc) => doc.id !== id));
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse"
                />
            ))}
        </div>
    );

    // Empty state
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-200 mb-2">
                No documents yet
            </h3>
            <p className="text-sm text-neutral-500 text-center max-w-xs mb-6">
                Create your first document or start from a template to get going
            </p>
            <button className="px-5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm font-medium hover:bg-neutral-700 hover:border-neutral-600 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Document
            </button>
        </div>
    );

    // Document card component
    const DocumentCard = ({ doc, isLarge }: { doc: Document; isLarge: boolean }) => (
        <div
            className={`relative group rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all duration-300 cursor-pointer overflow-hidden ${isLarge ? "aspect-[4/3]" : "aspect-[4/3]"
                }`}
            onMouseEnter={() => setHoveredDoc(doc.id)}
            onMouseLeave={() => setHoveredDoc(null)}
        >
            {/* Document preview area */}
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/50">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-600" />
            </div>

            {/* Hover actions */}
            <div
                className={`absolute top-2 right-2 flex gap-1.5 transition-opacity duration-200 ${hoveredDoc === doc.id ? "opacity-100" : "opacity-0"
                    }`}
            >
                <button className="w-7 h-7 rounded-lg bg-neutral-800/90 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors">
                    <Copy className="w-3.5 h-3.5 text-neutral-300" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDoc(doc.id);
                    }}
                    className="w-7 h-7 rounded-lg bg-neutral-800/90 border border-neutral-700 flex items-center justify-center hover:bg-red-900/50 hover:border-red-800 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5 text-neutral-300" />
                </button>
            </div>

            {/* Favorite indicator */}
            {doc.isFavorite && (
                <div className="absolute top-2 left-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
            )}

            {/* Document info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent">
                <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
                        {doc.type}
                    </span>
                </div>
                <h4 className="text-sm font-medium text-neutral-100 truncate group-hover:text-white transition-colors">
                    {doc.name}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {doc.lastModified}
                </p>
            </div>
        </div>
    );

    // New document card
    const NewDocumentCard = ({ isLarge }: { isLarge: boolean }) => (
        <div
            className={`relative group rounded-xl bg-neutral-900/50 border-2 border-dashed border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/30 transition-all duration-300 cursor-pointer flex items-center justify-center ${isLarge ? "aspect-[4/3]" : "aspect-[4/3]"
                }`}
        >
            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:bg-neutral-700 group-hover:scale-105 transition-all duration-300">
                    <Plus className="w-6 h-6 text-neutral-400 group-hover:text-neutral-200" />
                </div>
                <span className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors">
                    New Document
                </span>
            </div>
        </div>
    );

    return (
        <div className="w-full bg-neutral-950 p-3 sm:p-4 md:p-6 min-h-screen md:h-screen overflow-y-auto md:overflow-hidden rounded-none sm:rounded-l-xl md:rounded-l-2xl">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 h-full">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-4 sm:gap-5 lg:overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                        {/* Back button */}
                        <button
                            onClick={onBack}
                            className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-300"
                        >
                            <ArrowLeft className="w-5 h-5 text-neutral-400" />
                        </button>


                        {/* Workspace name */}
                        <div className="flex-1 min-w-0">
                            {isEditing ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-lg font-semibold text-neutral-100 focus:outline-none focus:border-neutral-500"
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleNameSave}
                                        className="w-8 h-8 rounded-lg bg-gray-500 flex items-center justify-center hover:bg-gray-500 transition-colors"
                                    >
                                        <Check className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditedName(workspaceName);
                                        }}
                                        className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-neutral-400" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 group/name">
                                    <h1 className="text-lg sm:text-xl font-semibold text-neutral-100 truncate">
                                        {editedName}
                                    </h1>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover/name:opacity-100 hover:bg-neutral-800 transition-all"
                                    >
                                        <Pencil className="w-3.5 h-3.5 text-neutral-500" />
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Search and View Toggle */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="flex-1 h-11 rounded-xl bg-neutral-900 flex items-center px-3 text-neutral-500 text-sm border border-neutral-800 hover:border-neutral-600 transition-all duration-300">
                            <Search className="w-4 h-4 mr-2 text-neutral-500 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search documents..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-neutral-200 placeholder:text-neutral-500"
                            />
                        </div>

                        {/* View toggle - only show when 5+ docs */}
                        {filteredDocs.length >= 5 && (
                            <div className="flex rounded-xl bg-neutral-900 border border-neutral-800 p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${viewMode === "grid"
                                            ? "bg-neutral-700 text-neutral-200"
                                            : "text-neutral-500 hover:text-neutral-300"
                                        }`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${viewMode === "list"
                                            ? "bg-neutral-700 text-neutral-200"
                                            : "text-neutral-500 hover:text-neutral-300"
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Documents Grid */}
                    <div className="flex-1 lg:overflow-y-auto scrollbar-hide rounded-xl sm:rounded-2xl bg-neutral-900/80 p-4 sm:p-5 border border-neutral-800">
                        {isLoading ? (
                            <LoadingSkeleton />
                        ) : filteredDocs.length === 0 && searchQuery === "" ? (
                            <EmptyState />
                        ) : filteredDocs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-neutral-500">No documents match your search</p>
                            </div>
                        ) : viewMode === "grid" ? (
                            <div className={`grid ${getGridClass()} gap-3 sm:gap-4`}>
                                <NewDocumentCard isLarge={filteredDocs.length <= 4} />
                                {filteredDocs.map((doc) => (
                                    <DocumentCard
                                        key={doc.id}
                                        doc={doc}
                                        isLarge={filteredDocs.length <= 4}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {/* New document row */}
                                <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/30 transition-all cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                        <Plus className="w-5 h-5 text-neutral-400" />
                                    </div>
                                    <span className="text-sm text-neutral-400">Create new document</span>
                                </div>
                                {filteredDocs.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/50 transition-all cursor-pointer group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-neutral-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-neutral-100 truncate">
                                                {doc.name}
                                            </h4>
                                            <p className="text-xs text-neutral-500">{doc.type}</p>
                                        </div>
                                        <span className="text-xs text-neutral-500 hidden sm:block">
                                            {doc.lastModified}
                                        </span>
                                        {doc.isFavorite && (
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        )}
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-neutral-800 transition-all">
                                            <MoreHorizontal className="w-4 h-4 text-neutral-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Templates Sidebar - Desktop */}
                <div
                    className={`hidden lg:flex flex-col gap-4 transition-all duration-300 ${isTemplatesPanelOpen ? "w-72 xl:w-80" : "w-12"
                        }`}
                >
                    {/* Toggle button */}
                    <button
                        onClick={() => setIsTemplatesPanelOpen(!isTemplatesPanelOpen)}
                        className={`w-full h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-300 ${!isTemplatesPanelOpen ? "px-0" : "px-3"
                            }`}
                    >
                        <ChevronRight
                            className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isTemplatesPanelOpen ? "rotate-180" : ""
                                }`}
                        />
                        {isTemplatesPanelOpen && (
                            <span className="ml-2 text-sm text-neutral-400">Templates</span>
                        )}
                    </button>

                    {isTemplatesPanelOpen && (
                        <div className="flex-1 rounded-2xl bg-neutral-900/80 p-4 sm:p-5 border border-neutral-800 overflow-hidden flex flex-col">
                            {/* Template search */}
                            <div className="h-10 rounded-xl bg-neutral-950 flex items-center px-3 text-neutral-500 text-sm border border-neutral-800 mb-4 shrink-0">
                                <Search className="w-4 h-4 mr-2 text-neutral-500 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    value={templateSearch}
                                    onChange={(e) => setTemplateSearch(e.target.value)}
                                    className="flex-1 bg-transparent outline-none text-neutral-200 placeholder:text-neutral-500 text-sm"
                                />
                            </div>

                            {/* Recently used section */}
                            {templateSearch === "" && (
                                <div className="mb-4 shrink-0">
                                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                                        Recently Used
                                    </h3>
                                    <div className="space-y-1.5">
                                        {recentTemplates.map((template) => (
                                            <div
                                                key={template.id}
                                                className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                                    {template.icon}
                                                </div>
                                                <span className="text-sm text-neutral-300 truncate">
                                                    {template.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All templates */}
                            <div className="flex-1 ">
                                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 sticky top-0 py-1">
                                    All Templates
                                </h3>
                                <div className="overflow-y-auto scrollbar-hide">
                                    {filteredTemplates.map((template) => (
                                        <div
                                            key={template.id}
                                            className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                                {template.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-sm text-neutral-300 truncate block">
                                                    {template.name}
                                                </span>
                                                <span className="text-xs text-neutral-600">
                                                    {template.category}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Templates - Mobile (Bottom Section) */}
                <div className="lg:hidden rounded-2xl bg-neutral-900/80 p-4 border border-neutral-800">
                    <h3 className="text-sm font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-neutral-400" />
                        Quick Templates
                    </h3>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                        {templates.slice(0, 4).map((template) => (
                            <div
                                key={template.id}
                                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
                            >
                                <div className="w-6 h-6 rounded flex items-center justify-center text-neutral-400">
                                    {template.icon}
                                </div>
                                <span className="text-sm text-neutral-300 whitespace-nowrap">
                                    {template.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceView;
