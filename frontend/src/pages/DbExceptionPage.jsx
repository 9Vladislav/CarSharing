import { useState } from "react";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function DbExceptionPage() {
  const [userId, setUserId] = useState("");
  const [carId, setCarId] = useState("");

  const [ok, setOk] = useState(null);
  const [err, setErr] = useState(null);

  async function runTest(e) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    try {
      const res = await api("/rentals/test-exception", {
        method: "POST",
        body: JSON.stringify({
          userId: Number(userId),
          carId: Number(carId),
        }),
      });
      setOk(res);
    } catch (e2) {
      setErr(e2);
    }
  }

  const inputCls = "w-full rounded-xl border border-gray-300 px-3 py-2";

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-2xl font-extrabold">DB Exception (пункт 4)</h1>
        <p className="text-gray-600">
          Ініціюємо помилку з боку БД (RAISERROR/THROW) і обробляємо її у клієнтському додатку.
        </p>
      </div>

      {ok && (
        <Alert
          type="success"
          title="Результат"
          message="Вставка пройшла (триггер не заблокував). Якщо треба саме помилку — підбери такі дані/час, щоб триггер спрацював."
        />
      )}
      <Alert message={err?.message} code={err?.code} />

      <Card title="Виконати /api/rentals/test-exception">
        <form className="grid gap-3 md:grid-cols-2" onSubmit={runTest}>
          <label className="text-sm">
            <div className="mb-1 font-semibold">UserId</div>
            <input
              type="number"
              className={inputCls}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Напр.: 1"
            />
          </label>

          <label className="text-sm">
            <div className="mb-1 font-semibold">CarId</div>
            <input
              type="number"
              className={inputCls}
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              placeholder="Напр.: 3"
            />
          </label>

          <div className="md:col-span-2">
            <button
              className="w-full rounded-xl bg-black py-3 text-white font-semibold hover:opacity-90"
              type="submit"
            >
              Запустити тест
            </button>
          </div>
        </form>
      </Card>
    </Container>
  );
}
