import { Question, Team } from './types';

export const ADMIN_PASSWORD = "Adarsh@420";
export const STORAGE_KEY = "quiz_participants";

export const ROLL_NUMBER_PREFIXES = ["NNM24AC", "NNM25AC"];

// Regex for validation
export const NAME_REGEX = /^[A-Za-z]+$/;
export const ROLL_SUFFIX_REGEX = /^[0-9]{3}$/;

// Forbidden Roll Number Suffixes
export const FORBIDDEN_ROLL_SUFFIXES = [
  "001", "005", "009", "010", "023", "045", "047", "058"
];

// Helper to generate images
// Using a fixed 'lock' ID for each image ensures it stays the same every time the app loads
const getImg = (keywords: string, lockId: number) => 
  `https://loremflickr.com/600/450/${keywords}?lock=${lockId}`;

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Preferred Travel Route",
    options: [
      { id: "q1_a", label: "Hill Roads", imageUrl: getImg("himalaya,road,mountain", 701), team: Team.A },
      { id: "q1_b", label: "Coastal Roads", imageUrl: getImg("ocean,road,coast", 702), team: Team.B }
    ]
  },
  {
    id: 2,
    text: "Your Lifestyle",
    options: [
      { id: "q2_a", label: "Late-Night Lifestyle", imageUrl: getImg("city,night,neon", 703), team: Team.A },
      { id: "q2_b", label: "Early Morning Lifestyle", imageUrl: getImg("sunrise,farm,morning", 704), team: Team.B }
    ]
  },
  {
    id: 3,
    text: "Pick a Drink",
    options: [
      { id: "q3_a", label: "Coffee", imageUrl: getImg("coffee,latte,cup", 705), team: Team.B },
      { id: "q3_b", label: "Juice", imageUrl: getImg("orange,juice,glass", 706), team: Team.A }
    ]
  },
  {
    id: 4,
    text: "Preferred Weather",
    options: [
      { id: "q4_a", label: "Snow Weather", imageUrl: getImg("snow,winter,ice", 707), team: Team.A },
      { id: "q4_b", label: "Cloudy Rainy Weather", imageUrl: getImg("rain,umbrella,storm", 708), team: Team.B }
    ]
  },
  {
    id: 5,
    text: "Dance Style",
    options: [
      { id: "q5_a", label: "Bharatanatyam Dance", imageUrl: getImg("bharatanatyam,dancer,india", 709), team: Team.B },
      { id: "q5_b", label: "Bhangra Dance", imageUrl: getImg("bhangra,dhol,punjab", 710), team: Team.A }
    ]
  },
  {
    id: 6,
    text: "Celebration Vibe",
    options: [
      { id: "q6_a", label: "Holi Celebration", imageUrl: "https://wallpaperaccess.com/full/161439.jpg", team: Team.A },
      { id: "q6_b", label: "Onam Pookalam", imageUrl: "https://webneel.com/daily/sites/default/files/images/daily/08-2015/7-pookalam-first-price-won.jpg", team: Team.B }
    ]
  },
  {
    id: 7,
    text: "Comfort Food",
    options: [
      { id: "q7_a", label: "Chole Bhature", imageUrl: getImg("chole,bhature,indian,food", 713), team: Team.A },
      { id: "q7_b", label: "Dosa", imageUrl: getImg("dosa,chutney,south,indian", 714), team: Team.B }
    ]
  },
  {
    id: 8,
    text: "Architecture",
    options: [
      { id: "q8_a", label: "Mughal Architecture", imageUrl: getImg("taj,mahal,arch", 715), team: Team.A },
      { id: "q8_b", label: "Dravidian Temple", imageUrl: getImg("gopuram,temple,madurai", 716), team: Team.B }
    ]
  },
  {
    id: 9,
    text: "Entertainment Preference",
    options: [
      { id: "q9_a", label: "Bollywood", imageUrl: "https://i.pinimg.com/originals/f5/06/0f/f5060f5c671f1a75de96a307a1c668a3.png", team: Team.A },
      { id: "q9_b", label: "Coastalwood", imageUrl: "https://daijiworld.ap-south-1.linodeobjects.com/Linode/images3/jaicine_080725_1.jpg", team: Team.B }
    ]
  },
  {
    id: 10,
    text: "Campus Vibe",
    options: [
      { id: "q10_a", label: "North College Campus", imageUrl: getImg("red,brick,university,building", 719), team: Team.A },
      { id: "q10_b", label: "South College Campus", imageUrl: getImg("palm,trees,college,campus", 720), team: Team.B }
    ]
  },
  {
    id: 11,
    text: "Sweet Tooth",
    options: [
      { id: "q11_a", label: "Jalebi", imageUrl: getImg("jalebi,sweet,indian", 721), team: Team.A },
      { id: "q11_b", label: "Mysore Pak", imageUrl: "https://www.awesomecuisine.com/wp-content/uploads/2007/10/mysore-pak.jpg", team: Team.B }
    ]
  },
  {
    id: 12,
    text: "Music Vibe",
    options: [
      { id: "q12_a", label: "DJ Music Instruments", imageUrl: getImg("dj,turntable,party", 723), team: Team.A },
      { id: "q12_b", label: "Traditional Instruments", imageUrl: "https://imgcdn.stablediffusionweb.com/2024/9/30/24e20b29-fb5a-4b2c-a4a2-255c3f91b8d5.jpg", team: Team.B }
    ]
  },
  {
    id: 13,
    text: "Morning Atmosphere",
    options: [
      { id: "q13_a", label: "Foggy Morning", imageUrl: getImg("fog,forest,mist", 725), team: Team.A },
      { id: "q13_b", label: "Humid Morning", imageUrl: getImg("beach,sun,tropical", 726), team: Team.B }
    ]
  },
  {
    id: 14,
    text: "Study Mode",
    options: [
      { id: "q14_a", label: "Group Discussion", imageUrl: getImg("students,meeting,college", 727), team: Team.A },
      { id: "q14_b", label: "Solo Study", imageUrl: getImg("reading,book,library", 728), team: Team.B }
    ]
  },
  {
    id: 15,
    text: "Event Type",
    options: [
      { id: "q15_a", label: "Cultural Events", imageUrl: getImg("stage,concert,lights", 729), team: Team.A },
      { id: "q15_b", label: "Hackathons", imageUrl: getImg("coding,laptop,programmer", 730), team: Team.B }
    ]
  },
  {
    id: 16,
    text: "Vacation Spot",
    options: [
      { id: "q16_a", label: "Mountains", imageUrl: getImg("mountain,snow,peak", 731), team: Team.A },
      { id: "q16_b", label: "Beaches", imageUrl: getImg("beach,sand,ocean", 732), team: Team.B }
    ]
  },
  {
    id: 17,
    text: "Clothing Style",
    options: [
      { id: "q17_a", label: "Winter Shawls & Jackets", imageUrl: getImg("winter,jacket,fashion", 733), team: Team.A },
      { id: "q17_b", label: "Cotton Saree & Lungi", imageUrl: getImg("saree,woman,indian", 734), team: Team.B }
    ]
  },
  {
    id: 18,
    text: "Meal Preference",
    options: [
      { id: "q18_a", label: "Roti-Based Meal", imageUrl: getImg("roti,naan,curry", 735), team: Team.A },
      { id: "q18_b", label: "Rice-Based Meal", imageUrl: getImg("rice,curry,meal,indian", 736), team: Team.B }
    ]
  },
  {
    id: 19,
    text: "Worship Style",
    options: [
      { id: "q19_a", label: "Temple Rituals", imageUrl: "https://www.sahapedia.org/sites/default/files/BSP_Approach_Sriram_19_Arcana_CDM_8705.jpg", team: Team.B },
      { id: "q19_b", label: "Street Celebrations", imageUrl: getImg("ganesh,procession,festival", 738), team: Team.A }
    ]
  },
  {
    id: 20,
    text: "Select your favourite thing",
    options: [
      { id: "q20_a", label: "Morning Walks", imageUrl: getImg("park,path,trees,morning", 739), team: Team.B },
      { id: "q20_b", label: "Night Walks", imageUrl: getImg("city,street,night,lights", 740), team: Team.A }
    ]
  }
];