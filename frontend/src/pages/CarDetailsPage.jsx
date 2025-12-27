import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function CarDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api(`/cars/${id}`)
      .then(setData)
      .catch(setErr);
  }, [id]);

  const car = data?.car;
  const rentals = data?.rentals || [];

  return (
    <Container>
      <div className="my-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Деталі авто</h1>
          <p className="text-gray-600">
            Пункт 1: детальна сторінка авто + всі його оренди без дублювання.
          </p>
        </div>

        <Link
          className="rounded-xl px-3 py-2 bg-white border font-semibold hover:bg-gray-50"
          to="/"
        >
          ← Назад
        </Link>
      </div>

      <Alert message={err?.message} code={err?.code} />

      {car && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Автомобіль">
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">ID:</span> {car.CarId}</div>
              <div><span className="text-gray-500">Назва:</span> <b>{car.Brand} {car.Model}</b></div>
              <div><span className="text-gray-500">Номер:</span> {car.PlateNumber}</div>
              <div><span className="text-gray-500">Рік:</span> {car.Year ?? "-"}</div>
              <div><span className="text-gray-500">Статус:</span> {car.Status}</div>
            </div>
          </Card>

          <Card title="Категорія">
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Назва:</span> <b>{car.CategoryName}</b></div>
              <div><span className="text-gray-500">Ціна/год:</span> {Number(car.PricePerHour).toFixed(2)}</div>
              <div><span className="text-gray-500">Опис:</span> {car.Description ?? "-"}</div>
            </div>
          </Card>
        </div>
      )}

      <div className="mt-4">
        <Card title={`Оренди цього авто (${rentals.length})`}>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2">RentalNo</th>
                  <th>Період</th>
                  <th>Год</th>
                  <th>Статус</th>
                  <th>Користувач</th>
                  <th>Сума</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr key={r.RentalId} className="border-t">
                    <td className="py-2 font-semibold">{r.RentalNo}</td>
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
                    <td>
                      {r.FirstName} {r.LastName} ({r.Phone})
                    </td>
                    <td>{Number(r.TotalAmount).toFixed(2)}</td>
                  </tr>
                ))}
                {rentals.length === 0 && (
                  <tr>
                    <td className="py-6 text-gray-500" colSpan={6}>
                      Для цього авто оренд поки немає.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  );
}
