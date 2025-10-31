import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import type { Job } from "../services/seed/jobsSeed";
import type { Assessment } from "../services/seed/assessmentsSeed";
import { toast } from "react-hot-toast";

interface AssessmentsResponse {
  data: Assessment[];
  total: number;
}

const Assessments: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [showBuilder, setShowBuilder] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assessmentsResponse, jobsResponse] = await Promise.all([
        axios.get<AssessmentsResponse>("/assessments"),
        axios.get("/jobs?pageSize=100"), // Get all jobs for dropdown
      ]);

      setAssessments(assessmentsResponse.data.data);
      // console.log(assessmentsResponse.data);

      // console.log(assessmentsResponse.data.data);
      // console.log(assessments);

      setJobs(jobsResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Refresh data when navigating back to this page
  useEffect(() => {
    if (location.pathname === "/dashboard/assessments") {
      fetchData();
    }
  }, [location.pathname]);

  // Refresh data when component becomes visible (e.g., when navigating back)
  useEffect(() => {
    const handleFocus = () => {
      fetchData();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleDeleteAssessment = async (assessmentId: string) => {
    try {
      await axios.delete(`/assessments/${assessmentId}`);
      toast.success("Assessment deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting assessment:", error);
      toast.error("Error deleting assessment");
    }
  };

  // const handleCreateAssessment = (jobId: string) => {
  //   setSelectedJob(jobId);
  //   setShowBuilder(true);
  // };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
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
      <div className="mb-12">
        <div className="flex gap-6 justify-between items-start">
          <div>
            <div className="inline-block text-purple-600 font-bold text-sm uppercase tracking-widest mb-4">
              Management
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-tight mb-4">
              ASSESSMENTS
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Create and manage candidate assessments
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                if (showBuilder) {
                  return navigate(`/assessments/builder/${selectedJob}`);
                } else {
                  setShowBuilder(true);
                }
              }}
              className="bg-purple-600 cursor-pointer text-white px-8 py-4 font-bold hover:bg-purple-700 transition-all duration-200 flex items-center space-x-2 border-2 border-purple-600 hover-lift"
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
            {showBuilder && (
              <button
                onClick={() => setShowBuilder(false)}
                className="bg-black cursor-pointer text-white px-8 py-4 font-bold hover:bg-gray-800 transition-all duration-200 border-2 border-black hover-lift"
              >
                <span>CANCEL</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Job Selection */}
      {showBuilder && (
        <div className="bg-black border-2 border-purple-600/30 p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-6 uppercase">
            Select Job for Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`p-6 border-2 cursor-pointer transition-all duration-200 hover-lift ${
                  selectedJob === job.id
                    ? "border-purple-600 bg-purple-600/20"
                    : "border-purple-900/50 hover:border-purple-500 hover:bg-purple-600/10"
                }`}
                onClick={() => setSelectedJob(job.id)}
              >
                <h3 className="font-bold text-white text-lg mb-2">{job.title}</h3>
                <p className="text-sm text-purple-400 font-medium">{job.jobType}</p>
                <p className="text-xs text-gray-400 mt-1">{job.location}</p>
              </div>
            ))}
          </div>
          {selectedJob && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => navigate(`/assessments/builder/${selectedJob}`)}
                className="px-8 py-4 cursor-pointer bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all duration-200 border-2 border-purple-600 hover-lift"
              >
                CREATE ASSESSMENT →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Assessments List */}
      <div className="bg-white border-2 border-black">
        {assessments.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No assessments created yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first assessment.
            </p>
          </div>
        ) : (
          <div className="divide-y-2 divide-gray-200">
            {assessments.map((assessment) => {
              const job = jobs.find((j) => j.id === assessment.jobId);
              return (
                <div
                  key={assessment.id}
                  className="p-8 hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <h3 className="text-2xl font-black text-black group-hover:text-white transition-colors">
                          Assessment for {job?.title || "Unknown Job"}
                        </h3>
                      </div>
                      <span className="px-4 py-2 text-sm font-bold border-2 border-purple-600 bg-purple-600 text-white mb-4 inline-block">
                        {assessment.sections.length} SECTIONS
                      </span>
                      <p className="text-base text-gray-600 group-hover:text-gray-300 my-2 font-medium">
                        {job?.jobType} • {job?.location}
                      </p>
                      <p className="text-lg text-black group-hover:text-white font-bold">
                        Total Questions:{" "}
                        {assessment.sections.reduce(
                          (total, section) => total + section.questions.length,
                          0
                        )}
                      </p>
                    </div>

                    <div className="flex sm:flex-row flex-col items-center space-x-2 sm:space-y-0 space-y-2 ml-4">
                      <button
                        onClick={() =>
                          navigate(`/assessments/builder/${assessment.jobId}`)
                        }
                        className="px-4 py-2 border-2 border-black text-black cursor-pointer hover:bg-black hover:text-white text-sm font-bold transition-all hover-lift"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/assessments/preview/${assessment.jobId}`)
                        }
                        className="px-4 py-2 border-2 border-purple-600 text-purple-600 cursor-pointer hover:bg-purple-600 hover:text-white text-sm font-bold transition-all hover-lift"
                      >
                        PREVIEW
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/assessments/results/${assessment.jobId}`)
                        }
                        className="px-4 py-2 bg-black text-white cursor-pointer hover:bg-gray-800 text-sm font-bold border-2 border-black transition-all hover-lift"
                      >
                        RESULTS
                      </button>
                      <button
                        onClick={() => handleDeleteAssessment(assessment.id)}
                        className="px-4 py-2 border-2 border-red-600 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white text-sm font-bold transition-all hover-lift"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessments;
