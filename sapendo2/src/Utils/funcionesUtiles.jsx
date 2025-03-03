import dayjs from "dayjs";

export function fechaLegible(fecha) {
  return dayjs(fecha).format("DD-MM-YYYY");
}
