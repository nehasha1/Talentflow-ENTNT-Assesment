import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import type { Application } from "../types/applications";
import type { Job } from "../services/seed/jobsSeed";
import { ensureApplicationsExist } from "../services/db/applicationsDb";

const Candidates: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobFilter = searchParams.get("job");

  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedApplication, setDraggedApplication] =
    useState<Application | null>(null);

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

  const fetchApplications = async () => {
    try {
      setLoading(true);

      // First, ensure applications exist (auto-create from candidates if needed)
      const applicationsCreated = await ensureApplicationsExist();
      if (applicationsCreated) {
        console.log(
          "fetchApplications: Applications were auto-created from candidates"
        );
      }

      // Then fetch applications
      const url = jobFilter
        ? `/applications?jobId=${jobFilter}`
        : "/applications";
      const response = await axios.get<Application[]>(url);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
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
    fetchApplications();
    fetchJobs();
  }, [jobFilter]);

  const getApplicationsByStage = (stageId: string) => {
    return applications.filter((app) => app.status === stageId);
  };

  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    return job ? job.title : "Unknown Job";
  };

  const handleDragStart = (e: React.DragEvent, application: Application) => {
    setDraggedApplication(application);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();

    if (!draggedApplication || draggedApplication.status === targetStage) {
      return;
    }

    try {
      await axios.patch(`/applications/${draggedApplication.id}/status`, {
        status: targetStage,
      });

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === draggedApplication.id
            ? { ...app, status: targetStage as Application["status"] }
            : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
    }

    setDraggedApplication(null);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Candidates
            </h1>
            <p className="text-gray-600">
              {jobFilter
                ? `Applications for ${getJobTitle(jobFilter)}`
                : "Manage candidate applications"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {jobFilter && (
              <button
                onClick={() => navigate("/dashboard/candidates")}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                View All Applications
              </button>
            )}
            <div className="text-sm text-gray-600">
              Total: {applications.length} applications
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stages.map((stage) => {
          const stageApplications = getApplicationsByStage(stage.id);

          return (
            <div
              key={stage.id}
              className="bg-gray-50 rounded-lg p-4 min-h-[600px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${stage.color}`}
                >
                  {stageApplications.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageApplications.map((application) => (
                  <div
                    key={application.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, application)}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-move"
                  >
                    <div className="mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {application.candidateName}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {application.candidateEmail}
                      </p>
                    </div>

                    <div className="mb-2">
                      <p className="text-xs text-gray-700 font-medium">
                        {getJobTitle(application.jobId)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Applied: {formatDate(application.appliedAt)}
                      </p>
                    </div>

                    {application.skills && application.skills.length > 0 && (
                      <div className="mb-2">
                        <div className="flex flex-wrap gap-1">
                          {application.skills
                            .slice(0, 3)
                            .map((skill, index) => (
                              <span
                                key={index}
                                className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          {application.skills.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{application.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {application.experience && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {application.experience.substring(0, 100)}
                          {application.experience.length > 100 && "..."}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          // TODO: Open application details modal
                          console.log("View application:", application.id);
                        }}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          // TODO: Add notes functionality
                          console.log("Add notes:", application.id);
                        }}
                        className="text-xs text-gray-600 hover:text-gray-700"
                      >
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {stageApplications.length === 0 && (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No applications in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Candidates;
