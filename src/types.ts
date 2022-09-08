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

interface History {
  _id: string;
  dateDue: Date;
  medsDue: Medication[];
  user: string;
}

export interface User {
  username: string;
  medications: Medication[];
  history: History[];
}