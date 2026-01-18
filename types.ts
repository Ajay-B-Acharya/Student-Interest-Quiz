export enum Team {
  A = 'Team A',
  B = 'Team B'
}

export interface QuizOption {
  id: string;
  label: string;
  imageUrl: string;
  team: Team; // The team this option maps to
}

export interface Question {
  id: number;
  text: string;
  options: [QuizOption, QuizOption];
}

export interface Participant {
  id: string;
  name: string;
  rollNumberPrefix: string;
  rollNumberSuffix: string;
  fullRollNumber: string;
  team: Team;
  timestamp: number;
}

export interface AdminAuth {
  isAuthenticated: boolean;
}
