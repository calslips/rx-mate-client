import { EventInput } from '@fullcalendar/react';

export interface FeedbackProps {
  message: string;
  success: boolean;
}

export interface HistoryData {
  user: string;
  events: EventInput[];
}

export interface CalendarData {
  events: EventInput[];
}

// export interface CalendarEvents extends MedHistoryProps {
//   // events: EventInput[];
//   // setEvents: (evtInput: EventInput[]) => void;
//   getMedHistory: (
//     setHistory: (medHistory: History[]) => void,
//     setUser: (user: string) => void,
//     setEvents: (evtInput: EventInput[]) => void,
//     events: EventInput[]
//   ) => void;
// }

export interface MedHistoryProps extends UserDataProps {
  history: History[];
  setHistory: (medHistory: History[]) => void;
  events: EventInput[];
  setEvents: (evtInput: EventInput[]) => void;
}

export interface UserDataProps extends MasterMedListProps {
  user: string;
  setUser: (user: string) => void;
}

export interface MasterMedListProps {
  meds: Medication[];
  setMeds: (meds: Medication[]) => void;
}

export interface Medication {
  _id: string;
  name: string;
  count: number;
  type: string;
  dose: string;
  timesPerDay: number;
  days: string[];
  time: string;
  administered: boolean;
  user: string;
}

export interface History {
  _id: string;
  dateDue: Date;
  medsDue: Medication[];
  user: string;
}

interface Subscription {
  endpoint: String,
  expirationTime: Number,
  keys: {
    p256dh: String,
    auth: String,
  },
}

export interface User {
  username: string;
  medications: Medication[];
  history: History[];
  subscription: Subscription;
}