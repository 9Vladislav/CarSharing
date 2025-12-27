export default function Card({ title, children, right }) {
  return (
    <div className="rounded-2xl bg-white shadow p-5">
      {(title || right) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">{title}</h2>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
