export enum USER_ROLE {
  PATIENT,
  DOCTOR,
  ADMIN,
}
export enum DOCTOR_SPECIALITY {
  MGI = 'mgi',
  CARDIOLOGO = 'cardiologist',
  PEDIATRA = 'pediatrician',
}

export type UserType = {
  _id: string;
  role: USER_ROLE;
  image: string;
  email: string;
  name: string;
  surnames: string;
  birthDate: Date | undefined;
  address: AddressType | undefined;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone: string;
};

export type AppointmentType = {
  id: string,
  patient_id: string,
  doctor_id: string,
  date: Date,
  reason: string
}

// Tipo para paciente
export type PatientType = UserType & {
  appointments: AppointmentType[]
};

export type DoctorType = UserType & {
  specialty: DOCTOR_SPECIALITY;
};

export type NurseType = UserType & {
};
export type ResourceType = {
  uuid: string,
  type: string,
  stock: number,
  location: string
};

// Tipo para Administrador
export type AdminType = UserType & {
  // requests: RequestType[]; 
};
export type CareerDate = {
  start: Date,
  end?: Date,
}

export type CareerType = {
  name: string,
  date: CareerDate,
  certificate?: string
};

type AddressType = {
  province: string;
  municipality: string;
  fullAddress?: string;
};

