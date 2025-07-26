export const relatedToTitle = (name) => {
  const types = {
    ClassType: "Tipo de Turma",
    Class: "Turma",
  };
  return types[name] || "Avulso";
};