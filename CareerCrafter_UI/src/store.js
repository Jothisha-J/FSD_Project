import { configureStore } from "@reduxjs/toolkit";

import { employeeReducer } from "./store/reducer/EmployeeReducer";
import { jobReducer } from "./store/reducer/JobReducer";
import { applicationReducer } from "./store/reducer/ApplicationReducer";
import { jobSeekerReducer } from "./store/reducer/JobSeekerReducer";
import { skillReducer } from "./store/reducer/SkillReducer";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    jobs: jobReducer,
    applications: applicationReducer,
    jobSeekers: jobSeekerReducer,
    skills: skillReducer,
  },
});
