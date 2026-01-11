"use client";
import './globals.css';
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from 'react';

const skills = [
    { name: 'HTML', color: '#E34F26', logo: '/html.jpg' },
    { name: 'CSS/SCSS', color: '#1572B6', logo: '/css.jpg' /*, Icon: DiCss3 */ },
    { name: 'JavaScript', color: '#F7DF1E', logo: '/js.jpg' /*, Icon: DiJavascript1 */ },
    { name: 'TypeScript', color: '#3178C6', logo: '/ts.jpg' /*, Icon:  ... */ },
    { name: 'React', color: '#61DAFB', logo: '/rc.jpg' /*, Icon: DiReact */ },
    { name: 'Next.js', color: '#61DAFB', logo: '/nx.jpg' /*, Icon: DiReact */ },
    { name: 'MongoDB', color: '#61DAFB', logo: '/mb.jpg' /*, Icon: DiReact */ },
    { name: 'Redux', color: '#61DAFB', logo: '/rd.jpg' /*, Icon: DiReact */ },
    { name: 'Git', color: '#61DAFB', logo: '/git.jpg' /*, Icon: DiReact */ },

];

const Projects = [
    {
        title: 'Cool-Chat',
        dicription: "Built a real-time chat application with secure user authentication using Clerk, Implemented login, registration, and protected routes to ensure data privacy.Designed responsive chat interfaces using Tailwind CSS, Bootstrap, and Material UI for seamless user experience across devices.Integrated MongoDB for storing users and chat messages, ensuring data persistence and efficient retrieval.Focused on component reusability and clean UI architecture to enhance maintainability and scalability.",

        link: 'https://cool-chat-wine.vercel.app/',
        duration: 'Jan 2023 - Mar 2023',
        tecknowlegies: ['Next.js', 'React', 'Mongodb', 'Tailwind CSS', 'Clerk', 'Bootstrap', 'Material UI']
    }
    ,
    {
        title: 'Show Time',
        dicription: ' Developed an OTT platform with separate Admin and User module, User Module includes features like movie browsing, searching, filtering, watchlist management, and user reviews. Admin module allows content management, user management, and analytics tracking. Implemented responsive design for seamless experience across devices.Admin Features: Content Management: Add, edit, and remove movies/shows, manage categories and genres.User Management: View user activity, manage subscriptions, and handle user feedback.Analytics: Track user engagement, popular content, and subscription trends.Technologies Used: Frontend: React.js with Redux for state management, Tailwind CSS for styling.Backend: Node.js with Express.js for RESTful APIs.Database: MongoDB for storing user data, content information.',
        link: ' ',
        duration: 'Jan 2023 - Mar 2023',
        tecknowlegies: ['Next.js', 'React', 'RestApi', 'Mongodb', 'Tailwind CSS', 'Bootstrap']
    },

]


