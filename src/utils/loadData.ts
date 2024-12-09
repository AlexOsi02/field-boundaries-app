import { ChangeEvent } from "react";

export const handleLoadData = (event: ChangeEvent<HTMLInputElement>, callback?: (data: unknown) => void) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const result = JSON.parse(e.target?.result as string);
      if (result) {
        callback && callback(result);
      }
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      alert("Некорректный файл JSON.");
    }
  };
  reader.readAsText(file);
};
