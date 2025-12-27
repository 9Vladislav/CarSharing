import { useEffect, useState } from "react";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function RentalsPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api("/rentals").then(setItems).catch(setErr);
  }, []);

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-2xl font-extrabold">Оренди</h1>
        <p className="text-gray-600">
          Пункт 1: загальні оренди (JOIN). Активні — окремою сторінкою.
        </p>
      </div>

      <Alert message={err?.message} code={err?.code} />

      <Card title={`Всі оренди (${items.length})`}>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2">RentalNo</th>
                <th>Користувач</th>
                <th>Авто</th>
                <th>Період</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.RentalId} className="border-t">
                  <td className="py-2 font-semibold">{r.RentalNo}</td>
                  <td>
                    {r.FirstName} {r.LastName} ({r.Phone})
                  </td>
                  <td>
                    {r.Brand} {r.Model} ({r.PlateNumber})
                  </td>
                  <td>
                    {new Date(r.StartAt).toLocaleString()} →{" "}
                    {new Date(r.EndAt).toLocaleString()}
                  </td>
                  <td>{r.Hours}</td>
                  <td>
                    <span className="rounded-lg bg-gray-100 px-2 py-1">
                      {r.Status}
                    </span>
                  </td>
                  <td>{Number(r.TotalAmount).toFixed(2)}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="py-6 text-gray-500" colSpan={7}>
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
