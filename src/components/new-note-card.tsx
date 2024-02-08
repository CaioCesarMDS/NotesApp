import * as Dialog from "@radix-ui/react-dialog";
import { Mic, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void;
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
    const [noteContent, setNoteContent] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    function handleStartEditor(state: boolean) {
        setShouldShowOnboarding(state);
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        setNoteContent(event.target.value);

        if (event.target.value === "") {
            setShouldShowOnboarding(true);
        }
    }

    function handleSaveNote(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (noteContent === "") {
            toast.warning("Grave ou digite uma nota antes de salvar!");
            return;
        } else {
            onNoteCreated(noteContent);
            toast.success("Nota salva com sucesso!");
        }
    }

    function handleStartRecording() {
        const isSpeechRecognitionAPIAvailable =
            "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

        if (!isSpeechRecognitionAPIAvailable) {
            toast.error("Seu navegador não suporta a API de reconhecimento de voz!");
            setIsRecording(false);
            return;
        }

        setIsRecording(true);
        setShouldShowOnboarding(false);

        const SpeechRecognitionAPI =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        const speechRecognition = new SpeechRecognitionAPI();

        speechRecognition.lang = "pt-BR";
        speechRecognition.continuous = true;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.interimResults = true;

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return `${text} ${result[0].transcript}`;
            }, "");

            setNoteContent(transcription);
        };

        speechRecognition.onerror = (event) => {
            console.error(event);
        };

        speechRecognition.start();
    }

    function handleStopRecording() {
        setIsRecording(false);
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md flex flex-col text-left bg-slate-700 p-5 space-y-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-200">Adicionar nota</span>
                <p className="text-sm leading-6 text-slate-400">
                    Grave uma nota em áudio que será convertida para texto
                    automaticamente.
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="w-full fixed inset-0 md:inset-auto overflow-hidden md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px]  md:h-[70vh] bg-slate-700 md:rounded-md flex flex-col outline-none ">
                    <Dialog.Close
                        className=" absolute top-3 right-3 text-slate-400 hover:text-slate-100"
                        onClick={() => handleStartEditor(true)}
                    >
                        <X size={24} />
                    </Dialog.Close>

                    <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-medium text-slate-300">
                                Adicionar nota
                            </span>
                            {shouldShowOnboarding ? (
                                <p className="text-sm leading-6 text-slate-400">
                                    Comece{" "}
                                    <button
                                        type={"button"}
                                        className="font-medium text-lime-400 hover:underline"
                                        onClick={handleStartRecording}
                                    >
                                        gravando uma nota
                                    </button>{" "}
                                    em aúdio ou se preferir{" "}
                                    <button
                                        type={"button"}
                                        className="font-medium text-lime-400 hover:underline"
                                        onClick={() => handleStartEditor(false)}
                                    >
                                        utilize apenas texto
                                    </button>
                                </p>
                            ) : (
                                <textarea
                                    autoFocus
                                    className="w-full resize-none bg-transparent text-slate-300 p-3 outline-none"
                                    onChange={handleContentChanged}
                                />
                            )}
                        </div>
                        {isRecording ? (
                            <button
                                type={"submit"}
                                className="w-full py-4 bg-slate-900 text-center text-sm text-slate-300 outline-none font-bold hover:text-slate-100"
                                onClick={handleStopRecording}
                            >
                                <div className="w-full flex items-center justify-center gap-3">
                                    <Mic
                                        size={22}
                                        className="text-red-500 animate-pulse"
                                    />
                                    Gravando! (clique p/ interromper)
                                </div>
                            </button>
                        ) : (
                            <button
                                type={"submit"}
                                className="w-full py-4 bg-lime-400 text-center text-sm text-slate-900 outline-none font-bold hover:bg-lime-500"
                                onClick={() => handleStartEditor(true)}
                            >
                                Salvar nota!
                            </button>
                        )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
