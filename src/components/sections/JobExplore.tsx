import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../common/JobCard";
import Reveal from "../Reveal";
import { Button } from "../ui/Button";
import axios from "axios";
import { type Job } from "../../services/seed/jobsSeed";
import SimpleJobSkeleton from "../common/JobSkeleton";

const JobExplore: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleJobs, setVisibleJobs] = useState(5);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch more jobs to ensure we have enough for sorting
        const response = await axios.get("/jobs?status=active&pageSize=20");

        // Sort jobs by createdAt date (newest first) and take the latest 5
        const jobsData = response.data?.data || [];
        const sortedJobs = jobsData
          .sort(
            (a: Job, b: Job) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);

        setJobs(sortedJobs);
      } catch (error) {
        console.error("JobExplore: Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // console.log(jobs);

  const jobTypes = ["All", "Full-time", "Remote", "Part-time", "Contract"];

  const filteredJobs =
    selectedType === "All"
      ? jobs
      : jobs.filter((job) => job.jobType === selectedType);

  const displayedJobs =
    filteredJobs == undefined ? [] : filteredJobs.slice(0, visibleJobs);

  const loadMore = () => {
    setVisibleJobs((prev) => Math.min(prev + 3, filteredJobs.length));
  };

  const handleBrowseAllJobs = () => {
    navigate("/jobs");
  };

  if (loading) {
    return <SimpleJobSkeleton />;
  }

  return (
    <section
      id="jobs"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24 lg:py-32"
    >
      {/* Section Number */}
      <div className="absolute top-24 right-12 text-9xl font-black text-gray-100 leading-none hidden lg:block">
        04
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <Reveal>
            <div className="inline-block text-purple-600 font-bold text-sm uppercase tracking-widest mb-6">
              Opportunities
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-tight mb-8 max-w-4xl">
              EXPLORE
              <br />
              <span className="text-purple-600">AVAILABLE</span>
              <br />
              POSITIONS
            </h2>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
              Discover exciting career opportunities posted by top companies. Find
              your perfect match today.
            </p>
          </Reveal>
        </div>

        {/* Filters - Horizontal Strip */}
        <Reveal delayMs={300}>
          <div className="flex flex-wrap gap-3 mb-16 pb-8 border-b-2 border-gray-200">
            {jobTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setVisibleJobs(3);
                }}
                className={`px-8 py-4 text-base font-bold transition-all duration-300 hover-lift border-2 ${
                  selectedType === type
                    ? "bg-black text-white border-black shadow-xl"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Job Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {displayedJobs.map((job, idx) => (
            <Reveal key={job.id} delayMs={idx * 120}>
              <JobCard job={job} />
            </Reveal>
          ))}
        </div>

        {/* Load More Button */}
        {visibleJobs < filteredJobs?.length && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={loadMore}
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
            >
              Load More Jobs
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredJobs?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more opportunities.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <Reveal delayMs={300}>
          <div className="relative mt-20 text-center bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-8 lg:p-12 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl anim-float"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl anim-float-reverse"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Ready to Find Your Dream Job?
              </h3>
              <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto font-medium">
                Join thousands of professionals who have found their perfect career
                match through our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold shadow-2xl hover-lift transform transition-all duration-300"
                  size="lg"
                  onClick={handleBrowseAllJobs}
                >
                  Browse All Jobs →
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold hover-lift transform transition-all duration-300"
                >
                  Create Job Alert
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default JobExplore;
