import type { UserCategory, Service, Testimonial } from "./types"

export const categoryContent: Record<UserCategory, {
  hero: {
    title: string
    highlight: string
    description: string
  }
  services: Service[]
  testimonials: Testimonial[]
}> = {
  student: {
    hero: {
      title: "Accelerate Your",
      highlight: "Academic Journey",
      description: "From project assistance to mastering cutting-edge technologies. Get personalized support from industry experts."
    },
    services: [
      {
        title: "Project Assistance",
        description: "Expert guidance on academic projects across electronics, computer science, and engineering domains.",
        icon: "FileCode"
      },
      {
        title: "1-on-1 Tutoring",
        description: "Personalized tutoring sessions tailored to your learning pace and curriculum requirements.",
        icon: "Users"
      },
      {
        title: "AI & ML Learning",
        description: "Hands-on training in artificial intelligence, machine learning, and deep learning fundamentals.",
        icon: "Brain"
      },
      {
        title: "IoT Development",
        description: "Learn to build connected devices and IoT solutions with practical, industry-relevant projects.",
        icon: "Cpu"
      },
      {
        title: "Data Analytics",
        description: "Master data analysis, visualization, and insights generation using modern tools and frameworks.",
        icon: "BarChart3"
      },
      {
        title: "Programming Support",
        description: "Get help with Python, JavaScript, C++, and other programming languages for your coursework.",
        icon: "Code2"
      }
    ],
    testimonials: [
      {
        name: "Priya Sharma",
        role: "M.Tech Student",
        company: "IIT Delhi",
        content: "ECGuys helped me complete my thesis on IoT systems. Their expertise and patience made complex concepts easy to understand.",
        avatar: "PS"
      },
      {
        name: "James O'Brien",
        role: "Computer Science Student",
        company: "Trinity College Dublin",
        content: "The tutoring sessions were incredibly helpful. I went from struggling with algorithms to acing my exams.",
        avatar: "JO"
      },
      {
        name: "Ahmed Al-Hassan",
        role: "Engineering Student",
        company: "University of Dubai",
        content: "Best investment in my education. The project guidance I received was professional and thorough.",
        avatar: "AA"
      }
    ]
  },
  business: {
    hero: {
      title: "Transform Your",
      highlight: "Business with Technology",
      description: "End-to-end digital solutions from web applications to AI automation. Scale your operations with confidence."
    },
    services: [
      {
        title: "Web Applications",
        description: "Modern, scalable web applications built with cutting-edge technologies and best practices.",
        icon: "Globe"
      },
      {
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
        icon: "Smartphone"
      },
      {
        title: "IoT Systems",
        description: "Connected device ecosystems and smart solutions for manufacturing, logistics, and automation.",
        icon: "Radio"
      },
      {
        title: "AI Automation",
        description: "Intelligent process automation, chatbots, and machine learning solutions for business efficiency.",
        icon: "Bot"
      },
      {
        title: "Cloud Infrastructure",
        description: "Scalable cloud architecture design, deployment, and management on AWS, Azure, and GCP.",
        icon: "Cloud"
      },
      {
        title: "Business Consulting",
        description: "Strategic technology consulting to align your digital transformation with business objectives.",
        icon: "LineChart"
      }
    ],
    testimonials: [
      {
        name: "Sarah Mitchell",
        role: "CEO",
        company: "TechStart UK",
        content: "ECGuys delivered our MVP in record time. Their technical expertise and business understanding made them the perfect partner.",
        avatar: "SM"
      },
      {
        name: "Rajesh Patel",
        role: "CTO",
        company: "InnovateCorp India",
        content: "The IoT solution they built for our manufacturing plant increased efficiency by 40%. Exceptional work.",
        avatar: "RP"
      },
      {
        name: "Michael Chen",
        role: "Operations Director",
        company: "LogiFlow Ireland",
        content: "Their AI automation solution transformed our customer service. Response times dropped by 60%.",
        avatar: "MC"
      }
    ]
  },
  career: {
    hero: {
      title: "Launch Your",
      highlight: "Global Career",
      description: "Expert guidance for job markets in UK, Europe, Gulf, and India. Stand out with a compelling professional brand."
    },
    services: [
      {
        title: "CV Optimization",
        description: "ATS-friendly, region-specific CVs that highlight your strengths and pass automated screening.",
        icon: "FileText"
      },
      {
        title: "LinkedIn Enhancement",
        description: "Profile optimization, content strategy, and networking techniques to attract recruiters.",
        icon: "Linkedin"
      },
      {
        title: "Interview Preparation",
        description: "Mock interviews, behavioral coaching, and technical preparation for your target roles.",
        icon: "MessageSquare"
      },
      {
        title: "Job Market Guidance",
        description: "Insights into job markets across UK, Europe, Gulf, and India with tailored application strategies.",
        icon: "Map"
      },
      {
        title: "Portfolio Development",
        description: "Build a compelling portfolio that showcases your skills and projects to potential employers.",
        icon: "Briefcase"
      },
      {
        title: "Salary Negotiation",
        description: "Learn negotiation strategies to secure competitive compensation packages.",
        icon: "TrendingUp"
      }
    ],
    testimonials: [
      {
        name: "Ananya Krishnan",
        role: "Software Engineer",
        company: "Google London",
        content: "The interview prep was invaluable. I landed my dream job at Google after following their structured approach.",
        avatar: "AK"
      },
      {
        name: "Thomas Wilson",
        role: "Data Scientist",
        company: "HSBC Dubai",
        content: "ECGuys helped me transition from India to Dubai seamlessly. Their regional expertise made all the difference.",
        avatar: "TW"
      },
      {
        name: "Emma Collins",
        role: "Product Manager",
        company: "Meta Ireland",
        content: "My LinkedIn profile went from 50 views to 2000+ after their optimization. Recruiters started reaching out daily.",
        avatar: "EC"
      }
    ]
  }
}
