export default function Alert({ type = "error", title = "Помилка", message, code }) {
  const cls =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : "border-green-200 bg-green-50 text-green-800";

  if (!message) return null;

  return (
    <div className={`rounded-2xl border p-4 ${cls}`}>
      <div className="font-semibold">{title}</div>
      <div className="mt-1 whitespace-pre-wrap">{message}</div>
      {code !== null && code !== undefined && (
        <div className="mt-2 text-sm opacity-80">SQL Code: {code}</div>
      )}
    </div>
  );
}
