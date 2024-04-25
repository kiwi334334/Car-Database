import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { BaseHTML } from "./components.js";
import { JSONFilePreset } from "lowdb/node";
import { Preset } from "./DBpreset.js";

// DB Config
const db = await JSONFilePreset("db.json", Preset);
const cars = db.data.cars;
const carBrands = db.data.carBrands;

// App Config
const app = new Elysia();
app.use(html());

// Frontend Routes
app.get("/", () => {
  return (
    <BaseHTML title="HomePage">
      <h1>hello</h1>
    </BaseHTML>
  );
});

app.get("/cars", () => {
  return (
    <BaseHTML title={"Cars"}>
      <div
        class={
          "h-screen w-[20%] border-2 border-zinc-400 border-r-black bg-zinc-400"
        }
      >
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          hx-post={"/brand/all"}
          hx-swap="innerHTML"
          hx-target="#cars"
          class={""}
        >
          All Car Brands
        </button>
        <br />
        {carBrands.map((brand) => (
          // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
          <>
            <button
              hx-post={`/brand/${brand.id}`}
              type="button"
              hx-swap="innerHTML"
              hx-target="#cars"
              class={""}
            >
              <h1>{brand.brandName}</h1>
            </button>
            <br />
          </>
        ))}
      </div>
      <div
        class={"absolute bottom-0 right-0 m-0 h-[97%] w-[80%] p-0"}
        id={"cars"}
      >
        {cars.map((car) => (
          // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
          <>
            <h1
              hx-trigger="click"
              hx-post={`/cars/${car.id}`}
              hx-swap="innerHTML"
              hx-target={"#desc"}
            >
              <div>
                <h1>
                  {carBrands[car.brand - 1].brandName} {car.model}
                </h1>
              </div>
            </h1>
          </>
        ))}

        <div
          id={"desc"}
          class={
            "absolute bottom-0 right-0 h-[31%] w-[100%] border-2 border-transparent border-t-black bg-slate-400"
          }
        />
      </div>
      <form
        hx-post="/create/brand"
        class={
          "absolute bottom-[50%] right-0 h-[10%] w-[80%] border-2 border-transparent border-t-black bg-zinc-300"
        }
      >
        <h1>Create A Car Brand</h1>
        <input placeholder="Brand Name" name="brandName" id="brandName" />
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button>SUBMIT</button>
      </form>
      <form
        class={
          "absolute bottom-[30%] right-0 h-[20%] w-[80%] border-2 border-transparent border-t-black bg-zinc-300"
        }
        hx-post="/create/car"
      >
        <h1>Create A Car</h1>
        <input placeholder={"The Car's Name"} id={"model"} name={"model"} />
        <input
          placeholder={"The Car's Description"}
          id={"description"}
          name={"description"}
        />
        <input
          placeholder={"What year was this created"}
          type="number"
          id="dateCreated"
          name="dateCreated"
        />
        <select class={"h-[18%] w-[10%]"} name={"brand"}>
          {carBrands.map((brand) => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            <option value={`${brand.id}`}>{brand.brandName}</option>
          ))}
        </select>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button>SUBMIT</button>
      </form>
    </BaseHTML>
  );
});

// BackEnd Routes
app.post("/brand/all", () => {
  return (
    <div
      class={"absolute bottom-0 right-0 m-0 h-[100%] w-[100%] p-0"}
      id={"cars"}
    >
      {cars.map((car) => (
        // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
        <>
          <h1
            hx-trigger="click"
            hx-post={`/cars/${car.id}`}
            hx-swap="innerHTML"
            hx-target={"#desc"}
          >
            <div>
              <h1>
                {carBrands[car.brand - 1].brandName} {car.model}
              </h1>
            </div>
          </h1>
        </>
      ))}
      <div
        id={"desc"}
        class={
          "absolute bottom-0 right-0 h-[31%] w-[100%] border-2 border-transparent border-t-black bg-slate-400"
        }
      />
    </div>
  );
});

app.post("/brand/:brandID", ({ params }: { params: { brandID: number } }) => {
  const carsByBrand = cars.filter((object) => object.brand === params.brandID);
  return (
    <div
      class={"absolute bottom-0 right-0 m-0 h-[100%] w-[100%] p-0"}
      id={"cars"}
    >
      {carsByBrand.map((car) => (
        // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
        <>
          <h1
            hx-trigger="click"
            hx-post={`/cars/${car.id}`}
            hx-swap="innerHTML"
            hx-target={"#desc"}
          >
            <div>
              <h1>
                {carBrands[car.brand - 1].brandName} {car.model}
              </h1>
            </div>
          </h1>
        </>
      ))}
      <form
        hx-post="/create/brand"
        class={
          "absolute bottom-[40%] right-0 h-[10%] w-[100%] border-2 border-transparent border-t-black bg-zinc-300"
        }
      >
        <h1>Create A Car Brand</h1>
        <input placeholder="Brand Name" name="brandName" id="brandName" />
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button>SUBMIT</button>
      </form>
      <div
        id={"desc"}
        class={
          "absolute bottom-0 right-0 h-[31%] w-[100%] border-2 border-transparent border-t-black bg-slate-400"
        }
      />
    </div>
  );
});

app.post("/cars/:CarID", ({ params }: { params: { CarID: number } }) => {
  const car = cars.find((object) => object.id === params.CarID);
  return (
    <>
      <p>
        {carBrands[car.brand - 1].brandName} {car.model}:
      </p>
      <p>{car.description}</p>
    </>
  );
});

// Create Routes
app.post("/create/brand", ({ body }: { body: { brandName: string } }) => {
  if (body.brandName !== "") {
    db.update(({ carBrands }) => {
      carBrands.push({ id: carBrands.length + 1, brandName: body.brandName });
    });
    return <h1>Refresh To See Your Change</h1>;
  }
  return <h1>You Must Fill All Boxes</h1>;
});

app.post(
  "/create/car",
  async ({
    body,
  }: {
    body: {
      brand: number;
      dateCreated: number;
      model: string;
      description: string;
    };
  }) => {
    if (
      body.brand != null &&
      body.dateCreated != null &&
      body.description !== "" &&
      body.model !== ""
    ) {
      db.update(({ cars }) => {
        cars.push({
          brand: body.brand,
          dateCreated: body.dateCreated,
          model: body.model,
          description: body.description,
          id: cars.length + 1,
        });
      });
      return <h1>Reload to See Your Changes</h1>;
    }
    return <h1>All Boxes Must Be filled</h1>;
  },
);

// Run App
app.listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
