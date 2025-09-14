import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Job } from "../services/seed/jobsSeed";
import type { Assessment } from "../services/seed/assessmentsSeed";

interface AssessmentsResponse {
  data: Assessment[];
  total: number;
}

const Assessments: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Assessments
            </h1>
            <p className="text-gray-600">
              Create and manage candidate assessments
            </p>
          </div>
          <button
            onClick={() => setShowBuilder(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
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
            <span>Create Assessment</span>
          </button>
        </div>
      </div>

      {/* Job Selection */}
      {showBuilder && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Select Job for Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedJob === job.id
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedJob(job.id)}
              >
                <h3 className="font-medium text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.jobType}</p>
                <p className="text-xs text-gray-500 mt-1">{job.location}</p>
              </div>
            ))}
          </div>
          {selectedJob && (
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowBuilder(false);
                  setSelectedJob("");
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate(`/assessments/builder/${selectedJob}`)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Create Assessment
              </button>
            </div>
          )}
        </div>
      )}

      {/* Assessments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
          <div className="divide-y divide-gray-200">
            {assessments.map((assessment) => {
              const job = jobs.find((j) => j.id === assessment.jobId);
              return (
                <div
                  key={assessment.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          Assessment for {job?.title || "Unknown Job"}
                        </h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                          {assessment.sections.length} sections
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {job?.jobType} • {job?.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total Questions:{" "}
                        {assessment.sections.reduce(
                          (total, section) => total + section.questions.length,
                          0
                        )}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() =>
                          navigate(`/assessments/builder/${assessment.jobId}`)
                        }
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/assessments/preview/${assessment.jobId}`)
                        }
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/assessments/results/${assessment.jobId}`)
                        }
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        View Results
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
