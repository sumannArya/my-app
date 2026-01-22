export default function MasonryGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 px-4 space-y-4 mx-auto max-w-[2000px]">
            {children}
        </div>
    );
}
