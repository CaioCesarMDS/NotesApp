import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NodeCardProps {
    note: {
        id: string;
        date: Date;
        content: string;
    };

    onNoteDeleted: (id: string) => void;
}

export const NoteCard = ({ note, onNoteDeleted }: NodeCardProps) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md text-left flex-col bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-300">
                {formatDistanceToNow(note.date, {
                                locale: ptBR,
                                addSuffix: true,
                            })}
                </span>
                <p className="text-sm leading-6 text-slate-400">{note.content}</p>
                <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="w-full fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[70vh] bg-slate-700 md:rounded-md flex flex-col outline-none ">
                    <Dialog.Close className=" absolute top-3 right-3 text-slate-400 hover:text-slate-100">
                        <X size={24} />
                    </Dialog.Close>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className="text-sm font-medium text-slate-300">
                            {formatDistanceToNow(note.date, {
                                locale: ptBR,
                                addSuffix: true,
                            })}
                        </span>
                        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
                    </div>

                    <button
                        type={"button"}
                        className="w-full py-4 bg-slate-800 text-center text-sm text-slate-300 outline-none font-medium group"
                    >
                        Deseja{" "}
                        <span className="text-red-400 group-hover:underline" onClick={() => onNoteDeleted(note.id)}>
                            apagar essa nota
                        </span>
                        ?
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
