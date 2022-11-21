const { Product, Category, Inventory, Discount } = require("../db");
const cases = require("../dataApi/case.json");
const cases_fan = require("../dataApi/cases_fan.json");
const cpu_fan = require("../dataApi/cpu_fan.json");
const gpu = require("../dataApi/gpu.json");
const keyboard = require("../dataApi/keyboard.json");
const motherboard = require("../dataApi/motherboard.json");
const mouses = require("../dataApi/mouses.json");
const power_supply = require("../dataApi/power_supply.json");
const processor = require("../dataApi/processor.json");
const ram = require("../dataApi/ram.json");
const storage = require("../dataApi/storage.json");
const postInvetory = require("./postInventory");

const create = async function (el, datos = [], categoryDB) {
  const invCreate = await postInvetory(12);
  const details = [{}];
  datos.forEach((elem) => {
    details[0][elem] = el[elem];
  });
  const proCreate = await Product.create({
    name: el.title,
    image: el.img,
    price: el.price,
    brand: el.brand,
    model: el.model,
    details: details,
  });
  await proCreate.setCategory(categoryDB);
  await proCreate.setDiscount(null);
  await invCreate.setProduct(proCreate);
  await proCreate.setInventory(invCreate);
};
async function hardCodeoInfo() {
  let categoryDB = await Category.findOne({ where: { name: "cases" } });
  for (let i = 0; i < cases.length; i++) {
    const el = cases[i];
    await create(el, ["sidePanel", "color", "cabinetType"], categoryDB);
  }
  categoryDB = await Category.findOne({ where: { name: "motherboards" } });
  for (let i = 0; i < motherboard.length; i++) {
    const el = motherboard[i];
    await create(
      el,
      ["formFactor", "chipset", "memorySlots", "socketType"],
      categoryDB
    );
  }
  categoryDB = await Category.findOne({ where: { name: "mouses" } });
  for (let i = 0; i < mouses.length; i++) {
    const el = mouses[i];
    await create(el, ["trackingMethod", "color", "wireless"], categoryDB);
  }
  categoryDB = await Category.findOne({ where: { name: "case_fan" } });
  for (let i = 0; i < cases_fan.length; i++) {
    const el = cases_fan[i];
    await create(el, ["rpm", "airFlow", "noiseLevel"], categoryDB);
  }
  categoryDB = await Category.findOne({ where: { name: "cpu_fan" } });
  for (let i = 0; i < cpu_fan.length; i++) {
    const el = cpu_fan[i];
    await create(el, ["rpm", "color", "noiseLevel"], categoryDB);
  }
  categoryDB = await Category.findOne({ where: { name: "gpus" } });
  for (let i = 0; i < gpu.length; i++) {
    const el = gpu[i];
    await create(
      el,
      ["storageInterface", "memory", "clockSpeed", "chipset"],
      categoryDB
    );
  }
  categoryDB = await Category.findOne({ where: { name: "keyboards" } });
  for (let i = 0; i < keyboard.length; i++) {
    const el = keyboard[i];
    await create(el, ["style", "backlit", "color", "wireless"], categoryDB);
  }
  categoryDB = await Category.findOne({ where: { name: "power_supply" } });
  for (let i = 0; i < power_supply.length; i++) {
    const el = power_supply[i];
    await create(el, ["power", "color", "efficiency"], categoryDB);
  }
  categoryDB = await Category.findOne({ where: { name: "processors" } });
  for (let i = 0; i < processor.length; i++) {
    const el = processor[i];
    await create(el, ["speed", "socketType"], categoryDB);
  }
  categoryDB = await Category.findOne({ where: { name: "ram" } });
  for (let i = 0; i < ram.length; i++) {
    const el = ram[i];
    await create(el, ["size", "quantity", "type"], categoryDB);
  }
  categoryDB = await Category.findOne({ where: { name: "storage" } });
  for (let i = 0; i < storage.length; i++) {
    const el = storage[i];
    await create(el, ["rpm", "type", "cacheMemory"], categoryDB);
  }
}
module.exports = { hardCodeoInfo };
