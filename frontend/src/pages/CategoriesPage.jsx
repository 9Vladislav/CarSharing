import { useEffect, useState } from "react";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function CategoriesPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api("/categories").then(setItems).catch(setErr);
  }, []);

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-2xl font-extrabold">Категорії</h1>
      </div>

      <Alert message={err?.message} code={err?.code} />

      <Card title={`CarCategory (${items.length})`}>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2">ID</th>
                <th>Назва</th>
                <th>Ціна/год</th>
                <th>Опис</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.CategoryId} className="border-t">
                  <td className="py-2">{c.CategoryId}</td>
                  <td className="font-semibold">{c.CategoryName}</td>
                  <td>{Number(c.PricePerHour).toFixed(2)}</td>
                  <td className="text-gray-700">{c.Description ?? "-"}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="py-6 text-gray-500" colSpan={4}>
                    Немає даних.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Container>
  );
}