export default function HomePage() {
    const [isLaptop, setIsLaptop] = useState(false);
    const [showJobModal, setShowJobModal] = useState(false);
    const [ispress, setIsPress] = useState(false);

    useEffect(() => {
        // Function to check screen size
        const checkScreen = () => setIsLaptop(window.innerWidth >= 764);

        // Check once on load
        checkScreen();

        // Check every time window is resized
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const cardBaseStyles: React.CSSProperties = {
        overflowY: 'auto',
        margin: "20px",
        display: 'flex',
        // CHANGE: Column for mobile, Row for laptop
        flexDirection: isLaptop ? 'row' : 'column-reverse',
        alignItems: 'stretch',
        borderRadius: '24px',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        marginTop: '40px',
        position: 'relative',
    };
    const cardStyle: React.CSSProperties = {
        padding: '30px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.05)', // Translucent background
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',

        gap: '15px',
        transition: 'transform 0.3s ease, background 0.3s ease',
        cursor: 'pointer',
        maxWidth: '500px', // Optional: constraint width for display
    };

    const itemStyle: React.CSSProperties = {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100px',
        height: '110px',
        padding: '10px',
        borderRadius: '25px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, background-color 0.2s ease',
        boxSizing: 'border-box'
    };
    const textStyle: React.CSSProperties = {
        marginTop: '8px',
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    };

    const handleHoverIn = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        e.currentTarget.style.background = 'rgba(43, 45, 118, 0.42)';
    };

    const handleHoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';

    };

    const cardhandleHoverIn = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'scale(1.01)';
        e.currentTarget.style.background = 'rgba(43, 45, 118, 0.42)';
    };

    const cardhandleHoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
    };

    const tagStyle: React.CSSProperties = {
        margin: '25px',
        padding: '24px 30px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.05)', // Translucent background
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease, background 0.3s ease',
        cursor: 'pointer',
        // Note: The original image has a subtle color overlay derived from the background image itself
    };

    const techTagStyle: React.CSSProperties = {
        display: 'inline-block',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: '6px 12px',
        borderRadius: '10px',
        fontSize: '14px',
        marginRight: '8px',
        color: '#e0e0e0',
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#2b78cbff', // Standard Apple Blue
        color: '#efefefff',
        padding: '10px 20px',
        borderRadius: '10px',
        border: 'none',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '10px'
    };

    const downloadresume = () => {
        setIsPress(true);
        setTimeout(() => {
            setIsPress(false);
        }, 2000);
    };

    const About = () => {
        const element = document.getElementById('About-section');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth', // Animates the scroll instead of jumping
                block: 'start'      // Aligns the top of the element to the top of the viewport
            });
        }
    };

    const Skills = () => {
        const element = document.getElementById('Skills-section');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth', // Animates the scroll instead of jumping
                block: 'start'      // Aligns the top of the element to the top of the viewport
            });
        }
    };


    const projects = () => {
        const element = document.getElementById('projects-section');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth', // Animates the scroll instead of jumping
                block: 'start'      // Aligns the top of the element to the top of the viewport
            });
        }
    };
    const Education = () => {
        const element = document.getElementById('Education-section');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth', // Animates the scroll instead of jumping
                block: 'start'      // Aligns the top of the element to the top of the viewport
            });
        }
    };

    return (

        <div
            style={{
                overflowY: 'auto',
                height: '100vh',
                backgroundImage: "url('/ios.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {
                showJobModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, width: '100%', height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.4)', // Dimmed background
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(8px)', // iOS background blur
                        padding: '20px'
                    }}
                        onClick={() => setShowJobModal(false)} // Close when clicking outside
                    >
                        <div style={{
                            width: isLaptop ? '400px' : '90%',
                            backgroundColor: 'rgba(28, 28, 30, 0.95)', // iOS Dark Mode Grey
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            textAlign: 'center',
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            animation: 'fadeIn 0.2s ease-out'
                        }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the box
                        >
                            <div style={{ padding: '24px' }}>
                                <h2 style={{ color: '#fff', fontSize: '20px', margin: '0 0 10px 0' }}>
                                    Career Status
                                </h2>
                                <p style={{ color: '#d2d2d2', fontSize: '15px', lineHeight: '1.4', margin: 0 }}>
                                    I am currently a Freshman and actively looking for opportunities.
                                    I am ready to contribute and grow as a  Front-End Developer.
                                </p>
                            </div>

                            {/* iOS Action Button */}
                            <div
                                onClick={() => setShowJobModal(false)}
                                style={{
                                    borderTop: '0.5px solid rgba(255,255,255,0.1)',
                                    padding: '16px',
                                    color: '#0A84FF', // iOS Blue
                                    fontSize: '17px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                OK
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Glass Container */}

            <div className="main-glass-container"
                style={{

                    overflowY: 'auto',
                    height: '95vh',
                    borderRadius: "28px",
                    background: "rgba(2, 2, 2, 0.23)",
                    backdropFilter: "blur(25px)",
                    WebkitBackdropFilter: "blur(25px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    overflow: "hidden", // important for rounded corners
                }}
            >
                {/* Top Left */}
                <div
                    style={{
                        marginLeft: "20px",
                        borderRight: "1px solid rgba(255,255,255,0.15)",
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                    }}
                >
                    <div className='circles-container'>
                        <div className="circle red"></div>
                        <div className="circle yellow"></div>
                        <div className="circle green"></div>
                    </div>

                </div>
                {/* Top Right */}

                <div className='toprightbotum'
                    style={{
                        borderBottom: "1px solid rgba(0, 255, 38, 0.15)",

                    }}
                >
                    <div className='avatharcontainer' style={{
                        flex: '0 0 30%',
                        position: 'relative',
                        display: 'flex',       // Use flexbox on container
                        justifyContent: 'end', // Center horizontally
                        alignItems: 'center ',     // Center vertically (alternative to auto margins)
                        overflow: 'hidden',
                        marginTop: '0.3rem',     // Ensures image stays within container's eventual radius if applied
                    }}>
                        <img className='avatharimg'
                            src="/profile.jpg"
                            alt="Profile Avatar"
                            style={{
                                overflow: 'hidden',
                                // Small fixed height
                                borderRadius: '50%', // Makes it perfectly round
                                objectFit: 'cover',  // Ensures the image fills the circle
                                opacity: '1',        // Full opacity for clarity
                                border: '3px solid #ffffff', // The white rounded border
                                // Optional: subtle shadow for depth
                            }}
                        />

                    </div>
                </div>



                <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', maxWidth: '300px', margin: "0px", }}>

                    {/* Categories Group */}
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 20, marginLeft: isLaptop ? "20px" : "0px" }}>


                        <h3 style={{ fontSize: '1rem', display: isLaptop ? 'block' : 'none', fontWeight: 'bold', color: '#d2d2d2ff', letterSpacing: '0.5px', padding: '0 16px 12px 0px', margin: 0 }}>
                            Categories
                        </h3>


                        {/* Example of Individual Item with Icon */}
                        <li
                            style={{ marginLeft: '16px', marginRight: '26px', fontSize: '1rem', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', borderRadius: '10px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            onClick={About}
                        >
                            <span style={{ fontSize: '22px', }}><i className="bi bi-flag-fill ,"></i>
                            </span> {/* Replace with your Icon/Image */}
                            {isLaptop ? "About" : ""}
                        </li>

                        <li
                            style={{ marginLeft: '16px', marginRight: '26px', fontSize: '1rem', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', borderRadius: '10px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            onClick={Skills}
                        >
                            <span style={{ fontSize: '22px' }}><i className="bi bi-gem"></i></span>
                            {isLaptop ? "Skills" : ""}
                        </li>
                        <li
                            style={{ marginLeft: '16px', marginRight: '26px', fontSize: '1rem', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', borderRadius: '10px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            onClick={() => setShowJobModal(true)}
                        >
                            <span style={{ fontSize: '22px' }}><i className="bi bi-buildings"></i></span>
                            {isLaptop ? "Jobs" : ""}
                        </li>
                        <li
                            style={{ marginLeft: '16px', marginRight: '26px', fontSize: '1rem', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', borderRadius: '10px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            onClick={projects}
                        >
                            <span style={{ fontSize: '22px' }}><i className="bi bi-braces"></i></span>
                            {isLaptop ? "Projects" : ""}
                        </li>
                        <li
                            style={{ marginLeft: '16px', marginRight: '26px', fontSize: '1rem', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', borderRadius: '10px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            onClick={Education}
                        >
                            <span style={{ fontSize: '1rem' }}><i className="bi bi-bank"></i></span>
                            {isLaptop ? "Education" : ""}
                        </li>
                    </ul>





                    {/* Social Links Group */}
                    <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 10 }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#d2d2d2ff', letterSpacing: '0.5px', padding: '0 16px 8px 15px', margin: 0, display: isLaptop ? 'block' : 'none' }}>
                            Social Links
                        </h3>

                        <li
                            style={{ marginLeft: '10px', marginRight: '26px', fontSize: '1rem', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', borderRadius: '10px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <span style={{ border: '1px solid #c7c7c797', borderRadius: '20%', paddingLeft: '6px', paddingRight: '6px', fontSize: '1rem', fontWeight: 'bold' }}>in</span>
                            {isLaptop ? "LinkedIn" : ""}
                        </li>

                        <li
                            style={{ marginLeft: '10px', marginRight: '26px', fontSize: '1rem', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', borderRadius: '10px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <span style={{ border: '1px solid #c7c7c797', borderRadius: '20%', paddingLeft: '6px', paddingRight: '6px', fontSize: '1rem', fontWeight: 'bold' }}>N</span>
                            {isLaptop ? "Naukri" : ""}
                        </li>

                        <li
                            style={{ marginLeft: '10px', marginRight: '26px', fontSize: '1rem', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', borderRadius: '10px', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            onClick={() => window.open('https://github.com/gouseshaik765988', '_blank', 'noopener,noreferrer')}
                        >
                            <span style={{ border: '1px solid #c7c7c797', borderRadius: '20%', paddingLeft: '6px', paddingRight: '6px', fontSize: '22px', fontWeight: 'bold' }}>G</span>
                            {isLaptop ? "GitHub" : ""}
                        </li>



                    </ul>
                </div>






                <div
                    style={{

                        borderLeft: "1px solid rgba(255,255,255,0.15)", overflowY: 'auto'
                    }}
                >

                    <div id="About-section" className="animated-profile-card" style={cardBaseStyles}>

                        {/* Left Side: Text and Content (70%) */}
                        <div style={{ flex: '0 0 70%', padding: '18px', position: 'relative', zIndex: 1 }}> {/* zIndex ensures content is above animation */}
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0' }}>
                                Shaik Gouse
                            </h1>
                            <p style={{ fontSize: '15px', color: '#d2d2d2', lineHeight: '1.6', marginBottom: '24px', maxWidth: '90%' }}>
                                Front-End Developer | Next.js & React.
                                Crafting high-speed web experiences with Next.js, Tailwind CSS, and Modern JavaScript. Focused on performance, clean architecture, and user-centric design. Ready to build the future of the web. </p>

                            <a
                                href="resume.pdf" // Path to the file in your public folder
                                download="resume.pdf" // This forces the download instead of opening it
                                style={{ textDecoration: 'none' }} // Prevents blue underline
                            >
                                <button disabled={ispress}
                                    style={{

                                        backgroundColor: '#2b78cbff',
                                        color: '#ffffff',
                                        padding: '10px 20px',
                                        borderRadius: '12px',
                                        fontSize: '17px',
                                        fontWeight: '600',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        transition: 'opacity 0.2s ease',
                                        width: isLaptop ? 'auto' : 'fit-content', // Good for mobile centering
                                        margin: isLaptop ? '0' : '0 auto'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                                    onClick={downloadresume}
                                >
                                    <i className="bi bi-arrow-down-circle"></i>

                                    {ispress ? "Downloading..." : "Download Resume"}
                                </button>
                            </a>

                        </div>

                        {/* Right Side: Image and Role (30%) */}
                        <div className='mainimg' style={{ flex: '0 0 30%', backgroundColor: 'rgba(255, 255, 255, 0.03)', position: 'relative', zIndex: 1 }}>
                            <img
                                src=" /profile.jpg"
                                alt="Profile Preview"
                                style={{
                                    display: 'flex',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '3rem',
                                    width: '90px',
                                    height: '90px',
                                    borderRadius: "100px",
                                    objectFit: 'cover',
                                    opacity: '0.8'
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '10px',
                                }}
                            >
                                <p
                                    style={{
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        letterSpacing: '5px',
                                        fontWeight: '300',
                                    }}
                                >
                                    Front End Developer
                                </p>
                            </div>
                        </div>
                    </div>








                    <p id="Skills-section" style={{


                        fontSize: '22px', fontWeight: 'bold', color: '#ffffff', margin: '2rem 2rem '
                    }}>
                        My Skills
                    </p>

                    <div style={{

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',

                        margin: '50px',
                    }}>
                        {skills.map((skill) => (
                            <div


                                key={skill.name}
                                style={itemStyle}
                                onMouseEnter={handleHoverIn}
                                onMouseLeave={handleHoverOut}
                            >
                                {/* Replace this span with your actual icon component: <skill.Icon size={35} color={skill.color} /> */}
                                <img src={skill.logo} alt={skill.name} style={{ width: '45px', height: '45px' }} />
                                <span style={textStyle}>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                    <p id="projects-section" style={{


                        fontSize: '22px', fontWeight: 'bold', color: '#ffffff', margin: '1rem 2rem '
                    }}>
                        My Projects
                    </p>
                    <>
                        <div className="project-grid" style={{

                            gap: '1rem',
                            padding: '3rem',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        }}>

                            {Projects.map((project) => (
                                <div
                                    key={project.title} // Mandatory 'key' prop for React lists
                                    style={cardStyle}
                                    onMouseEnter={cardhandleHoverIn}
                                    onMouseLeave={cardhandleHoverOut}
                                >
                                    <h3 style={{ fontSize: '24px', margin: 0 }}>{project.title}</h3>

                                    <p style={{ margin: 0, color: '#d2d2d2', lineHeight: '1.4' }}>
                                        {project.dicription}
                                    </p>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', color: '#ffffff', fontWeight: 'bold' }}>
                                        {/* Note: Ensure your data array uses the key 'tecknowlegies' */}
                                        {project.tecknowlegies.map(tech => (
                                            <span key={tech} style={techTagStyle}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <p style={{ margin: 0, fontSize: '14px', color: '#a0a0a0' }}>
                                        Duration: {project.duration}
                                    </p>

                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            <button style={buttonStyle}>
                                                Open Project
                                            </button>
                                        </a>
                                    )}
                                </div>
                            ))}

                        </div>

                        {/* Use styled-jsx to manage responsive column layout */}
                        <style jsx>
                            {`
        .project-grid {
            /* Default: 1 column for mobile screens */
            display: grid;
            grid-template-columns: 1fr;
        }

        /* Media Query: 2 columns for screens wider than 768px (tablets, laptops, etc) */
        @media (min-width: 768px) {
            .project-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
    `}</style>
                    </>


                    <p style={{


                        fontSize: '22px', fontWeight: 'bold', color: '#ffffff', margin: '30px 20px '
                    }}>
                        Education
                    </p>



                    <div id="Education-section"
                        style={{
                            ...tagStyle, // Spread your existing tag styles
                            display: 'flex',
                            // Stack vertically on mobile, horizontally on laptop
                            flexDirection: isLaptop ? 'row' : 'column',
                            alignItems: isLaptop ? 'center' : 'flex-start',
                            justifyContent: 'space-between',
                            gap: isLaptop ? '20px' : '12px',
                            padding: '16px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={handleHoverIn}
                        onMouseLeave={handleHoverOut}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: isLaptop ? '20px' : '12px'
                        }}>
                            {/* Logo Placeholder */}
                            <div style={{
                                width: isLaptop ? '40px' : '32px',
                                height: isLaptop ? '40px' : '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                // Optional: Add a little padding if the logo touches the edges
                                padding: '2px'
                            }}>
                                <img
                                    src='/ed.jpg'
                                    alt="Education Logo"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain' // Ensures the logo stays sharp and fits perfectly
                                    }}
                                />
                            </div>




                            {/* Text Content */}
                            <div>
                                <p style={{
                                    margin: 0,
                                    fontSize: isLaptop ? '18px' : '16px',
                                    fontWeight: '600',
                                    lineHeight: '1.2'
                                }}>
                                    B.Sc Computer Science
                                </p>
                                <p style={{
                                    margin: '4px 0 0 0',
                                    fontSize: isLaptop ? '14px' : '13px',
                                    color: '#b0b0b0'
                                }}>
                                    Chaitanya College - Krishna University
                                </p>
                            </div>
                        </div>

                        {/* Duration */}
                        <div style={{
                            fontSize: isLaptop ? '14px' : '12px',
                            color: '#d2d2d2',
                            // Add indentation on mobile so it aligns with the text, not the icon
                            marginLeft: isLaptop ? '0' : '44px',
                            fontWeight: isLaptop ? 'normal' : '500'
                        }}>
                            2018  – 2023
                        </div>
                    </div>




                </div>

            </div>

        </div >

    );
}
