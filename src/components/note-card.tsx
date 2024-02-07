export const NoteCard = () => {
    return (
        <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
            <span className="text-sm font-medium text-slate-300">Há 2 dias</span>
            <p className="text-sm leading-6 text-slate-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                corrupti cupiditate et officia neque facere a voluptas, illo vitae
                deserunt possimus quis dolorum necessitatibus earum repellendus, rerum
                explicabo, ea saepe! Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Exercitationem corrupti cupiditate et officia neque facere a
                voluptas, illo vitae deserunt possimus quis dolorum necessitatibus earum
                repellendus, rerum explicabo, ea saepe!
            </p>
            <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
        </button>
    );
};
