export const relatedToTitle = (name) => {
  const types = {
    ClassType: "Tipo de Turma",
    Class: "Turma",
  };
  return types[name] || "Avulso";
};

export const relatedToTitleUrl = (name) => {
  const types = {
    ClassTypes: "class-types",
    Class: "class",
  };
  return types[name] || "loose";
};