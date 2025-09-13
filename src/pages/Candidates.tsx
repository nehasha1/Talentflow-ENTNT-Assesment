import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Candidate } from "../services/seed/candidateSeed";

interface CandidatesResponse {
  data: Candidate[];
  total: number;
  page: number;
  pageSize: number;
}

const Candidates: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [pageSize] = useState(20);
  const [view, setView] = useState<"list" | "kanban">("list");

  const stages = [
    { key: "applied", label: "Applied", color: "bg-blue-100 text-blue-800" },
    { key: "screen", label: "Screen", color: "bg-yellow-100 text-yellow-800" },
    {
      key: "tech",
      label: "Tech Interview",
      color: "bg-purple-100 text-purple-800",
    },
    { key: "offer", label: "Offer", color: "bg-green-100 text-green-800" },
    { key: "hired", label: "Hired", color: "bg-emerald-100 text-emerald-800" },
    { key: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  ];

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await axios.get<CandidatesResponse>("/candidates", {
        params: {
          search,
          stage: stageFilter,
          page: currentPage,
          pageSize,
        },
      });
      setCandidates(response.data.data);
      setTotalCandidates(response.data.total);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [search, stageFilter, currentPage, pageSize]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStageFilter = (stage: string) => {
    setStageFilter(stage);
    setCurrentPage(1);
  };

  const handleStageChange = async (candidateId: string, newStage: string) => {
    try {
      await axios.patch(`/candidates/${candidateId}`, { stage: newStage });
      fetchCandidates();
    } catch (error) {
      console.error("Error updating candidate stage:", error);
    }
  };

  // Group candidates by stage for kanban view
  const candidatesByStage = useMemo(() => {
    const grouped: Record<string, Candidate[]> = {};
    stages.forEach((stage) => {
      grouped[stage.key] = [];
    });

    candidates.forEach((candidate) => {
      if (grouped[candidate.stage]) {
        grouped[candidate.stage].push(candidate);
      }
    });

    return grouped;
  }, [candidates]);

  const totalPages = Math.ceil(totalCandidates / pageSize);

  if (loading && candidates.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Candidates
            </h1>
            <p className="text-gray-600">
              Manage and track your candidate pipeline
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView("list")}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  view === "list"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView("kanban")}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  view === "kanban"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Kanban View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search candidates by name or email..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={stageFilter}
              onChange={(e) => handleStageFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">All Stages</option>
              {stages.map((stage) => (
                <option key={stage.key} value={stage.key}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {view === "list" ? (
        /* List View */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {candidates.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No candidates found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {search || stageFilter
                  ? "Try adjusting your search criteria."
                  : "Candidates will appear here when they apply for jobs."}
              </p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-medium text-lg">
                            {candidate.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {candidate.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {candidate.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            Applied:{" "}
                            {new Date(candidate.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <select
                            value={candidate.stage}
                            onChange={(e) =>
                              handleStageChange(candidate.id, e.target.value)
                            }
                            className={`px-3 py-1 text-sm font-medium rounded-full border-0 focus:ring-2 focus:ring-emerald-500 ${
                              stages.find((s) => s.key === candidate.stage)
                                ?.color || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {stages.map((stage) => (
                              <option key={stage.key} value={stage.key}>
                                {stage.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/candidates/${candidate.id}`)
                          }
                          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {(currentPage - 1) * pageSize + 1} to{" "}
                      {Math.min(currentPage * pageSize, totalCandidates)} of{" "}
                      {totalCandidates} candidates
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-1 text-sm border rounded-md ${
                            currentPage === i + 1
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.key}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {stage.label}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${stage.color}`}
                  >
                    {candidatesByStage[stage.key]?.length || 0}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {candidatesByStage[stage.key]?.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate(`/candidates/${candidate.id}`)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-medium text-xs">
                          {candidate.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {candidate.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">
                      {candidate.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(candidate.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {(!candidatesByStage[stage.key] ||
                  candidatesByStage[stage.key].length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-xs text-gray-400">No candidates</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Candidates;
