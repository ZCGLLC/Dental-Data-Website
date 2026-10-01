export function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="bg-white px-4 py-4 md:px-5 md:py-5">
      <p className="num text-[10px] tracking-[0.16em] text-silver uppercase">{label}</p>
      <p className="num mt-2 text-[1.35rem] leading-none text-porcelain md:text-[1.65rem]">{value}</p>
      {note ? (
        <p className="mt-2 text-[10px] tracking-[0.14em] text-titanium uppercase">{note}</p>
      ) : null}
    </div>
  );
}
