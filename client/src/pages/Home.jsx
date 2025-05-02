import { useEffect, useState } from "react";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE_URL}/getAllJobs`);
                const jobData = res?.data?.jobs || [];
                setJobs(jobData);
                setFilteredJobs(jobData);
                if (window.innerWidth >= 768) {
                    setSelectedJob(jobData[0] || null);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
            setLoading(false);
        };
        fetchJobs();
    }, []);

    const handleLocationSearch = async (loc) => {
        if (!loc) return setFilteredJobs(jobs);
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/getJobsByLocation?location=${encodeURIComponent(loc)}`
            );
            const locationJobs = res?.data?.jobs || [];
            setFilteredJobs(locationJobs);
            setSelectedJob(null);
        } catch (error) {
            console.error("Error filtering jobs:", error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pb-8">
            {/* Location Search */}
            <section className="flex justify-center py-4 md:py-10">
                <div className="w-[95%] sm:w-full max-w-2xl bg-white shadow-md rounded-full flex items-center px-4 py-2 md:px-6 md:py-3 space-x-2 md:space-x-3 border border-gray-200">
                    <FiMapPin className="text-gray-500 text-lg md:text-xl" />
                    <input
                        type="text"
                        placeholder="Enter city or state to find jobs"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1 outline-none text-xs sm:text-sm md:text-base placeholder-gray-500"
                    />
                    <button
                        onClick={() => handleLocationSearch(location)}
                        className="bg-blue-700 text-white text-xs sm:text-sm md:text-base px-4 py-1.5 md:px-5 md:py-2 rounded-full hover:bg-blue-800 transition"
                    >
                        Find Jobs
                    </button>
                </div>
            </section>


            {/* Loader */}
            {loading && (
                <div className="flex justify-center py-10">
                    <ImSpinner2 className="animate-spin text-blue-600 text-3xl" />
                </div>
            )}

            {/* Job List and Details */}
            {!loading && (
                <section className="flex flex-col md:flex-row h-[80vh] divide-y md:divide-y-0 md:divide-x border border-gray-100 rounded-md shadow-sm overflow-hidden">
                    {/* Job List */}
                    <div className="md:w-1/2 overflow-y-auto p-4 space-y-4">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div
                                    key={job._id}
                                    onClick={() => setSelectedJob(job)}
                                    className={`p-4 bg-white rounded-md shadow-sm hover:shadow-md transition duration-200 flex gap-4 items-start cursor-pointer border 
                    ${selectedJob?._id === job._id ? "border-2 border-purple-600 bg-purple-50" : "border-gray-200"}`}
                                >
                                    <img
                                        src={job.companyImageUrl || "https://via.placeholder.com/150"}
                                        alt={job.company}
                                        className="w-12 h-12 object-contain border rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-base text-purple-800">{job.title}</h3>
                                        <p className="text-sm text-gray-600">
                                            {job.company} — {job.location}
                                        </p>
                                        <div className="text-xs text-gray-500 mt-1 space-y-1">
                                            <p><strong>Experience:</strong> {job.experience}</p>
                                            <p><strong>Type:</strong> {job.employment_type}</p>
                                            <p><strong>Posted:</strong> {new Date(job.postedDateTime).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">No jobs found for this location.</div>
                        )}
                    </div>


                    {/* Job Details */}
                    <div className="md:w-1/2 hidden md:block overflow-y-auto bg-white shadow-lg rounded-lg">
                        {selectedJob ? (
                            <div className="p-6 space-y-4">
                                {/* Company Logo */}
                                {selectedJob.companyImageUrl && (
                                    <img
                                        src={selectedJob.companyImageUrl}
                                        alt={`${selectedJob.company} Logo`}
                                        className="w-24 h-24 object-contain mx-auto rounded-full shadow-md"
                                    />
                                )}

                                {/* Job Title and Company Name */}
                                <h2 className="text-2xl font-semibold text-purple-800">{selectedJob.title}</h2>
                                <p className="text-lg text-gray-700 font-medium">{selectedJob.company}</p>
                                <p className="text-sm text-gray-500">{selectedJob.location}</p>

                                {/* Job Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mt-3">
                                    <div><strong>Experience:</strong> {selectedJob.experience}</div>
                                    <div><strong>Employment Type:</strong> {selectedJob.employment_type}</div>
                                    <div><strong>Posted On:</strong> {new Date(selectedJob.postedDateTime).toLocaleDateString()}</div>
                                    <div><strong>Source:</strong> {selectedJob.source}</div>
                                </div>

                                {/* Apply Button */}
                                <div className="pt-4">
                                    <a
                                        href={selectedJob.job_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-lg"
                                    >
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 text-gray-500 text-center">
                                <p>Select a job to see details.</p>
                            </div>
                        )}
                    </div>


                    {/* Mobile Modal */}

                    {selectedJob && window.innerWidth < 768 && (
                        <Transition appear show={!!selectedJob} as={Fragment}>
                            <Dialog as="div" className="relative z-10 md:hidden" onClose={() => {
                                if (window.innerWidth < 768) {
                                    setSelectedJob(null);
                                }
                            }}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-purple-800">
                                                    {selectedJob?.title}
                                                </Dialog.Title>
                                                <p className="text-sm text-gray-700 mt-1">{selectedJob?.company}</p>
                                                <p className="text-sm text-gray-500">{selectedJob?.location}</p>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
                                                    <div><strong>Experience:</strong> {selectedJob?.experience}</div>
                                                    <div><strong>Employment Type:</strong> {selectedJob?.employment_type}</div>
                                                    <div><strong>Posted:</strong> {new Date(selectedJob?.postedDateTime).toLocaleDateString()}</div>
                                                    <div><strong>Source:</strong> {selectedJob?.source}</div>
                                                </div>

                                                <div className="mt-4 flex justify-between items-center">
                                                    <a
                                                        href={selectedJob?.job_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                                                    >
                                                        Apply Now
                                                    </a>
                                                    <button
                                                        type="button"
                                                        className="text-sm text-gray-500 underline"
                                                        onClick={() => setSelectedJob(null)}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>

                    )}
                </section>
            )}
        </div>
    );
};

export default Home;
