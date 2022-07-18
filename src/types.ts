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
  type: string;
  dose: string;
  amount: number;
  days: string[];
  times: string[];
  administered: boolean;
  user: string;
}

export interface User {
  username: string,
  medications: Medication[],
}