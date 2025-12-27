import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function CarsPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api("/cars")
      .then(setItems)
      .catch(setErr);
  }, []);

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-2xl font-extrabold">Автомобілі</h1>
        <p className="text-gray-600">
          Пункт 1: виведення даних з пов’язаних таблиць (Cars + CarCategory).
        </p>
      </div>

      <Alert message={err?.message} code={err?.code} />

      <Card title="Список авто">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2">ID</th>
                <th>Авто</th>
                <th>Номер</th>
                <th>Категорія</th>
                <th>Ціна/год</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.CarId} className="border-t">
                  <td className="py-2">{c.CarId}</td>
                  <td className="font-semibold">{c.Brand} {c.Model}</td>
                  <td>{c.PlateNumber}</td>
                  <td>{c.CategoryName}</td>
                  <td>{Number(c.PricePerHour).toFixed(2)}</td>
                  <td>
                    <span className="rounded-lg bg-gray-100 px-2 py-1">
                      {c.Status}
                    </span>
                  </td>
                  <td className="text-right">
                    <Link
                      className="rounded-xl bg-black px-3 py-1.5 text-white font-semibold hover:opacity-90"
                      to={`/cars/${c.CarId}`}
                    >
                      Деталі
                    </Link>
                  </td>
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
