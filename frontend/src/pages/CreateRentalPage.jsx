import { useState } from "react";
import { api } from "../api/http";
import Container from "../components/Container";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function CreateRentalPage() {
  const [crUserId, setCrUserId] = useState("");
  const [crCarId, setCrCarId] = useState("");
  const [crHours, setCrHours] = useState("");

  const [bnCarName, setBnCarName] = useState("");
  const [bnUserId, setBnUserId] = useState("");
  const [bnHours, setBnHours] = useState("");

  const [ok1, setOk1] = useState(null);
  const [err1, setErr1] = useState(null);

  const [ok2, setOk2] = useState(null);
  const [err2, setErr2] = useState(null);

  const inputCls = "w-full rounded-xl border border-gray-300 px-3 py-2";

  async function submitCreateRental(e) {
    e.preventDefault();
    setOk1(null);
    setErr1(null);

    try {
      const res = await api("/rentals", {
        method: "POST",
        body: JSON.stringify({
          userId: Number(crUserId),
          carId: Number(crCarId),
          hours: crHours === "" ? undefined : Number(crHours),
        }),
      });
      setOk1(res);
    } catch (e2) {
      setErr1(e2);
    }
  }

  async function submitByCarName(e) {
    e.preventDefault();
    setOk2(null);
    setErr2(null);

    try {
      const res = await api("/rentals/by-car-name", {
        method: "POST",
        body: JSON.stringify({
          carName: bnCarName,
          userId: Number(bnUserId),
          hours: bnHours === "" ? undefined : Number(bnHours),
        }),
      });
      setOk2(res);
    } catch (e2) {
      setErr2(e2);
    }
  }

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-2xl font-extrabold">Створити оренду</h1>
        <p className="text-gray-600">
          Пункт 2: виклик двох процедур з параметрами з додатку (CreateRental та AddRentalByCarName).
        </p>
      </div>

      <div className="grid gap-4">
        <Card title="1) CreateRental (userId + carId + hours)">
          {ok1 && (
            <Alert
              type="success"
              title="Успіх"
              message="Оренду створено."
            />
          )}
          <Alert message={err1?.message} code={err1?.code} />

          <form className="grid gap-3 md:grid-cols-2" onSubmit={submitCreateRental}>
            <label className="text-sm">
              <div className="mb-1 font-semibold">UserId</div>
              <input
                type="number"
                className={inputCls}
                value={crUserId}
                onChange={(e) => setCrUserId(e.target.value)}
                placeholder="Напр.: 1"
              />
            </label>

            <label className="text-sm">
              <div className="mb-1 font-semibold">CarId</div>
              <input
                type="number"
                className={inputCls}
                value={crCarId}
                onChange={(e) => setCrCarId(e.target.value)}
                placeholder="Напр.: 3"
              />
            </label>

            <label className="text-sm">
              <div className="mb-1 font-semibold">Hours (optional)</div>
              <input
                type="number"
                className={inputCls}
                value={crHours}
                onChange={(e) => setCrHours(e.target.value)}
                placeholder="Напр.: 2"
              />
            </label>

            <div className="hidden md:block" />

            <div className="md:col-span-2">
              <button
                className="w-full rounded-xl bg-black py-3 text-white font-semibold hover:opacity-90"
                type="submit"
              >
                Створити (CreateRental)
              </button>
            </div>
          </form>
        </Card>

        <Card title="2) AddRentalByCarName (carName + userId + hours)">
          {ok2 && (
            <Alert
              type="success"
              title="Успіх"
              message={`Оренду створено.`}
            />
          )}
          <Alert message={err2?.message} code={err2?.code} />

          <form className="grid gap-3 md:grid-cols-2" onSubmit={submitByCarName}>
            <label className="text-sm">
              <div className="mb-1 font-semibold">CarName (Brand + Model)</div>
              <input
                className={inputCls}
                value={bnCarName}
                onChange={(e) => setBnCarName(e.target.value)}
                placeholder="Напр.: Toyota Corolla"
              />
            </label>

            <label className="text-sm">
              <div className="mb-1 font-semibold">UserId</div>
              <input
                type="number"
                className={inputCls}
                value={bnUserId}
                onChange={(e) => setBnUserId(e.target.value)}
                placeholder="Напр.: 1"
              />
            </label>

            <label className="text-sm">
              <div className="mb-1 font-semibold">Hours (optional)</div>
              <input
                type="number"
                className={inputCls}
                value={bnHours}
                onChange={(e) => setBnHours(e.target.value)}
                placeholder="Напр.: 3"
              />
            </label>

            <div className="hidden md:block" />

            <div className="md:col-span-2">
              <button
                className="w-full rounded-xl bg-black py-3 text-white font-semibold hover:opacity-90"
                type="submit"
              >
                Створити (AddRentalByCarName)
              </button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
