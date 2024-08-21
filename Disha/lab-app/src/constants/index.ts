import {
  benefitImage2,
  diode1,
  transformer,
  transistor,
  inductor,
  rgb,
  capacitor,
  resistor,
  file02,
  telegram,
  diode,
} from "../assets";

export const navigationForAdmin = [
  {
    id: "4",
    title: "student",
    url: "#name",
    onlyMobile: true,
  },
  {
    id: "0",
    title: "COMPONENTS",
    url: "/catalog",
  },

  {
    id: "1",
    title: "upload component",
    url: "/upload",
  },
  
  {
    id: "3",
    title: "Labcard",
    url: "/labcard",
  },
  {
    id: "5",
    title: "Loaned list",
    url: "/list",
  },
  {
    id: "6",
    title: "search",
    url: "/search",
  },
 
];
export const navigationForStudent = [
  {
    id: "4",
    title: "student",
    url: "#name",
    onlyMobile: true,
  },
  {
    id: "0",
    title: "COMPONENTS",
    url: "/catalog",
  },  
  {
    id: "3",
    title: "Labcard",
    url: "/labcard",
  },
  {
    id: "5",
    title: "search",
    url: "/search",
  },
 
];

export const heroIcons = [file02];

export const collabText =
  "Do you have Account to access the lab equipments ? if no then create right now";

export const collabContent = [
  {
    id: "0",
    title: "Quick & Easy Registration",
  },
  {
    id: "1",
    title: "Effortless Management",
  },
  {
    id: "2",
    title: "Seamless Experience",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "diode",
    icon: diode,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "diode1",
    icon: diode1,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "transformer",
    icon: transformer,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "transistor",
    icon: transistor,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "inductor",
    icon: inductor,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "led",
    icon: rgb,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "capacitor",
    icon: capacitor,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "resistor",
    icon: resistor,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Laboratory hours",
    text: "Regular Hours",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    imageUrl: benefitImage2,
    list: [
      { day: "Monday", hours: "10:00 AM - 4:00 PM" },
      { day: "Tuesday", hours: "10:00AM - 4:00 PM" },
      { day: "Wednesday ", hours: "10:00 AM - 3:30 PM" },
      { day: "Thursday", hours: "10:00 AM - 4:00 PM" },
      { day: "Friday", hours: "10:00 AM - 4:00 PM" }
    ],
  },
  {
    id: "1",
    title: "Instruction",
    text: `Once registered, log in to access the full range of features. Browse available lab equipment, check real-time availability, and reserve your desired items by selecting the appropriate date and time.`,
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Get Your Labcard",
    text: `Create your account by clicking "Sign Up" and verify your email. Once registered, log in to access and reserve lab equipment. Enjoy the convenience of managing your lab activities online with your E-Lab Card!`,
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    imageUrl: benefitImage2,
    url:"labcard",
  },
];

export const socials = [
  {
    id: "0",
    title: "email",
    iconUrl: telegram,
    url: "mailto:221220021@nitdelhi.ac.in",
  },
 
];
