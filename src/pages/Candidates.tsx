import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import type { Candidate } from "../services/seed/candidateSeed";
import type { Job } from "../services/seed/jobsSeed";
import NotesWithMentions from "../components/NotesWithMentions";
import { toast } from "react-hot-toast";

const Candidates: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobFilter = searchParams.get("job");

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedCandidate, setDraggedCandidate] = useState<Candidate | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [quickNote, setQuickNote] = useState("");

  const stages = [
    { id: "applied", name: "Applied", color: "bg-blue-100 text-blue-800" },
    {
      id: "screening",
      name: "Screening",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "interview",
      name: "Interview",
      color: "bg-purple-100 text-purple-800",
    },
    { id: "offer", name: "Offer", color: "bg-green-100 text-green-800" },
    { id: "rejected", name: "Rejected", color: "bg-red-100 text-red-800" },
    { id: "hired", name: "Hired", color: "bg-emerald-100 text-emerald-800" },
  ];

  const fetchCandidates = async () => {
    try {
      setLoading(true);

      // Build URL with filters - NO pagination for kanban view
      let url = "/candidates";
      const params = new URLSearchParams();

      if (jobFilter) {
        params.append("jobId", jobFilter);
      }

      if (debouncedSearch) {
        params.append("search", debouncedSearch);
      }

      if (stageFilter) {
        params.append("stage", stageFilter);
      }

      // Don't add pagination - we need all candidates for kanban

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url);
      const newData: Candidate[] = response?.data?.data || [];
      setCandidates(newData);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
      toast.error("Failed to load candidates. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/jobs");
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch candidates when filters change
  useEffect(() => {
    if (jobs.length > 0 || !jobFilter) {
      fetchCandidates();
    }
  }, [jobFilter, debouncedSearch, stageFilter, jobs.length]);

  // Debounce search input for smooth UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const getCandidatesByStage = (stageId: string) => {
    return candidates.filter((candidate) => candidate.stage === stageId);
  };

  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    return job ? job.title : "Unknown Job";
  };
  const handleDeleteCandidate = async (candidateId: string) => {
    try {
      await axios.delete(`/applications/${candidateId}`);
      toast.success("Candidate deleted successfully");
      fetchCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error("Error deleting candidate");
    }
  };

  const handleDragStart = (e: React.DragEvent, candidate: Candidate) => {
    setDraggedCandidate(candidate);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();

    if (!draggedCandidate || draggedCandidate.stage === targetStage) {
      return;
    }

    try {
      await axios.patch(`/applications/${draggedCandidate.id}/status`, {
        status: targetStage,
      });

      // Update local state
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate.id === draggedCandidate.id
            ? { ...candidate, stage: targetStage as Candidate["stage"] }
            : candidate
        )
      );
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }

    setDraggedCandidate(null);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleAddNote = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setQuickNote("");
    setShowNotesModal(true);
  };

  const handleSaveNote = () => {
    if (!selectedCandidate || !quickNote.trim()) return;

    const noteWithTimestamp = `[${new Date().toLocaleString()}] ${quickNote}`;
    const existingNotes =
      localStorage.getItem(`candidate-notes-${selectedCandidate.id}`) || "";
    const updatedNotes = existingNotes
      ? `${existingNotes}\n\n${noteWithTimestamp}`
      : noteWithTimestamp;

    localStorage.setItem(
      `candidate-notes-${selectedCandidate.id}`,
      updatedNotes
    );
    setShowNotesModal(false);
    setSelectedCandidate(null);
    setQuickNote("");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12">
      <div className="mb-12">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block text-purple-600 font-bold text-sm uppercase tracking-widest mb-4">
              Management
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-tight mb-4">
              CANDIDATES
            </h1>
            <p className="text-xl text-gray-600 font-light">
              {jobFilter
                ? `Applications for ${getJobTitle(jobFilter)}`
                : "Manage candidate applications"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {jobFilter && (
              <button
                onClick={() => navigate("/dashboard/candidates")}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer"
              >
                View All Applications
              </button>
            )}

            <div className="bg-black text-white px-6 py-3 text-lg font-bold border-2 border-black">
              TOTAL: {candidates.length}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical tabs + board layout */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Vertical Tabs Sidebar */}
        <aside className="lg:col-span-1 bg-black border-2 border-purple-600/30 p-6 h-max">
          <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-6">Stages</h3>
          <div className="flex lg:flex-col flex-row gap-2 overflow-x-auto">
            <button
              onClick={() => setStageFilter("")}
              className={`px-4 py-3 text-sm font-bold border-2 transition-all cursor-pointer hover-lift ${
                stageFilter === ""
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-purple-900/50 text-white hover:border-purple-500 hover:bg-purple-600/20"
              }`}
            >
              All
            </button>
            {stages.map((s) => (
              <button
                key={s.id}
                onClick={() => setStageFilter(s.id)}
                className={`px-4 py-3 text-sm font-bold border-2 transition-all cursor-pointer text-left hover-lift ${
                  stageFilter === s.id
                    ? "bg-purple-600 text-white border-purple-600"
                    : "border-purple-900/50 text-white hover:border-purple-500 hover:bg-purple-600/20"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
              Search Candidates
            </label>
            <input
              type="text"
              placeholder="Search name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border-2 border-purple-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/20 transition-all"
            />
          </div>
          <button
            onClick={() => {
              setSearch("");
              setStageFilter("");
            }}
            className="mt-3 w-full px-4 py-2 text-sm cursor-pointer border-2 border-purple-600/50 text-white font-bold hover:bg-purple-600/20 hover:border-purple-500 transition-all"
          >
            Clear Filters
          </button>
        </aside>

        {/* Kanban Board */}
        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stages.map((stage) => {
          const stageCandidates = getCandidatesByStage(stage.id);

          return (
            <div
              key={stage.id}
              className="bg-white border-2 border-black p-4 min-h-[600px] flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className="flex items-center justify-between mb-4 flex-shrink-0 pb-3 border-b-2 border-black">
                <h3 className="font-black text-black text-lg uppercase">
                  {stage.name}
                </h3>
                <span className="px-4 py-2 bg-black text-white text-sm font-bold border-2 border-black">
                  {stageCandidates.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate)}
                    className="flex flex-col justify-between gap-1 bg-black text-white p-4 border-2 border-purple-600/30 hover:border-purple-500 hover:shadow-xl transition-all cursor-move mb-3 hover-lift"
                  >
                    {/* Name and Email */}
                    <div className="mb-2">
                      <h4 className="font-bold text-white text-base truncate">
                        {candidate.name}
                      </h4>
                      <p className="text-xs text-gray-300 truncate">
                        {candidate.email}
                      </p>
                    </div>

                    {/* Job Title and Applied Date */}
                    <div className="mb-2">
                      <p className="text-xs text-purple-400 font-bold truncate">
                        {getJobTitle(candidate.jobId)}
                      </p>
                      <p className="text-xs text-gray-400">
                        Applied: {formatDate(candidate.appliedAt)}
                      </p>
                    </div>

                    {/* Skills */}
                    {candidate.skills && candidate.skills.length > 0 && (
                      <div className="mb-2">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-600/30 border border-purple-500/50 text-white text-xs font-bold truncate max-w-[80px]"
                              title={skill}
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{candidate.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Experience - Limited to 2 lines */}
                    {candidate.experience && (
                      <div className="mb-3">
                        <p
                          className="text-xs text-gray-300 leading-tight overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            maxHeight: "2.4em",
                            lineHeight: "1.2em",
                          }}
                          title={candidate.experience}
                        >
                          {candidate.experience}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-purple-600/30">
                      <button
                        onClick={() => {
                          navigate(`/candidates/${candidate.id}`);
                        }}
                        className="cursor-pointer border-2 border-purple-600 text-xs text-purple-400 hover:bg-purple-600 hover:text-white font-bold px-3 py-1 transition-all"
                      >
                        VIEW
                      </button>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAddNote(candidate)}
                          className="cursor-pointer text-xs text-purple-400 hover:text-purple-300 p-2 rounded hover:bg-purple-600/20 transition-all"
                          title="Add Notes"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteCandidate(candidate.id)}
                          className="cursor-pointer text-xs text-red-400 hover:text-red-300 p-2 rounded hover:bg-red-900/20 transition-all"
                          title="Delete"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="text-center py-12 text-gray-400 text-base font-bold">
                    NO CANDIDATES
                  </div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black border-2 border-purple-600 p-8 w-full max-w-md mx-4">
            <h3 className="text-2xl font-black text-white mb-6">
              Add Note for {selectedCandidate.name}
            </h3>
            <NotesWithMentions
              value={quickNote}
              onChange={setQuickNote}
              placeholder="Add a quick note... (use @ to mention team members)"
              rows={4}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowNotesModal(false);
                  setSelectedCandidate(null);
                  setQuickNote("");
                }}
                className="px-6 py-3 cursor-pointer text-white border-2 border-purple-600/50 font-bold hover:bg-purple-600/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-6 py-3 cursor-pointer bg-purple-600 text-white font-bold border-2 border-purple-600 hover:bg-purple-700 transition-all hover-lift"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
