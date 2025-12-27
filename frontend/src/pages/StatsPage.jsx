import { useState } from "react";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

function ResultBox({ value }) {
  return (
    <div className="text-3xl font-extrabold">
      {value === null || value === undefined ? "—" : value}
    </div>
  );
}

export default function StatsPage() {
  const [belowAvg, setBelowAvg] = useState(null);
  const [belowPrice, setBelowPrice] = useState(null);

  const [max, setMax] = useState("");

  const [err1, setErr1] = useState(null);
  const [err2, setErr2] = useState(null);

  const inputCls = "w-56 rounded-xl border border-gray-300 px-3 py-2";

  async function runBelowAvg() {
    setErr1(null);
    try {
      const res = await api("/stats/below-avg");
      setBelowAvg(res.value);
    } catch (e) {
      setErr1(e);
    }
  }

  async function runBelowPrice() {
    setErr2(null);
    try {
      const res = await api(`/stats/below-price?max=${encodeURIComponent(max)}`);
      setBelowPrice(res.value);
    } catch (e) {
      setErr2(e);
    }
  }

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-2xl font-extrabold">Статистика</h1>
        <p className="text-gray-600">Пункт 3: скалярні функції.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="text-xl font-bold break-words">
            dbo.CountCategoriesBelowAvgPrice()
          </div>

          <div className="mt-3 flex min-h-[150px] flex-col">
            <div className="text-gray-600">
              Повертає кількість категорій, де PricePerHour нижче середнього.
            </div>

            <Alert message={err1?.message} code={err1?.code} />

            <div className="mt-auto flex items-end justify-between gap-4">
              <ResultBox value={belowAvg} />
              <button
                className="shrink-0 rounded-xl bg-black px-5 py-3 text-white font-semibold hover:opacity-90"
                type="button"
                onClick={runBelowAvg}
              >
                Виконати
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-xl font-bold break-words">
            dbo.CountCategoriesBelowPrice(@MaxPrice)
          </div>

          <div className="mt-3 flex min-h-[150px] flex-col">
            <div className="text-gray-600">
              Введи max і отримай кількість категорій дешевше.
            </div>

            <div className="mt-3 flex items-center gap-3">
              <input
                type="number"
                className={inputCls}
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Напр.: 300"
              />
              <div className="text-gray-600 whitespace-nowrap">грн/год</div>
            </div>

            <Alert message={err2?.message} code={err2?.code} />

            <div className="mt-auto flex items-end justify-between gap-4">
              <ResultBox value={belowPrice} />
              <button
                className="shrink-0 rounded-xl bg-black px-5 py-3 text-white font-semibold hover:opacity-90"
                type="button"
                onClick={runBelowPrice}
              >
                Виконати
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
