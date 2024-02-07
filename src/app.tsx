import logo from "./assets/logo.svg";
import { NewNoteCard } from "./components/new-note-card.tsx";
import { NoteCard } from "./components/note-card.tsx";

export function App() {
    return (
        <div className="mx-auto max-w-6xl my-12 space-y-6">
            <img src={logo} alt={"logo"} width={200} />
            <form action="" className="w-full">
                <input
                    type={"text"}
                    placeholder={"Busque em suas notas..."}
                    className="w-full bg-transparent text-3xl font-semibold outline-none tracking-tight placeholder:text-slate-500"
                />
            </form>
            <div className="h-px  bg-slate-700" />
            <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
				<NewNoteCard/>
				<NoteCard/>
				<NoteCard/>
            </div>
        </div>
    );
}
