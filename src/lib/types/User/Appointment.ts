type Person = {
  id: number;
  full_name: string;
}
export type AppointmentType = {
  id: number;
  consultation_date: string;
  reason_of_visit: string;
  symptoms: string;
  diagnosis: string;
  prescribed_treatment: string;
  observation: string;
  test_conducted: string;
  patient: Person;
  doctor: Person;
}