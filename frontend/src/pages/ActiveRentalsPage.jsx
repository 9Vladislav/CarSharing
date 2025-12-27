import { useEffect, useState } from "react";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function ActiveRentalsPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api("/rentals/active").then(setItems).catch(setErr);
  }, []);

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-2xl font-extrabold">Активні оренди</h1>
        <p className="text-gray-600">
          Пункт 3: активні оренди через табличну функцію dbo.GetActiveRentals().
        </p>
      </div>

      <Alert message={err?.message} code={err?.code} />

      <Card title={`dbo.GetActiveRentals (${items.length})`}>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2">RentalNo</th>
                <th>Користувач</th>
                <th>Авто</th>
                <th>Категорія</th>
                <th>Період</th>
                <th>Hours</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.RentalId} className="border-t">
                  <td className="py-2 font-semibold">{r.RentalNo}</td>
                  <td>
                    {r.FullName} ({r.Phone})
                  </td>
                  <td>
                    {r.CarName} ({r.PlateNumber})
                  </td>
                  <td>{r.CategoryName}</td>
                  <td>
                    {new Date(r.StartAt).toLocaleString()} →{" "}
                    {new Date(r.EndAt).toLocaleString()}
                  </td>
                  <td>{r.Hours}</td>
                  <td>{Number(r.TotalAmount).toFixed(2)}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="py-6 text-gray-500" colSpan={7}>
                    Активних оренд немає.
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
