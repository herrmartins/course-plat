export const relatedToTitle = (name) => {
  const types = {
    ClassType: "Tipo de Turma",
    Class: "Turma",
  };
  return types[name] || "avulso";
};

export const relatedToTitleUrl = (name) => {
  const types = {
    classTypes: "classTypes",
    class: "class",
  };
  return types[name] || "loose";
};