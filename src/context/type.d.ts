import { User } from "firebase/auth";

export interface AuthContextType{
    user: User | null,
    
}