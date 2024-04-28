'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getDocuments } from "@/firebase/firestore/getData";
import { DocumentData, collection, getFirestore, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import addData from "@/firebase/firestore/addData";
import { toast } from "react-toastify";
import firebase_app from "@/firebase/config";
import TextArea from "../component/elements/TextArea";
function Page() {
    const { user } = useAuth()
    const router = useRouter()
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<DocumentData[]>([]);

    useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])

    useEffect(() => {
        fetchNotes()
        const unsubscribe = listenForChanges(); 
        return () => unsubscribe();
    }, []);
    
    

    const listenForChanges = () => {
        const db = getFirestore(firebase_app);
        return onSnapshot(collection(db, 'notes'), (snapshot) => {
            const updatedNotes: DocumentData[] = [];
            snapshot.forEach((doc) => {
                updatedNotes.push(doc.data());
            });
            setNotes(updatedNotes);
        });
    };

    const fetchNotes = async () => {
        try {
            const { documents, error } = await getDocuments('notes');
            if (error) {
                throw new Error('error while fetching notes:', error);
            }
            console.log(documents);
            setNotes(Object.values(documents));
        } catch (error) {
            console.error(error);
            toast.error("error while fetching notes")
        }
    };

    const handleAddNote = async () => {
        try {
            const newNoteId = uuidv4();
            const { result, error } = await addData('notes', newNoteId, { content: note, createdAt: new Date() });
            if (error) {
                throw new Error('error while adding note:', error);
            }
            toast('Succesfully add note');
            setNote('');
        } catch (error) {
            console.error(error);
            alert('Error while adding note');
        }
    };

    return (
        <div className="flex flex-col w-screen items-center p-4">
            <h2 className="text-white font-bold text-2xl mb-6">Add New Note</h2>
           
            <div className="flex w-full justify-center max-w-xl px-4">
            <TextArea textfieldKey={"Write your note"} onChangeValue={function (text: string): void {
                setNote(text)
            } } value={note} readonly={false}/>
            </div>
            <br />
            <button className="bg-blue-400 text-white px-4 py-2 rounded-md" onClick={handleAddNote}>Add Note</button>

            <hr />

            <h2 className="mt-8 mb-4 text-2xl font-bold">My Notes</h2>
            <div className="flex w-full flex-col space-y-4 items-center">
                {notes.map((note, index) => (
                    <div className="flex w-full justify-center max-w-xl px-4" key={index}>
                        <TextArea textfieldKey={""} onChangeValue={function (text: string): void {
            
                    } } value={note.content} readonly={true}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;