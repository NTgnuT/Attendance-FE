import { configureStore } from "@reduxjs/toolkit";
import students from "../features/students/StudentSlice";
import login from "../features/auth/authSlice";
import classes from "../features/classes/ClassSlice";
import teachers from "../features/teachers/TeacherSlice";
import courses from "../features/courses/CourseSlice";
import moduleCourses from "../features/moduleCourses/ModuleCourseSlice";
import posts from "../features/post/PostSlice";
export const store = configureStore({
  reducer: {
    students,
    posts,
    login,
    classes,
    teachers,
    courses,
    moduleCourses,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
