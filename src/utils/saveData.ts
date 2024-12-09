export const handleSaveData = (data: any) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "contour.json";
  a.click();
  URL.revokeObjectURL(url);
};
