// ─────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH
// Every value below is taken directly from Kesavan_M's resume PDF —
// including its text content AND the hyperlinks embedded in the PDF file
// (extracted from the PDF's link annotations, e.g. the GitHub/LinkedIn/
// live-project links behind the words "GitHub", "LinkedIn", "melodia",
// "stayease"). Nothing here is invented. If you update the resume, update
// this file to match — every component reads from here, nowhere else.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Kesavan M",
  title: "Full Stack Web Developer (Fresher)",
  phone: "9600523080",
  email: "mailsamykesavan@gmail.com",
  github: "https://github.com/kesvavn",
  linkedin: "https://www.linkedin.com/in/kesavan-m01",
  heroSummary:
  "Motivated Full Stack Web Developer (Fresher) skilled in the MERN Stack, passionate about building responsive web applications and learning modern technologies.",
  summary:
    "Motivated Full Stack Web Developer (Fresher) skilled in the MERN Stack, including React.js, Node.js, Express.js, and MongoDB, with hands-on experience developing full-stack applications such as Melodia Event Management and StayEase – Guest Room Booking Application, with expertise in responsive web development, RESTful APIs, JWT authentication, MongoDB integration, booking management, and role-based access control.",
};

export const skills = [
  {
    category: "Frontend",
    items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Bootstrap", "Responsive Web Design"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "RESTful API Development", "JWT Authentication"],
  },
  {
    category: "Database",
    items: ["MongoDB", "Mongoose", "MySQL"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Visual Studio Code", "Postman", "ChatGPT", "Google Gemini", "Claude AI"],
  },
];

export const projects = [
  {
    id: "melodia",
    name: "Melodia Event Management",
    type: "Full Stack Web Application",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap", "JWT Authentication"],
    github: "https://github.com/kesvavn/kesavv",
    live: "https://kesavv.vercel.app/",
    description:
      "Developed a responsive full-stack event management and venue booking application using React.js, Node.js, Express.js, and MongoDB.",
    features: [
      "Venue selection, date availability, and event booking requests",
      "Customer management, JWT authentication, and admin approval workflows",
      "Package & Price Management with additional packages for food, decoration, makeup, photography, videography, and other event services",
      "GST and discount calculation",
    ],
  },
  {
    id: "stayease",
    name: "StayEase – Guest Room Booking Application",
    type: "Full Stack Developer Interview Task",
    duration: "3 Days",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap", "JWT"],
    github: "https://github.com/kesvavn/guest-room-booking",
    live: "https://guest-room-booking-lemon.vercel.app/",
    description:
        "A full-stack guest room booking application that enables users to browse available rooms, view detailed room information, check date-based availability, calculate booking prices, and make reservations. The application also includes secure JWT authentication, role-based admin access, booking management, cancellation handling, and double-booking prevention.",

    features: [
      "JWT authentication and role-based authorization with separate user and admin workflows",
      "RESTful APIs built with MongoDB/Mongoose",
      "Booking validation and date-based availability checks",
      "Price calculation, cancellation, and double-booking prevention",
    ],
  },
];

export const education = [
  {
    degree: "M.Sc., Computer Science",
    institution: "CMS College of Science and Commerce, Coimbatore",
    duration: "2022–2024",
    cgpa: "6.1",
  },
  {
    degree: "B.Sc., Computer Science",
    institution: "Gobi Arts and Science College, Gobichettipalayam",
    duration: "2019–2022",
    cgpa: "7.1",
  },
];

export const certifications = [
  {
    name: "Full Stack Web Development",
    detail: "Professional Program",
  },
  {
    name: "Soft Skills Training",
    detail: "Infosys",
  },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
