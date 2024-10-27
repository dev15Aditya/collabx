export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center">
            <div className="inline-block max-w-lg text-center justify-center">
                {children}
            </div>
        </section>
    );
}
