import { USER_ROLE, UserType } from "../types/User/UserType";

export const userPlaceholder: UserType = {
  _id: "",
  role: USER_ROLE.PATIENT,
  image: "",
  email: "",
  name: "",
  surnames: "",
  birthDate: new Date(),
  address: {
    province: "",
    municipality: "",
  },
  gender: "OTHER",
  phone: "",
}