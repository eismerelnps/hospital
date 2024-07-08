type Person = {
  id: string;
  full_name: string;
}
export type AppointmentType = {
  id: string;
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