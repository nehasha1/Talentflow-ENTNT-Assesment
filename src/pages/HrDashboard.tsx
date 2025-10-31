import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardStatistics {
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  newCandidates: number;
  totalAssessments: number;
  completedAssessments: number;
  interviewsScheduled: number;
  offersPending: number;
  hiredCandidates: number;
}

const HrDashboard = () => {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState<DashboardStatistics>({
    totalJobs: 0,
    activeJobs: 0,
    totalCandidates: 0,
    newCandidates: 0,
    totalAssessments: 0,
    completedAssessments: 0,
    interviewsScheduled: 0,
    offersPending: 0,
    hiredCandidates: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activePanel, setActivePanel] = useState<'jobs' | 'candidates' | 'assessments' | 'interviews'>('jobs');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("/dashboard/statistics");
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconColor,
    bgColor,
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    iconColor: string;
    bgColor: string;
  }) => (
    <div className="group relative bg-black border-2 border-purple-900/50 hover:border-purple-500 transition-all duration-500 hover-lift overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition-all duration-500"></div>
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-4 ${bgColor} border-2 border-purple-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
            <div className={`md:w-8 md:h-8 w-6 h-6 ${iconColor}`}>{icon}</div>
          </div>
          <div className="text-right">
            <div className="text-4xl md:text-5xl font-black text-white mb-1">
              {value}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-purple-400 font-medium uppercase tracking-wider">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12">
        <div className="mb-16">
          <div className="h-4 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
          <div className="h-16 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-black border-2 border-purple-600/30 p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-4 bg-purple-600/30 rounded-lg w-16 h-16"></div>
                  <div className="ml-4">
                    <div className="h-5 bg-gray-700 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-12 bg-gray-700 rounded w-16 mb-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12">
      {/* Header Section */}
      <div className="mb-16">
        <div className="inline-block text-purple-600 font-bold text-sm uppercase tracking-widest mb-6">
          Dashboard
        </div>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-tight mb-4">
          HR
          <br />
          <span className="text-purple-600">DASHBOARD</span>
        </h1>
        <p className="text-xl text-gray-600 font-light">Welcome to your HR management dashboard</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <StatCard
          title="Jobs"
          value={statistics.totalJobs}
          subtitle={`${statistics.activeJobs} active`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
          }
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
        />

        <StatCard
          title="Candidates"
          value={statistics.totalCandidates}
          subtitle={`${statistics.hiredCandidates} hired`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
          iconColor="text-green-600"
          bgColor="bg-green-100"
        />

        <StatCard
          title="Assessments"
          value={statistics.totalAssessments}
          subtitle={`${statistics.completedAssessments} completed`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          iconColor="text-purple-600"
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Interviews"
          value={statistics.interviewsScheduled}
          subtitle={`${statistics.offersPending} offers pending`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          }
          iconColor="text-orange-600"
          bgColor="bg-orange-100"
        />
      </div>
      {/* Vertical sections with detail panel */}
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Vertical nav */}
        <aside className="lg:col-span-2 bg-black border-2 border-purple-600/30 p-6 h-max">
          <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-6">Sections</h2>
          <div className="flex lg:flex-col flex-row gap-3">
            {[
              { id: 'jobs', label: 'Jobs' },
              { id: 'candidates', label: 'Candidates' },
              { id: 'assessments', label: 'Assessments' },
              { id: 'interviews', label: 'Interviews' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id as any)}
                className={`px-6 py-4 text-base font-bold transition-all duration-300 text-left cursor-pointer border-2 hover-lift ${
                  activePanel === tab.id
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-purple-900/50 text-white hover:border-purple-500 hover:bg-purple-600/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Detail content */}
        <section className="lg:col-span-4 bg-white border-2 border-black p-8 lg:p-12">
          {activePanel === 'jobs' && (
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-black mb-6">Jobs</h3>
              <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">Create, edit, archive and reorder job postings with optimistic updates and rollback on failure.</p>
              <div className="flex gap-4">
                <button onClick={() => navigate('/dashboard/jobs')} className="px-8 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300 hover-lift">OPEN JOBS →</button>
                <button onClick={() => navigate('/dashboard/assessments')} className="px-8 py-4 border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all duration-300 hover-lift">MANAGE ASSESSMENTS</button>
              </div>
            </div>
          )}
          {activePanel === 'candidates' && (
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-black mb-6">Candidates</h3>
              <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">Track applications with a kanban board, drag candidates across stages, add notes with mentions, and search instantly.</p>
              <button onClick={() => navigate('/dashboard/candidates')} className="px-8 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300 hover-lift">OPEN CANDIDATES →</button>
            </div>
          )}
          {activePanel === 'assessments' && (
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-black mb-6">Assessments</h3>
              <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">Build job-specific assessments with multiple question types, preview live, and persist responses locally.</p>
              <button onClick={() => navigate('/dashboard/assessments')} className="px-8 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300 hover-lift">OPEN ASSESSMENTS →</button>
            </div>
          )}
          {activePanel === 'interviews' && (
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-black mb-6">Interviews</h3>
              <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">Plan and track interviews, and monitor offer status. This demo summarizes with dashboard statistics.</p>
              <div className="text-lg text-black font-bold">Scheduled: {statistics.interviewsScheduled} • Offers pending: {statistics.offersPending}</div>
            </div>
          )}
        </section>
      </div>

      {/* Recent Activity */}
      <div className="bg-black border-2 border-purple-600/30 p-8 lg:p-12">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tight">
          Recent Activity
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-purple-900/20 border-l-4 border-purple-500 hover:bg-purple-900/30 transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-lg text-white font-medium">
                {statistics.newCandidates} new candidates applied this week
              </span>
            </div>
            <span className="text-sm text-purple-400 font-bold uppercase tracking-wider">This week</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-900/20 border-l-4 border-blue-500 hover:bg-blue-900/30 transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-lg text-white font-medium">
                {statistics.completedAssessments} assessments completed
              </span>
            </div>
            <span className="text-sm text-blue-400 font-bold uppercase tracking-wider">This week</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-900/20 border-l-4 border-purple-500 hover:bg-purple-900/30 transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-lg text-white font-medium">
                {statistics.activeJobs} active job postings
              </span>
            </div>
            <span className="text-sm text-purple-400 font-bold uppercase tracking-wider">Current</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-orange-900/20 border-l-4 border-orange-500 hover:bg-orange-900/30 transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-lg text-white font-medium">
                {statistics.interviewsScheduled} interviews scheduled
              </span>
            </div>
            <span className="text-sm text-orange-400 font-bold uppercase tracking-wider">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
