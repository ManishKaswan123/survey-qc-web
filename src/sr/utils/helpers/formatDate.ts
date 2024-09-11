// This Function formats ISO date format to dd/mm/yyyy format
// eg :- 2023-03-31T18:29:59Z to 31/03/2023

const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString('es-CL')
}

export default formatDate
