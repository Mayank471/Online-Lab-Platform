import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore";

export const useClassroomStore = create((set, get) => ({
    classrooms: [],
    assignments: [],
    selectedClassroom: null,
    isClassroomLoading: false,
    isAssignmentLoading: false,

    getClassrooms: async () => {
        set({ isClassroomLoading: true });
        try {
            const res = await axiosInstance.get("/dashboard/getClassrooms");
            console.log(res.data);
            set({ classrooms: res.data });
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to fetch classrooms");
        } finally {
            set({ isClassroomLoading: false });
        }
    },

    getAssignments: async (userId) => {
        set({ isAssignmentLoading: true });
        try {
            const res = await axiosInstance.get(`/dashboard/getAssignments`, { params: { userId } });
            set({ assignments: res.data });
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to fetch assignments");
        } finally {
            set({ isAssignmentLoading: false });
        }
    },

    getAssignment: async (assignmentId) => {
        try {
            const res = await axiosInstance.get(`/classroom/getassignment/${assignmentId}`);
            console.log(res.data);
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch assignment"); 
        }
    },
    

    setSelectedClassroom: (selectedClassroom) => set({ selectedClassroom }),

    // function to submit scores (post userID and assignmentId and score)
    submitAssignment: async (code,score, assignmentId) => {
        try {
            const {authUser}= useAuthStore();
            const res = await axiosInstance.post(`/classroom/submitAssignment}`, { assignmentId,score, UserId: authUser._id, code });
            console.log(res.data);
            toast.success("Scores submitted successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit scores");
        }
    },
}));
