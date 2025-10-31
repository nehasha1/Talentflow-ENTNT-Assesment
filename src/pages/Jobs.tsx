import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Job } from "../services/seed/jobsSeed";
// Applications are now handled by candidates
import JobModal from "../components/Jobs/JobModal";
import { DeleteConfirmationModal } from "../components/Jobs/DeleteConfirmationModal";
import { toast } from "react-hot-toast";

interface JobsResponse {
  data: Job[];
  total: number;
  page: number;
  pageSize: number;
}

const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobApplicationCounts, setJobApplicationCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pageSize] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get<JobsResponse>("/jobs", {
        params: {
          search,
          status: statusFilter,
          page: currentPage,
          pageSize,
        },
      });

      // Show all jobs (no company filtering)
      setJobs(response.data.data);
      setTotalJobs(response.data.total);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationCounts = async () => {
    try {
      const response = await axios.get("/applications/job-counts");
      setJobApplicationCounts(response.data || {});
    } catch (error) {
      console.error("Error fetching application counts:", error);
      setJobApplicationCounts({});
    }
  };

  // Applications are now handled by candidates, so we don't need this function

  useEffect(() => {
    fetchJobs();
    fetchApplicationCounts();
  }, [search, statusFilter, currentPage, pageSize]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleArchive = async (job: Job) => {
    try {
      await axios.patch(`/jobs/${job.id}`, {
        status: job.status === "active" ? "archived" : "active",
      });
      fetchJobs();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      // Note: We'll need to add DELETE endpoint to handlers
      await axios.delete(`/jobs/${jobId}`);
      toast.success("Job deleted successfully");
      fetchJobs();
      setShowDeleteModal(false);
      setJobToDelete(null);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    }
  };

  const getApplicationsForJob = (jobId: string) => {
    const count = jobApplicationCounts[jobId] || 0;
    return { length: count } as any;
  };

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    const newJobs = [...jobs];
    const [movedJob] = newJobs.splice(fromIndex, 1);
    newJobs.splice(toIndex, 0, movedJob);

    // Optimistic update
    setJobs(newJobs);

    try {
      await axios.patch(`/jobs/${movedJob.id}/reorder`, {
        fromOrder: fromIndex,
        toOrder: toIndex,
      });
    } catch (error) {
      console.error("Error reordering jobs:", error);
      // Rollback on failure
      fetchJobs();
    }
  };

  const handleDragStart = (e: React.DragEvent, job: Job) => {
    setDraggedJob(job);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();

    if (!draggedJob) return;

    const draggedIndex = jobs.findIndex((job) => job.id === draggedJob.id);
    if (draggedIndex === -1 || draggedIndex === targetIndex) {
      setDraggedJob(null);
      return;
    }

    handleReorder(draggedIndex, targetIndex);
    setDraggedJob(null);
  };

  const totalPages = Math.ceil(totalJobs / pageSize);

  if (loading && jobs.length === 0) {
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
    <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-6 justify-between items-start">
          <div>
            <div className="inline-block text-purple-600 font-bold text-sm uppercase tracking-widest mb-4">
              Management
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-tight mb-4">
              JOBS
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Create and manage your job postings
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/dashboard/candidates")}
              className="bg-black cursor-pointer text-white px-6 py-3 font-bold hover:bg-gray-800 transition-all duration-200 flex items-center space-x-2 border-2 border-black hover-lift"
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <span>VIEW CANDIDATES</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 text-white px-6 py-3 font-bold hover:bg-purple-700 transition-all duration-200 flex items-center space-x-2 border-2 border-purple-600 hover-lift"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>CREATE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-black border-2 border-purple-600/30 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search jobs by title or tags..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border-2 border-purple-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/20 transition-all"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border-2 border-purple-600/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/20 transition-all [&>option]:bg-black [&>option]:text-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white border-2 border-black">
        {jobs.length === 0 ? (
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No jobs found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {search || statusFilter
                ? "Try adjusting your search criteria."
                : "Get started by creating your first job posting."}
            </p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, job)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`p-6 border-b-2 border-gray-200 hover:bg-black hover:text-white transition-all duration-300 cursor-move group ${
                    draggedJob?.id === job.id ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400 cursor-move">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-black text-black group-hover:text-white transition-colors">
                            {job.title}
                          </h3>
                          <span
                            className={`px-3 py-1 text-xs font-bold border-2 ${
                              job.status === "active"
                                ? "bg-purple-600 text-white border-purple-600"
                                : "bg-gray-100 text-gray-800 border-gray-300"
                            }`}
                          >
                            {job.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-base font-semibold text-gray-600 group-hover:text-gray-300 mb-2">
                          {job.location}
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-400 mb-3">
                          {job.description.substring(0, 150)}...
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-black text-white text-xs font-bold border border-white/20 group-hover:bg-white group-hover:text-black transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Applications Count */}
                        <div className="mt-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                              />
                            </svg>
                            <span>
                              {getApplicationsForJob(job.id).length}{" "}
                              applications
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-row flex-col items-center space-x-2 sm:space-y-0 space-y-2 ml-4">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/candidates?job=${job.id}`)
                        }
                        className="px-4 py-2 bg-black text-white cursor-pointer hover:bg-gray-800 text-sm font-bold border-2 border-black transition-all hover-lift"
                      >
                        VIEW
                      </button>
                      <button
                        onClick={() => setEditingJob(job)}
                        className="px-4 py-2 border-2 border-black text-black cursor-pointer hover:bg-black hover:text-white text-sm font-bold transition-all hover-lift"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleArchive(job)}
                        className="px-4 py-2 border-2 border-orange-600 text-orange-600 cursor-pointer hover:bg-orange-600 hover:text-white text-sm font-bold transition-all hover-lift"
                      >
                        {job.status === "active" ? "ARCHIVE" : "UNARCHIVE"}
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteModal(true);
                          setJobToDelete(job);
                        }}
                        className="px-4 py-2 border-2 border-red-600 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white text-sm font-bold transition-all hover-lift"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-8 py-6 border-t-2 border-gray-200 bg-gray-50">
                <div className="flex sm:flex-row sm:gap-0 gap-5 flex-col items-center justify-between">
                  <div className="md:text-base text-sm text-black font-bold">
                    Showing {(currentPage - 1) * pageSize + 1} to{" "}
                    {Math.min(currentPage * pageSize, totalJobs)} of {totalJobs}{" "}
                    jobs
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                    >
                      PREVIOUS
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 text-sm font-bold border-2 transition-all hover-lift ${
                          currentPage === i + 1
                            ? "bg-purple-600 text-white border-purple-600"
                            : "border-black text-black hover:bg-black hover:text-white"
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
                      className="px-4 py-2 text-sm font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create/Edit Job Modal */}
      {(showCreateModal || editingJob) && (
        <JobModal
          job={editingJob}
          onClose={() => {
            setShowCreateModal(false);
            setEditingJob(null);
          }}
          onSave={() => {
            fetchJobs();
            setShowCreateModal(false);
            setEditingJob(null);
          }}
        />
      )}

      {/* Delete Job Modal */}
      {showDeleteModal && jobToDelete && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(jobToDelete.id)}
          jobTitle={jobToDelete.title}
        />
      )}
    </div>
  );
};

export default Jobs;
