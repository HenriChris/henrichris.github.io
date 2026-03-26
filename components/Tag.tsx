interface Props {
    children: React.ReactNode;
}

export default function Tag({ children }: Props) {
    return (
        <span className="bg-tag-bg text-tag-text font-mono text-[0.6875rem] font-normal px-2 py-[3px] rounded-[3px]">
            {children}
        </span>
    );
}
