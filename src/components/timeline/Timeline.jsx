import React, { useEffect, useRef, useState } from 'react';

const TimelineItem = ({ children }) => {
    const ref = useRef();
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.4 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <li ref={ref}>
            <div className="timeline-middle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 transition-all duration-300 ${inView ? 'text-accent scale-125' : 'text-gray-400 scale-100'
                        }`}
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            {children}
            <hr />
        </li>
    );
};

const Timeline = () => {
    return (
        <div className="flex justify-center px-4 pt-16 pb-16">
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical max-w-4xl">
                <TimelineItem>
                    <div className="timeline-start mb-10 md:text-end space-y-2 text-sm">
                        <time className="font-mono italic">2020</time>
                        <div className="text-lg font-black">Admitted to UC Davis</div>
                        Began undergraduate studies at the University of California, Davis, majoring in Computer Science (B.S.). Started building foundational skills in software engineering and Python development through early coursework and personal interest projects.
                    </div>
                </TimelineItem>

                <TimelineItem>
                    <div className="timeline-end md:mb-10 space-y-2 text-sm">
                        <time className="font-mono italic">2022</time>
                        <div className="text-lg font-black">EcoCAR Software Engineer</div>
                        Joined the UC Davis EcoCAR team as a software engineer, contributing to simulation and testing pipelines for autonomous vehicle research. Developed virtual test environments and processed noisy sensor data to improve software performance.
                    </div>
                </TimelineItem>

                <TimelineItem>
                    <div className="timeline-start mb-10 md:text-end space-y-2 text-sm">
                        <time className="font-mono italic">2023</time>
                        <div className="text-lg font-black">Academic Genealogy Project</div>
                        Led a team of four to design and deploy a full-stack academic lineage tracking platform for the UC Davis Computer Science Department. Implemented Django, RESTful APIs, CAS authentication, and Docker deployment. Wrote a 20+ page user manual for long-term maintainability.
                    </div>
                </TimelineItem>
                
                <TimelineItem>
                    <div className="timeline-start mb-10 md:text-end space-y-2 text-sm">
                        <time className="font-mono italic">2024</time>
                        <div className="text-lg font-black">Graduated from UC Davis</div>
                        Earned a B.S. in Computer Science with hands-on experience in full-stack development, machine learning, and collaborative software projects. Focused on game AI, algorithms, and interactive design. Continued developing game prototypes and advanced Unity features including networking and pathfinding.
                    </div>
                </TimelineItem>

                <TimelineItem>
                    <div className="timeline-end md:mb-10 space-y-2 text-sm">
                        <time className="font-mono italic">2024</time>
                        <div className="text-lg font-black">Admitted to USC</div>
                        Began M.S. in Computer Science (Game Development) at the University of Southern California. Developed *Prosecutor*, a futuristic investigative game, and *Rivalry Clash*, a 1v1 strategy game with real-time mechanics and custom AI.
                        </div>
                </TimelineItem>

            </ul>
        </div>
    );
};

export default Timeline;
