import { useEffect, useState } from "react";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function UsersPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api("/users").then(setItems).catch(setErr);
  }, []);

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-2xl font-extrabold">Користувачі</h1>
      </div>

      <Alert message={err?.message} code={err?.code} />

      <Card title={`Список (${items.length})`}>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2">ID</th>
                <th>ПІБ</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Посвідчення</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.UserId} className="border-t">
                  <td className="py-2">{u.UserId}</td>
                  <td className="font-semibold">{u.FirstName} {u.LastName}</td>
                  <td>{u.Phone}</td>
                  <td>{u.Email ?? "-"}</td>
                  <td>{u.DriverLicenseNo}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="py-6 text-gray-500" colSpan={5}>Немає даних.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Container>
  );
}
