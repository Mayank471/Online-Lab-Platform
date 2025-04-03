import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore";

export const useClasroomStore = create((set,get)=>({
    classrooms:[],
    assignments:[],
    selectedClassroom:null,
    isClassroomLoading:false,
    isAssignmentLoading:false,

    getClassrooms: async()=>{
        set({isClassroomLoading: true});
        try{
            const res= await axiosInstance.get("/dashboard/getClassrooms");
            console.log(res.data);
            set({classrooms:res.data});
        }catch(error){
            toast.error(error.response.data.error);
        }finally{
            set({isClassroomLoading: false});
        }
    }, 

    getAssignments: async(userId)=>{
        set({isAssignmentLoading:true});
        try {
            const res= await axiosInstance.get(`/dashboard/getAssignments`);
            set({assignments: res.data});
        } catch (error) {
            toast.error(error.response);
        }finally{
            set({isAssignmentLoading:false});
        }
    },


    setSelectedClassroom: (selectedClassroom)=> set({selectedClassroom}),
}))