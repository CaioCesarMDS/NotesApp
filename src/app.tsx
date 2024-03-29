import { ChangeEvent, useState } from "react";
import logo from "./assets/logo.svg";
import { NewNoteCard } from "./components/new-note-card.tsx";
import { NoteCard } from "./components/note-card.tsx";

interface Note {
    id: string;
    date: Date;
    content: string;
}

export function App() {
    const [search, setSearch] = useState("");

    const [notes, setNotes] = useState<Note[]>(() => {
        const notesOnStorage = localStorage.getItem("notes");

        if (notesOnStorage) {
            return JSON.parse(notesOnStorage);
        } else {
            return [];
        }
    });

    function onNoteCreated(content: string) {
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            content,
        };

        const notesArray = [newNote, ...notes];

        setNotes(notesArray);

        localStorage.setItem("notes", JSON.stringify(notesArray));
    }

    function onNodeDeleted(id: string) {
        const newNotes = notes.filter((note) => note.id !== id);

        setNotes(newNotes);

        localStorage.setItem("notes", JSON.stringify(newNotes));
    }

    function handleSerach(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value;

        setSearch(query);
    }

    const filteredNotes =
        search !== ""
            ? notes.filter((note) =>
                note.content.toLowerCase().includes(search.toLowerCase())
            )
            : notes;


    return (
        <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 ">
            <img src={logo} alt={"logo"} width={200} />
            <form action="" className="w-full">
                <input
                    type={"text"}
                    placeholder={"Busque em suas notas..."}
                    className="w-full bg-transparent text-2xl font-semibold outline-none tracking-tight placeholder:text-slate-500"
                    onChange={handleSerach}
                />
            </form>
            <div className="h-px  bg-slate-700" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                <NewNoteCard onNoteCreated={onNoteCreated} />
                {filteredNotes.map((note) => {
                    return <NoteCard key={note.id} note={note} onNoteDeleted={onNodeDeleted} />;
                })}
            </div>
        </div>
    );
}
